import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UsePipes,
} from "@nestjs/common";

import apiMee006, {
  ApiMee006RequestBody,
  ApiMee006RequestParam,
  ApiMee006ResponseCreated,
} from "@sparcs-clubs/interface/api/meeting/apiMee006";

import apiMee008, {
  ApiMee008RequestBody,
  ApiMee008RequestParam,
  ApiMee008ResponseOk,
} from "@sparcs-clubs/interface/api/meeting/apiMee008";

import apiMee010, {
  ApiMee010RequestParam,
  ApiMee010ResponseOk,
} from "@sparcs-clubs/interface/api/meeting/apiMee010";

import { ZodPipe } from "@sparcs-clubs/api/common/pipe/zod-pipe";
import { Executive } from "@sparcs-clubs/api/common/util/decorators/method-decorator";
import { GetExecutive } from "@sparcs-clubs/api/common/util/decorators/param-decorator";

import { AgendaService } from "./agenda.service";

@Controller()
export default class AgendaController {
  constructor(private meetingService: AgendaService) {}

  @Executive()
  @Post("/executive/meetings/meeting/:meetingId/agendas/agenda")
  @UsePipes(new ZodPipe(apiMee006))
  async postExecutiveMeetingAgenda(
    @GetExecutive() user: GetExecutive,
    @Param() { meetingId }: ApiMee006RequestParam,
    @Body() { meetingEnumId, description, title }: ApiMee006RequestBody,
  ): Promise<ApiMee006ResponseCreated> {
    const result = await this.meetingService.postExecutiveMeetingAgenda(
      user.executiveId,
      meetingId,
      meetingEnumId,
      description,
      title,
    );
    return result;
  }

  @Executive()
  @Patch("/executive/meetings/meeting/:meetingId/agendas/agenda/:agendaId")
  @UsePipes(new ZodPipe(apiMee008))
  async patchExecutiveMeetingAgenda(
    @GetExecutive() user: GetExecutive,
    @Param() { agendaId }: ApiMee008RequestParam,
    @Body() { agendaEnumId, description, title }: ApiMee008RequestBody,
  ): Promise<ApiMee008ResponseOk> {
    const result = await this.meetingService.patchExecutiveMeetingAgenda(
      user.executiveId,
      agendaId,
      agendaEnumId,
      description,
      title,
    );
    return result;
  }

  @Executive()
  @Delete("/executive/meetings/meeting/:meetingId/agendas/agenda/:agendaId")
  @UsePipes(new ZodPipe(apiMee010))
  async deleteExecutiveMeetingAgenda(
    @GetExecutive() user: GetExecutive,
    @Param() { meetingId, agendaId }: ApiMee010RequestParam,
  ): Promise<ApiMee010ResponseOk> {
    const result = await this.meetingService.deleteExecutiveMeetingAgenda(
      user.executiveId,
      meetingId,
      agendaId,
    );
    return result;
  }
}
