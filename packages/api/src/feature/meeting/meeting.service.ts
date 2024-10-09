import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { WsException } from "@nestjs/websockets";

import {
  ApiMee001RequestBody,
  ApiMee001ResponseCreated,
} from "@sparcs-clubs/interface/api/meeting/apiMee001";
import { ApiMee002RequestParam } from "@sparcs-clubs/interface/api/meeting/apiMee002";
import {
  ApiMee003RequestBody,
  ApiMee003RequestParam,
  ApiMee003ResponseCreated,
} from "@sparcs-clubs/interface/api/meeting/apiMee003";
import {
  ApiMee004RequestParam,
  ApiMee004ResponseOk,
} from "@sparcs-clubs/interface/api/meeting/apiMee004";

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
    body: ApiMee001RequestBody,
    executiveId: number,
  ): Promise<ApiMee001ResponseCreated> {
    // TODO: Executive 중에서도 국장단이어야 함. 이 부분 로직 추가가 필요합니다.
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

  async getMeetingAnnouncement(param: ApiMee002RequestParam) {
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
    param: ApiMee003RequestParam,
    body: ApiMee003RequestBody,
    executiveId: number,
  ): Promise<ApiMee003ResponseCreated> {
    // TODO: 국장단 여부 확인
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
    param: ApiMee004RequestParam,
    executiveId: number,
  ): Promise<ApiMee004ResponseOk> {
    // TODO: 국장단 여부 확인
    const user = await this.userPublicService.getExecutiveById({
      id: executiveId,
    });

    if (!user) {
      throw new HttpException("Executive not found", HttpStatus.NOT_FOUND);
    }

    const result =
      await this.meetingRepository.deleteExecutiveMeetingAnnouncement(param);
    return result;
  }

  async getExecutiveMeetingDegree(
    query: { meetingEnumId: number },
    executiveId: number,
  ) {
    // TODO: 국장단 여부 확인
    const user = await this.userPublicService.getExecutiveById({
      id: executiveId,
    });

    if (!user) {
      throw new HttpException("Executive not found", HttpStatus.NOT_FOUND);
    }

    const result =
      await this.meetingRepository.selectExecutiveMeetingDegree(query);

    return result;
  }
}
