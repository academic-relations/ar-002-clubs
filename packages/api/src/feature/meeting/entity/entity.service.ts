import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

// import { WsException } from "@nestjs/websockets";

import UserPublicService from "@sparcs-clubs/api/feature/user/service/user.public.service";

import { EntityRepository } from "./entity.repository";

@Injectable()
export class EntityService {
  constructor(
    private readonly entityRepository: EntityRepository,
    private readonly userPublicService: UserPublicService,
  ) {}

  async putExecutiveMeetingAgendaEntities(
    userId: number,
    meetingId: number,
    agendaId: number,
    entityIdList: Array<{ id: number; meetingAgendaEntityType: number }>,
  ) {
    const user = await this.userPublicService.getExecutiveById({
      id: userId,
    });

    if (!user) {
      throw new HttpException("Executive not found", HttpStatus.NOT_FOUND);
    }

    const result = await this.entityRepository.putMeetingAgendaEntities(
      userId,
      meetingId,
      agendaId,
      entityIdList,
    );
    if (!result) {
      throw new HttpException(
        "Failed to modify entity position",
        HttpStatus.BAD_REQUEST,
      );
    }
    return result;
  }
}
