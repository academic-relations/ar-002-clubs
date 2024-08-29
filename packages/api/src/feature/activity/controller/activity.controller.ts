import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
} from "@nestjs/common";

import apiAct001 from "@sparcs-clubs/interface/api/activity/endpoint/apiAct001";
import apiAct002 from "@sparcs-clubs/interface/api/activity/endpoint/apiAct002";
import apiAct003 from "@sparcs-clubs/interface/api/activity/endpoint/apiAct003";
import apiAct004 from "@sparcs-clubs/interface/api/activity/endpoint/apiAct004";
import apiAct005 from "@sparcs-clubs/interface/api/activity/endpoint/apiAct005";
import apiAct007, {
  ApiAct007RequestBody,
  ApiAct007ResponseCreated,
} from "@sparcs-clubs/interface/api/activity/endpoint/apiAct007";
import apiAct008, {
  ApiAct008RequestBody,
  ApiAct008RequestParam,
  ApiAct008ResponseOk,
} from "@sparcs-clubs/interface/api/activity/endpoint/apiAct008";

import { ZodPipe } from "@sparcs-clubs/api/common/pipe/zod-pipe";

import { Student } from "@sparcs-clubs/api/common/util/decorators/method-decorator";
import { GetStudent } from "@sparcs-clubs/api/common/util/decorators/param-decorator";

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
  ApiAct003RequestBody,
  ApiAct003RequestParam,
  ApiAct003ResponseOk,
} from "@sparcs-clubs/interface/api/activity/endpoint/apiAct003";
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
  @Student()
  @Delete("/student/activities/activity/:activityId")
  @UsePipes(new ZodPipe(apiAct004))
  async deleteStudentActivity(
    @GetStudent() user: GetStudent,
    @Param() param: ApiAct004RequestParam,
  ): Promise<ApiAct004ResponseOk> {
    await this.activityService.deleteStudentActivity(
      param.activityId,
      user.studentId,
    );

    return {};
  }

  // TODO: Authentication 필요
  @Student()
  @Get("/student/activities")
  @UsePipes(new ZodPipe(apiAct005))
  async getStudentActivities(
    @GetStudent() user: GetStudent,
    @Body() body: ApiAct005RequestBody,
  ): Promise<ApiAct005ResponseOk> {
    const result = await this.activityService.getStudentActivities(
      body.clubId,
      user.studentId,
    );
    return result;
  }

  // TODO: Authentication 필요
  @Student()
  @Get("/student/activities/activity/:activityId")
  @UsePipes(new ZodPipe(apiAct002))
  async getStudentActivity(
    @GetStudent() user: GetStudent,
    @Param() param: ApiAct002RequestParam,
  ): Promise<ApiAct002ResponseOk> {
    const result = await this.activityService.getStudentActivity(
      param.activityId,
      user.studentId,
    );

    return result;
  }

  // TODO: Authentication 필요
  @Student()
  @Post("/student/activities/activity")
  @UsePipes(new ZodPipe(apiAct001))
  async postStudentActivity(
    @GetStudent() user: GetStudent,
    @Body() body: ApiAct001RequestBody,
  ): Promise<ApiAct001ResponseCreated> {
    await this.activityService.postStudentActivity(body, user.studentId);
    return {};
  }

  // TODO: Authentication 필요
  @Student()
  @Put("/student/activities/activity/:activityId")
  @UsePipes(new ZodPipe(apiAct003))
  async putStudentActivity(
    @GetStudent() user: GetStudent,
    @Param() param: ApiAct003RequestParam,
    @Body() body: ApiAct003RequestBody,
  ): Promise<ApiAct003ResponseOk> {
    await this.activityService.putStudentActivity(param, body, user.studentId);
    return {};
  }

  @Student()
  @Post("/student/activities/activity/provisional")
  @UsePipes(new ZodPipe(apiAct007))
  async postStudentActivityProvisional(
    @GetStudent() user: GetStudent,
    @Body() body: ApiAct007RequestBody,
  ): Promise<ApiAct007ResponseCreated> {
    await this.activityService.postStudentActivityProvisional(
      body,
      user.studentId,
    );
    return {};
  }

  @Student()
  @Put("/student/activities/activity/:activityId/provisional")
  @UsePipes(new ZodPipe(apiAct008))
  async putStudentActivityProvisional(
    @GetStudent() user: GetStudent,
    @Param() param: ApiAct008RequestParam,
    @Body() body: ApiAct008RequestBody,
  ): Promise<ApiAct008ResponseOk> {
    await this.activityService.putStudentActivityProvisional(
      param,
      body,
      user.studentId,
    );
    return {};
  }
}
