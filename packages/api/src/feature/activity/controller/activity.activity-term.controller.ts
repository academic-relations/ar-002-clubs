import { Body, Controller, Get, Param, UsePipes } from "@nestjs/common";

import apiAct006 from "@sparcs-clubs/interface/api/activity/endpoint/apiAct006";
import apiAct009 from "@sparcs-clubs/interface/api/activity/endpoint/apiAct009";

import { ZodPipe } from "@sparcs-clubs/api/common/pipe/zod-pipe";

import { Student } from "@sparcs-clubs/api/common/util/decorators/method-decorator";

import { GetStudent } from "@sparcs-clubs/api/common/util/decorators/param-decorator";

import ActivityActivityTermService from "../service/activity.activity-term.service";

import type {
  ApiAct006RequestBody,
  ApiAct006RequestParam,
  ApiAct006ResponseOk,
} from "@sparcs-clubs/interface/api/activity/endpoint/apiAct006";
import type {
  ApiAct009RequestBody,
  ApiAct009ResponseOk,
} from "@sparcs-clubs/interface/api/activity/endpoint/apiAct009";

@Controller()
export default class ActivityActivityTermController {
  constructor(
    private activityActivityTermService: ActivityActivityTermService,
  ) {}

  @Student()
  @Get("/student/activities/activity-terms")
  @UsePipes(new ZodPipe(apiAct009))
  async getStudentActivitiesActivityTerms(
    @GetStudent() user: GetStudent,
    @Body() body: ApiAct009RequestBody,
  ): Promise<ApiAct009ResponseOk> {
    const result =
      await this.activityActivityTermService.getStudentActivitiesActivityTerms(
        body,
        user.studentId,
      );
    return result;
  }

  @Student()
  @Get("/student/activities/activity-terms/activity-term/:activityTermId")
  @UsePipes(new ZodPipe(apiAct006))
  async getStudentActivitiesActivityTerm(
    @GetStudent() user: GetStudent,
    @Param() param: ApiAct006RequestParam,
    @Body() body: ApiAct006RequestBody,
  ): Promise<ApiAct006ResponseOk> {
    const result =
      await this.activityActivityTermService.getStudentActivitiesActivityTerm(
        param,
        body,
        user.studentId,
      );
    return result;
  }
}
