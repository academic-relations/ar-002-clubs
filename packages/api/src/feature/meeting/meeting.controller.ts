import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
} from "@nestjs/common";

import apiMee005, {
  ApiMee005RequestQuery,
  ApiMee005ResponseOk,
} from "@sparcs-clubs/interface/api/meeting/apiMee005";

import apiMee006, {
  ApiMee006RequestBody,
  ApiMee006RequestParam,
  ApiMee006ResponseCreated,
} from "@sparcs-clubs/interface/api/meeting/apiMee006";

import apiMee08, {
  ApiMee008RequestBody,
  ApiMee008RequestParam,
  ApiMee008ResponseOk,
} from "@sparcs-clubs/interface/api/meeting/apiMee008";

import { ZodPipe } from "@sparcs-clubs/api/common/pipe/zod-pipe";
import { Executive } from "@sparcs-clubs/api/common/util/decorators/method-decorator";
import { GetExecutive } from "@sparcs-clubs/api/common/util/decorators/param-decorator";

import { MeetingService } from "./meeting.service";

@Controller()
export default class MeetingController {
  constructor(private meetingService: MeetingService) {}

  @Executive()
  @Get("executive/meetings/meeting/degree")
  @UsePipes(new ZodPipe(apiMee005))
  async getMeetingDegree(
    @GetExecutive() user: GetExecutive,
    @Query() query: ApiMee005RequestQuery,
  ): Promise<ApiMee005ResponseOk> {
    const degree = await this.meetingService.getExecutiveMeetingDegree(
      query,
      user.executiveId,
    );

    return { degree };
  }

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
  @UsePipes(new ZodPipe(apiMee08))
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
}
