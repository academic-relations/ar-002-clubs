import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
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
import apiAct010 from "@sparcs-clubs/interface/api/activity/endpoint/apiAct010";
import apiAct011 from "@sparcs-clubs/interface/api/activity/endpoint/apiAct011";
import apiAct012 from "@sparcs-clubs/interface/api/activity/endpoint/apiAct012";
import apiAct013 from "@sparcs-clubs/interface/api/activity/endpoint/apiAct013";
import apiAct014 from "@sparcs-clubs/interface/api/activity/endpoint/apiAct014";
import apiAct015 from "@sparcs-clubs/interface/api/activity/endpoint/apiAct015";
import apiAct016 from "@sparcs-clubs/interface/api/activity/endpoint/apiAct016";
import apiAct017 from "@sparcs-clubs/interface/api/activity/endpoint/apiAct017";

import { ZodPipe } from "@sparcs-clubs/api/common/pipe/zod-pipe";

import {
  Executive,
  Professor,
  Student,
} from "@sparcs-clubs/api/common/util/decorators/method-decorator";
import {
  GetExecutive,
  GetStudent,
} from "@sparcs-clubs/api/common/util/decorators/param-decorator";

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
import type {
  ApiAct010RequestQuery,
  ApiAct010ResponseOk,
} from "@sparcs-clubs/interface/api/activity/endpoint/apiAct010";
import type {
  ApiAct011RequestQuery,
  ApiAct011ResponseOk,
} from "@sparcs-clubs/interface/api/activity/endpoint/apiAct011";
import type {
  ApiAct012RequestQuery,
  ApiAct012ResponseOk,
} from "@sparcs-clubs/interface/api/activity/endpoint/apiAct012";
import type {
  ApiAct013RequestQuery,
  ApiAct013ResponseOk,
} from "@sparcs-clubs/interface/api/activity/endpoint/apiAct013";
import type {
  ApiAct014RequestParam,
  ApiAct014ResponseOk,
} from "@sparcs-clubs/interface/api/activity/endpoint/apiAct014";
import type {
  ApiAct015RequestParam,
  ApiAct015ResponseOk,
} from "@sparcs-clubs/interface/api/activity/endpoint/apiAct015";
import type {
  ApiAct016RequestParam,
  ApiAct016ResponseOk,
} from "@sparcs-clubs/interface/api/activity/endpoint/apiAct016";
import type {
  ApiAct017RequestBody,
  ApiAct017RequestParam,
  ApiAct017ResponseOk,
} from "@sparcs-clubs/interface/api/activity/endpoint/apiAct017";

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

  @Student()
  @Delete("/student/activities/activity/:activityId/provisional")
  @UsePipes(new ZodPipe(apiAct004))
  async deleteStudentActivityProvisional(
    @GetStudent() user: GetStudent,
    @Param() param: ApiAct004RequestParam,
  ): Promise<ApiAct004ResponseOk> {
    await this.activityService.deleteStudentActivityProvisional(
      param.activityId,
      user.studentId,
    );
    return {};
  }

  @Student()
  @Get("/student/activities/available-members")
  @UsePipes(new ZodPipe(apiAct010))
  async getStudentActivitiesAvailableMembers(
    @GetStudent() user: GetStudent,
    @Query() query: ApiAct010RequestQuery,
  ): Promise<ApiAct010ResponseOk> {
    const result =
      await this.activityService.getStudentActivitiesAvailableMembers({
        studentId: user.studentId,
        query,
      });
    return result;
  }

  @Student()
  @Get("/student/provisional/activities")
  @UsePipes(new ZodPipe(apiAct011))
  async getStudentProvisionalActivities(
    @GetStudent() user: GetStudent,
    @Query() query: ApiAct011RequestQuery,
  ): Promise<ApiAct011ResponseOk> {
    const result = await this.activityService.getStudentProvisionalActivities({
      studentId: user.studentId,
      query,
    });

    return result;
  }

  @Executive()
  @Get("/executive/provisional/activities")
  @UsePipes(new ZodPipe(apiAct012))
  async getExecutiveProvisionalActivities(
    @Query() query: ApiAct012RequestQuery,
  ): Promise<ApiAct012ResponseOk> {
    const result = await this.activityService.getExecutiveProvisionalActivities(
      {
        query,
      },
    );

    return result;
  }

  @Professor()
  @Get("/professor/provisional/activities")
  @UsePipes(new ZodPipe(apiAct013))
  async getProfessorProvisionalActivities(
    @Query() query: ApiAct013RequestQuery,
  ): Promise<ApiAct013ResponseOk> {
    const result = await this.activityService.getProfessorProvisionalActivities(
      {
        query,
      },
    );

    return result;
  }

  @Executive()
  @Get("/executive/activities/activity/:activityId")
  @UsePipes(new ZodPipe(apiAct014))
  async getExecutiveActivity(
    @Param() param: ApiAct014RequestParam,
  ): Promise<ApiAct014ResponseOk> {
    const result = await this.activityService.getExecutiveActivity(
      param.activityId,
    );

    return result;
  }

  @Professor()
  @Get("/professor/activities/activity/:activityId")
  @UsePipes(new ZodPipe(apiAct015))
  async getProfessorActivity(
    @Param() param: ApiAct015RequestParam,
  ): Promise<ApiAct015ResponseOk> {
    const result = await this.activityService.getProfessorActivity(
      param.activityId,
    );

    return result;
  }

  @Executive()
  @Patch("/executive/activities/activity/:activityId/approval")
  @UsePipes(new ZodPipe(apiAct016))
  async patchExecutiveActivityApproval(
    @GetExecutive() user: GetExecutive,
    @Param() param: ApiAct016RequestParam,
  ): Promise<ApiAct016ResponseOk> {
    const result = await this.activityService.patchExecutiveActivityApproval({
      executiveId: user.executiveId,
      param,
    });
    return result;
  }

  @Executive()
  @Patch("/executive/activities/activity/:activityId/send-back")
  @UsePipes(new ZodPipe(apiAct017))
  async patchExecutiveActivitySendBack(
    @GetExecutive() user: GetExecutive,
    @Param() param: ApiAct017RequestParam,
    @Body() body: ApiAct017RequestBody,
  ): Promise<ApiAct017ResponseOk> {
    const result = await this.activityService.patchExecutiveActivitySendBack({
      executiveId: user.executiveId,
      param,
      body,
    });
    return result;
  }
}
