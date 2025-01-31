import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import UserPublicService from "@sparcs-clubs/api/feature/user/service/user.public.service";

import { ContentRepository } from "./content.repository";

@Injectable()
export class ContentService {
  constructor(
    private readonly contentRepository: ContentRepository,
    private readonly userPublicService: UserPublicService,
  ) {}

  async postExecutiveMeetingAgendaContent(
    userId: number,
    meetingId: number,
    agendaId: number,
    content: string,
  ) {
    const user = await this.userPublicService.getExecutiveById({
      id: userId,
    });

    if (!user) {
      throw new HttpException("Executive not found", HttpStatus.NOT_FOUND);
    }

    const result = await this.contentRepository.postMeetingAgendaContent(
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

  async putExecutiveMeetingAgendaContent(
    userId: number,
    meetingId: number,
    agendaId: number,
    contentId: number,
    content: string,
  ) {
    const user = await this.userPublicService.getExecutiveById({
      id: userId,
    });

    if (!user) {
      throw new HttpException("Executive not found", HttpStatus.NOT_FOUND);
    }

    const result = await this.contentRepository.putMeetingAgendaContent(
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
    const user = await this.userPublicService.getExecutiveById({
      id: userId,
    });

    if (!user) {
      throw new HttpException("Executive not found", HttpStatus.NOT_FOUND);
    }

    const result = await this.contentRepository.deleteMeetingAgendaContent(
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
