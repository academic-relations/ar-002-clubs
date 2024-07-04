import { Body, Controller, Post, UsePipes } from "@nestjs/common";

import apiAct001 from "@sparcs-clubs/interface/api/activity/endpoint/apiAct001";

import { ZodPipe } from "@sparcs-clubs/api/common/pipe/zod-pipe";

import ActivityService from "../service/activity.service";

import type {
  ApiAct001RequestBody,
  ApiAct001ResponseCreated,
} from "@sparcs-clubs/interface/api/activity/endpoint/apiAct001";

@Controller()
@UsePipes(new ZodPipe(apiAct001))
export default class ActivityController {
  constructor(private activityService: ActivityService) {}

  @Post("/student/activities/activity")
  async postStudentActivity(
    @Body() body: ApiAct001RequestBody,
  ): Promise<ApiAct001ResponseCreated> {
    await this.activityService.postStudentActivity(body);

    return {};
  }
}
