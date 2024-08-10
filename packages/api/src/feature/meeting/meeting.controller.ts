import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
} from "@nestjs/common";

import apiMeet001, {
  ApiMeet001RequestBody,
  ApiMeet001ResponseCreated,
} from "@sparcs-clubs/interface/api/meeting/endpoint/apiMeet001";
import apiMeet002, {
  ApiMeet002RequestParam,
  // ApiMeet002ResponseOk,
} from "@sparcs-clubs/interface/api/meeting/endpoint/apiMeet002";
import apiMeet003, {
  ApiMeet003RequestBody,
  ApiMeet003RequestParam,
  ApiMeet003ResponseCreated,
} from "@sparcs-clubs/interface/api/meeting/endpoint/apiMeet003";
import apiMeet004, {
  ApiMeet004RequestParam,
  ApiMeet004ResponseOk,
} from "@sparcs-clubs/interface/api/meeting/endpoint/apiMeet004";

import { ZodPipe } from "@sparcs-clubs/api/common/pipe/zod-pipe";
import { Executive } from "@sparcs-clubs/api/common/util/decorators/method-decorator";
import { GetExecutive } from "@sparcs-clubs/api/common/util/decorators/param-decorator";

import { MeetingService } from "./meeting.service";

@Controller()
export default class MeetingController {
  constructor(private meetingService: MeetingService) {}

  @Executive()
  @Post("/executive/meetings/announcements/announcement")
  @UsePipes(new ZodPipe(apiMeet001))
  async createExecutiveMeetingAnnouncement(
    @GetExecutive() user: GetExecutive,
    @Body() body: ApiMeet001RequestBody,
  ): Promise<ApiMeet001ResponseCreated> {
    await this.meetingService.postExecutiveMeetingAnnouncement(
      body,
      user.executiveId,
    );
    return {};
  }

  @Get("/meetings/announcements/announcement/:announcementId")
  @UsePipes(new ZodPipe(apiMeet002))
  async getMeetingAnnouncement(@Param() param: ApiMeet002RequestParam) {
    const result = await this.meetingService.getMeetingAnnouncement(param);
    return result;
  }

  @Executive()
  @Patch("/executive/meetings/announcements/announcement/:announcementId")
  @UsePipes(new ZodPipe(apiMeet003))
  async updateExecutiveMeetingAnnouncement(
    @GetExecutive() user: GetExecutive,
    @Param() param: ApiMeet003RequestParam,
    @Body() body: ApiMeet003RequestBody,
  ): Promise<ApiMeet003ResponseCreated> {
    await this.meetingService.updateExecutiveMeetingAnnouncement(
      param,
      body,
      user.executiveId,
    );
    return {};
  }

  @Executive()
  @Delete("/executive/meetings/announcements/announcement/:announcementId")
  @UsePipes(new ZodPipe(apiMeet004))
  async deleteExecutiveMeetingAnnouncement(
    @GetExecutive() user: GetExecutive,
    @Param() param: ApiMeet004RequestParam,
  ): Promise<ApiMeet004ResponseOk> {
    const result = await this.meetingService.deleteExecutiveMeetingAnnouncement(
      param,
      user.executiveId,
    );
    return result;
  }
}
