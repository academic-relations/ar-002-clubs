import { Body, Controller, Get, UsePipes } from "@nestjs/common";

import apiAct009 from "@sparcs-clubs/interface/api/activity/endpoint/apiAct009";

import { ZodPipe } from "@sparcs-clubs/api/common/pipe/zod-pipe";

import ActivityActivityTermService from "../service/activity.activity-term.service";

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
}
