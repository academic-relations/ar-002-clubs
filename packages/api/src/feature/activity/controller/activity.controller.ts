import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UsePipes,
} from "@nestjs/common";

import apiAct001 from "@sparcs-clubs/interface/api/activity/endpoint/apiAct001";
import apiAct002 from "@sparcs-clubs/interface/api/activity/endpoint/apiAct002";
import apiAct004 from "@sparcs-clubs/interface/api/activity/endpoint/apiAct004";
import apiAct005 from "@sparcs-clubs/interface/api/activity/endpoint/apiAct005";

import { ZodPipe } from "@sparcs-clubs/api/common/pipe/zod-pipe";

import ActivityService from "../service/activity.service";

import type {
  ApiAct001RequestBody,
  ApiAct001ResponseCreated,
} from "@sparcs-clubs/interface/api/activity/endpoint/apiAct001";
import type {
  ApiAct002RequestParam,
  ApiAct002ResponseOk,
} from "@sparcs-clubs/interface/api/activity/endpoint/apiAct002";
import type {
  ApiAct004RequestParam,
  ApiAct004ResponseOk,
} from "@sparcs-clubs/interface/api/activity/endpoint/apiAct004";
import type {
  ApiAct005RequestBody,
  ApiAct005ResponseOk,
} from "@sparcs-clubs/interface/api/activity/endpoint/apiAct005";

@Controller()
export default class ActivityController {
  constructor(private activityService: ActivityService) {}

  // TODO: Authentication 필요
  @Delete("/student/activities/activity/:activityId")
  @UsePipes(new ZodPipe(apiAct004))
  async deleteStudentActivity(
    @Param() param: ApiAct004RequestParam,
  ): Promise<ApiAct004ResponseOk> {
    const mockUpStudentId = 605;
    await this.activityService.deleteStudentActivity(
      param.activityId,
      mockUpStudentId,
    );

    return {};
  }

  // TODO: Authentication 필요
  @Get("/student/activities")
  @UsePipes(new ZodPipe(apiAct005))
  async getStudentActivities(
    @Body() body: ApiAct005RequestBody,
  ): Promise<ApiAct005ResponseOk> {
    const mockUpStudentId = 605;
    const result = await this.activityService.getStudentActivities(
      body.clubId,
      mockUpStudentId,
    );
    return result;
  }

  @Get("/student/activities/activity/:activityId")
  @UsePipes(new ZodPipe(apiAct002))
  async getStudentActivity(
    @Param() param: ApiAct002RequestParam,
  ): Promise<ApiAct002ResponseOk> {
    const mockUpStudentId = 605;
    const result = await this.activityService.getStudentActivity(
      param.activityId,
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
