import { Body, Controller, Get, Post, UsePipes } from "@nestjs/common";

import apiAct001 from "@sparcs-clubs/interface/api/activity/endpoint/apiAct001";
import apiAct005 from "@sparcs-clubs/interface/api/activity/endpoint/apiAct005";

import { ZodPipe } from "@sparcs-clubs/api/common/pipe/zod-pipe";

import ActivityService from "../service/activity.service";

import type {
  ApiAct001RequestBody,
  ApiAct001ResponseCreated,
} from "@sparcs-clubs/interface/api/activity/endpoint/apiAct001";
import type {
  ApiAct005RequestBody,
  ApiAct005ResponseOk,
} from "@sparcs-clubs/interface/api/activity/endpoint/apiAct005";

@Controller()
export default class ActivityController {
  constructor(private activityService: ActivityService) {}

  // TODO: Authentication 필요
  @Get("/student/activities")
  @UsePipes(new ZodPipe(apiAct005))
  async getStudentActivity(
    @Body() body: ApiAct005RequestBody,
  ): Promise<ApiAct005ResponseOk> {
    const mockUpStudentId = 605;
    const result = await this.activityService.getStudentActivity(
      body.clubId,
      mockUpStudentId,
    );
    return result;
  }

  // TODO: Authentication 필요
  @Post("/student/activities/activity")
  @UsePipes(new ZodPipe(apiAct001))
  async postStudentActivity(
    @Body() body: ApiAct001RequestBody,
  ): Promise<ApiAct001ResponseCreated> {
    await this.activityService.postStudentActivity(body);
    return {};
  }
}
