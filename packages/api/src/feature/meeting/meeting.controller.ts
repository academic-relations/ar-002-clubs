import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
} from "@nestjs/common";

import apiMee001, {
  ApiMee001RequestBody,
  ApiMee001ResponseCreated,
} from "@sparcs-clubs/interface/api/meeting/apiMee001";
import apiMee002, {
  ApiMee002RequestParam,
  ApiMee002ResponseOk,
} from "@sparcs-clubs/interface/api/meeting/apiMee002";
import apiMee003, {
  ApiMee003RequestBody,
  ApiMee003RequestParam,
  ApiMee003ResponseCreated,
} from "@sparcs-clubs/interface/api/meeting/apiMee003";
import apiMee004, {
  ApiMee004RequestParam,
  ApiMee004ResponseOk,
} from "@sparcs-clubs/interface/api/meeting/apiMee004";
import apiMee005, {
  ApiMee005RequestQuery,
  ApiMee005ResponseOk,
} from "@sparcs-clubs/interface/api/meeting/apiMee005";

import { ZodPipe } from "@sparcs-clubs/api/common/pipe/zod-pipe";
import { Executive } from "@sparcs-clubs/api/common/util/decorators/method-decorator";
import { GetExecutive } from "@sparcs-clubs/api/common/util/decorators/param-decorator";

import { MeetingService } from "./meeting.service";

@Controller()
export default class MeetingController {
  constructor(private meetingService: MeetingService) {}

  @Executive()
  @Post("/executive/meetings/announcements/announcement")
  @UsePipes(new ZodPipe(apiMee001))
  async createExecutiveMeetingAnnouncement(
    @GetExecutive() user: GetExecutive,
    @Body() body: ApiMee001RequestBody,
  ): Promise<ApiMee001ResponseCreated> {
    await this.meetingService.postExecutiveMeetingAnnouncement(
      body,
      user.executiveId,
    );
    return {};
  }

  @Get("/meetings/announcements/announcement/:announcementId")
  @UsePipes(new ZodPipe(apiMee002))
  async getMeetingAnnouncement(
    @Param() param: ApiMee002RequestParam,
  ): Promise<ApiMee002ResponseOk> {
    const result = await this.meetingService.getMeetingAnnouncement(param);
    return result;
  }

  @Executive()
  @Patch("/executive/meetings/announcements/announcement/:announcementId")
  @UsePipes(new ZodPipe(apiMee003))
  async updateExecutiveMeetingAnnouncement(
    @GetExecutive() user: GetExecutive,
    @Param() param: ApiMee003RequestParam,
    @Body() body: ApiMee003RequestBody,
  ): Promise<ApiMee003ResponseCreated> {
    await this.meetingService.updateExecutiveMeetingAnnouncement(
      param,
      body,
      user.executiveId,
    );
    return {};
  }

  @Executive()
  @Delete("/executive/meetings/announcements/announcement/:announcementId")
  @UsePipes(new ZodPipe(apiMee004))
  async deleteExecutiveMeetingAnnouncement(
    @GetExecutive() user: GetExecutive,
    @Param() param: ApiMee004RequestParam,
  ): Promise<ApiMee004ResponseOk> {
    await this.meetingService.deleteExecutiveMeetingAnnouncement(
      param,
      user.executiveId,
    );
    return {};
  }

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
}
