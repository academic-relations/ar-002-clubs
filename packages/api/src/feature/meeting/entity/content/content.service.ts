import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import UserPublicService from "@sparcs-clubs/api/feature/user/service/user.public.service";

import { EntityRepository } from "../entity.repository";

@Injectable()
export class ContentService {
  constructor(
    private readonly entityRepository: EntityRepository,
    private readonly userPublicService: UserPublicService,
  ) {}

  async postExecutiveMeetingAgendaContent(
    userId: number,
    meetingId: number,
    agendaId: number,
    content: string,
  ) {
    const result = await this.entityRepository.postMeetingAgendaContent(
      userId,
      meetingId,
      agendaId,
      content,
    );
    if (!result) {
      throw new HttpException(
        "Failed to create content",
        HttpStatus.BAD_REQUEST,
      );
    }
    return result;
  }

  async patchExecutiveMeetingAgendaContent(
    userId: number,
    meetingId: number,
    agendaId: number,
    contentId: number,
    content: string,
  ) {
    const result = await this.entityRepository.patchMeetingAgendaContent(
      userId,
      meetingId,
      agendaId,
      contentId,
      content,
    );
    if (!result) {
      throw new HttpException(
        "Failed to patch content",
        HttpStatus.BAD_REQUEST,
      );
    }
    return result;
  }

  async deleteExecutiveMeetingAgendaContent(
    userId: number,
    meetingId: number,
    agendaId: number,
    contentId: number,
  ) {
    const result = await this.entityRepository.deleteMeetingAgendaContent(
      userId,
      meetingId,
      agendaId,
      contentId,
    );
    if (!result) {
      throw new HttpException(
        "Failed to delete content",
        HttpStatus.BAD_REQUEST,
      );
    }
    return result;
  }
}
