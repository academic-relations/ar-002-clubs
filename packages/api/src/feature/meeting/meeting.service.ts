import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { WsException } from "@nestjs/websockets";

import {
  ApiMeet001RequestBody,
  ApiMeet001ResponseCreated,
} from "@sparcs-clubs/interface/api/meeting/endpoint/apiMeet001";
import {
  ApiMeet002RequestParam,
  // ApiMeet002ResponseOk,
} from "@sparcs-clubs/interface/api/meeting/endpoint/apiMeet002";
import {
  ApiMeet003RequestBody,
  ApiMeet003RequestParam,
  ApiMeet003ResponseCreated,
} from "@sparcs-clubs/interface/api/meeting/endpoint/apiMeet003";
import {
  ApiMeet004RequestParam,
  ApiMeet004ResponseOk,
} from "@sparcs-clubs/interface/api/meeting/endpoint/apiMeet004";

import UserPublicService from "../user/service/user.public.service";

import { MeetingRepository } from "./meeting.repository";

@Injectable()
export class MeetingService {
  constructor(
    private readonly meetingRepository: MeetingRepository,
    private readonly userPublicService: UserPublicService,
  ) {}

  async entryMeeting(meetingId: number, userId: number) {
    const result = await this.meetingRepository.entryMeeting(meetingId, userId);
    if (!result) {
      throw new WsException("Failed to entry meeting");
    }
    return result;
  }

  async exitMeeting(meetingId: number, userId: number) {
    const result = await this.meetingRepository.exitMeeting(meetingId, userId);
    if (!result) {
      throw new WsException("Failed to exit meeting");
    }
    return result;
  }

  async vote(choiceId: number, userId: number) {
    const result = await this.meetingRepository.vote(choiceId, userId);
    if (!result) {
      throw new WsException("Failed to exit meeting");
    }
    return result;
  }

  async postExecutiveMeetingAnnouncement(
    body: ApiMeet001RequestBody,
    executiveId: number,
  ): Promise<ApiMeet001ResponseCreated> {
    const user = await this.userPublicService.getExecutiveById({
      id: executiveId,
    });

    if (!user) {
      throw new HttpException("Executive not found", HttpStatus.NOT_FOUND);
    }

    const result =
      await this.meetingRepository.postExecutiveMeetingAnnouncement(body);

    return result;
  }

  async getMeetingAnnouncement(param: ApiMeet002RequestParam) {
    const meeting = await this.meetingRepository.selectMeetingById(
      param.announcementId,
    );
    const meetingAnnouncement =
      await this.meetingRepository.selectMeetingAnnouncementById(
        param.announcementId,
      );

    return {
      meetingEnumId: meeting.meetingEnumId,
      announcementTitle: meetingAnnouncement.announcementTitle,
      announcementContent: meetingAnnouncement.announcementContent,
      startDate: meeting.startDate,
      endDate: meeting.endDate,
      isRegular: meeting.isRegular,
      location: meeting.location,
      locationEn: meeting.locationEn,
    };
  }

  async updateExecutiveMeetingAnnouncement(
    param: ApiMeet003RequestParam,
    body: ApiMeet003RequestBody,
    executiveId: number,
  ): Promise<ApiMeet003ResponseCreated> {
    const user = await this.userPublicService.getExecutiveById({
      id: executiveId,
    });

    if (!user) {
      throw new HttpException("Executive not found", HttpStatus.NOT_FOUND);
    }
    const result =
      await this.meetingRepository.updateExecutiveMeetingAnnouncement(
        param,
        body,
      );

    return result;
  }

  async deleteExecutiveMeetingAnnouncement(
    param: ApiMeet004RequestParam,
    executiveId: number,
  ): Promise<ApiMeet004ResponseOk> {
    const user = await this.userPublicService.getExecutiveById({
      id: executiveId,
    });

    if (!user) {
      throw new HttpException("Executive not found", HttpStatus.NOT_FOUND);
    }
    const result =
      await this.meetingRepository.deleteExecutiveMeetingAnnouncement();
    return result;
  }
}
