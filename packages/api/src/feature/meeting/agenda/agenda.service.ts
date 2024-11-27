import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";

import { ApiMee006ResponseCreated } from "@sparcs-clubs/interface/api/meeting/apiMee006";

import { ApiMee008ResponseOk } from "@sparcs-clubs/interface/api/meeting/apiMee008";

import { ApiMee010ResponseOk } from "@sparcs-clubs/interface/api/meeting/apiMee010";

import UserPublicService from "@sparcs-clubs/api/feature/user/service/user.public.service";

import { MeetingRepository } from "../meeting.repository";

@Injectable()
export class AgendaService {
  constructor(
    private readonly meetingRepository: MeetingRepository,
    private readonly userPublicService: UserPublicService,
  ) {}

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
      throw new UnauthorizedException("Not allowed type");
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
