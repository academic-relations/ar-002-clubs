import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { WsException } from "@nestjs/websockets";

import { ApiMee006ResponseCreated } from "@sparcs-clubs/interface/api/meeting/apiMee006";

import { ApiMee008ResponseOk } from "@sparcs-clubs/interface/api/meeting/apiMee008";

import { ApiMee010ResponseOk } from "@sparcs-clubs/interface/api/meeting/apiMee010";

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

  async vote(choiceId: number, userId: number, voteId: number) {
    const result = await this.meetingRepository.vote(choiceId, userId, voteId);
    if (!result) {
      throw new WsException("Failed to exit meeting");
    }
    return result;
  }

  async getExecutiveMeetingNextDegree(
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
      await this.meetingRepository.selectExecutiveMeetingNextDegree(query);

    return result;
  }

  async postExecutiveMeetingAgenda(
    executiveId: number,
    meetingId: number,
    meetingEnumId: number,
    description: string,
    title: string,
  ): Promise<ApiMee006ResponseCreated> {
    const user = await this.userPublicService.getExecutiveById({
      id: executiveId,
    });

    if (!user) {
      throw new HttpException("Executive not found", HttpStatus.NOT_FOUND);
    }

    await this.meetingRepository.insertMeetingAgendaAndMapping(
      meetingId,
      meetingEnumId,
      description,
      title,
    );

    return {};
  }

  async patchExecutiveMeetingAgenda(
    executiveId: number,
    agendaId: number,
    agendaEnumId: number,
    description: string,
    title: string,
  ): Promise<ApiMee008ResponseOk> {
    const user = await this.userPublicService.getExecutiveById({
      id: executiveId,
    });

    if (!user) {
      throw new HttpException("Executive not found", HttpStatus.NOT_FOUND);
    }

    await this.meetingRepository.updateMeetingAgenda(
      agendaId,
      agendaEnumId,
      description,
      title,
    );

    return {};
  }

  async deleteExecutiveMeetingAgenda(
    executiveId: number,
    meetingId: number,
    agendaId: number,
  ): Promise<ApiMee010ResponseOk> {
    const user = await this.userPublicService.getExecutiveById({
      id: executiveId,
    });

    if (!user) {
      throw new HttpException("Executive not found", HttpStatus.NOT_FOUND);
    }

    await this.meetingRepository.deleteMeetingAgendaMapping(
      meetingId,
      agendaId,
    );

    return {};
  }
}
