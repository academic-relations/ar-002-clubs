import {
  Body,
  Controller,
  Get,
  Param,
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
  async postStudentRegistrationsMemberRegistration(
    @GetExecutive() user: GetExecutive,
    @Param() { meetingId }: ApiMee006RequestParam,
    @Body() { description, meetingEnumId, title }: ApiMee006RequestBody,
  ): Promise<ApiMee006ResponseCreated> {
    const result = await this.meetingService.postExecutiveMeetingAgenda(
      user.executiveId,
      meetingId,
      description,
      meetingEnumId,
      title,
    );
    return result;
  }
}
