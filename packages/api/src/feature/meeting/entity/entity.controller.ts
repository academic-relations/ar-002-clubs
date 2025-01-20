import {
  Body,
  Controller,
  // Get, Query,
  Param,
  Put,
  UsePipes,
} from "@nestjs/common";

import apiMee021, {
  ApiMee021RequestBody,
  ApiMee021RequestParam,
  ApiMee021ResponseOk,
} from "@sparcs-clubs/interface/api/meeting/apiMee021";

import { ZodPipe } from "@sparcs-clubs/api/common/pipe/zod-pipe";
import { Executive } from "@sparcs-clubs/api/common/util/decorators/method-decorator";
import { GetExecutive } from "@sparcs-clubs/api/common/util/decorators/param-decorator";

import { EntityService } from "./entity.service";

@Controller()
export default class EntityController {
  constructor(private entityService: EntityService) {}

  @Executive()
  @Put(
    "/executive/meetings/meeting/:meetingId/agendas/agenda/:agendaId/entities",
  )
  @UsePipes(new ZodPipe(apiMee021))
  async putExecutiveMeetingAgendaEntities(
    @GetExecutive() user: GetExecutive,
    @Param() { meetingId, agendaId }: ApiMee021RequestParam,
    @Body() { entityIdList }: ApiMee021RequestBody,
  ): Promise<ApiMee021ResponseOk> {
    const result = await this.entityService.putExecutiveMeetingAgendaEntities(
      user.executiveId,
      meetingId,
      agendaId,
      entityIdList,
    );

    return result;
  }
}
