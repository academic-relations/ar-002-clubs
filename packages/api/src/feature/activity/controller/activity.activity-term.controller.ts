import { Body, Controller, Get, Param, UsePipes } from "@nestjs/common";

import apiAct006 from "@sparcs-clubs/interface/api/activity/endpoint/apiAct006";
import apiAct009 from "@sparcs-clubs/interface/api/activity/endpoint/apiAct009";

import { ZodPipe } from "@sparcs-clubs/api/common/pipe/zod-pipe";

import ActivityActivityTermService from "../service/activity.activity-term.service";

import type {
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

  @Get("/student/activities/activity-terms")
  @UsePipes(new ZodPipe(apiAct009))
  async getStudentActivitiesActivityTerms(
    @Body() body: ApiAct009RequestBody,
  ): Promise<ApiAct009ResponseOk> {
    const mockUpStudentId = 605;
    const result =
      await this.activityActivityTermService.getStudentActivitiesActivityTerms(
        body,
        mockUpStudentId,
      );
    return result;
  }

  @Get("/student/activities/activity-terms/activity-term/:activityTermId")
  @UsePipes(new ZodPipe(apiAct006))
  async getStudentActivitiesActivityTerm(
    @Param() param: ApiAct006RequestParam,
    @Body() body: ApiAct009RequestBody,
  ): Promise<ApiAct006ResponseOk> {
    const mockUpStudentId = 605;
    const result =
      await this.activityActivityTermService.getStudentActivitiesActivityTerm(
        param,
        body,
        mockUpStudentId,
      );
    return result;
  }
}
