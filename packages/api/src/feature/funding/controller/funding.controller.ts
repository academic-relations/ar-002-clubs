import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
} from "@nestjs/common";
import apiFnd001, {
  ApiFnd001RequestBody,
  ApiFnd001ResponseCreated,
} from "@sparcs-clubs/interface/api/funding/endpoint/apiFnd001";
import apiFnd002, {
  ApiFnd002RequestParam,
  ApiFnd002ResponseOk,
} from "@sparcs-clubs/interface/api/funding/endpoint/apiFnd002";
import apiFnd003, {
  ApiFnd003RequestBody,
  ApiFnd003RequestParam,
  ApiFnd003ResponseOk,
} from "@sparcs-clubs/interface/api/funding/endpoint/apiFnd003";
import apiFnd004, {
  ApiFnd004RequestParam,
  ApiFnd004ResponseOk,
} from "@sparcs-clubs/interface/api/funding/endpoint/apiFnd004";
import apiFnd005, {
  ApiFnd005RequestQuery,
  ApiFnd005ResponseOk,
} from "@sparcs-clubs/interface/api/funding/endpoint/apiFnd005";
import apiFnd006, {
  ApiFnd006RequestParam,
  ApiFnd006RequestQuery,
  ApiFnd006ResponseOk,
} from "@sparcs-clubs/interface/api/funding/endpoint/apiFnd006";
import apiFnd007, {
  ApiFnd007ResponseOk,
} from "@sparcs-clubs/interface/api/funding/endpoint/apiFnd007";
import apiFnd012, {
  ApiFnd012RequestParam,
  ApiFnd012RequestUrl,
  ApiFnd012ResponseOk,
} from "@sparcs-clubs/interface/api/funding/endpoint/apiFnd012";
import apiFnd013, {
  ApiFnd013RequestBody,
  ApiFnd013RequestParam,
  ApiFnd013RequestUrl,
  ApiFnd013ResponseCreated,
} from "@sparcs-clubs/interface/api/funding/endpoint/apiFnd013";

import { ZodPipe } from "@sparcs-clubs/api/common/pipe/zod-pipe";

import {
  Executive,
  Public,
  Student,
} from "@sparcs-clubs/api/common/util/decorators/method-decorator";
import {
  GetExecutive,
  GetStudent,
} from "@sparcs-clubs/api/common/util/decorators/param-decorator";

import FundingService from "../service/funding.service";

@Controller()
export default class FundingController {
  constructor(private fundingService: FundingService) {}

  @Student()
  @Post("student/fundings/funding")
  @UsePipes(new ZodPipe(apiFnd001))
  async createStudentFunding(
    @GetStudent() user: GetStudent,
    @Body() body: ApiFnd001RequestBody,
  ): Promise<ApiFnd001ResponseCreated> {
    await this.fundingService.postStudentFunding(body, user.studentId);
    return {};
  }

  @Student()
  @Get("student/fundings/funding/:id")
  @UsePipes(new ZodPipe(apiFnd002))
  async getStudentFunding(
    @GetStudent() user: GetStudent,
    @Param() param: ApiFnd002RequestParam,
  ): Promise<ApiFnd002ResponseOk> {
    const result = await this.fundingService.getStudentFunding(
      param,
      user.studentId,
    );
    return result;
  }

  @Student()
  @Put("student/fundings/funding/:id")
  @UsePipes(new ZodPipe(apiFnd003))
  async putStudentFunding(
    @GetStudent() user: GetStudent,
    @Param() param: ApiFnd003RequestParam,
    @Body() body: ApiFnd003RequestBody,
  ): Promise<ApiFnd003ResponseOk> {
    await this.fundingService.putStudentFunding(body, param, user.studentId);
    return {};
  }

  @Student()
  @Delete("student/fundings/funding/:id")
  @UsePipes(new ZodPipe(apiFnd004))
  async deleteStudentFunding(
    @GetStudent() user: GetStudent,
    @Param() param: ApiFnd004RequestParam,
  ): Promise<ApiFnd004ResponseOk> {
    await this.fundingService.deleteStudentFunding(user.studentId, param);
    return {};
  }

  @Student()
  @Get("student/fundings")
  @UsePipes(new ZodPipe(apiFnd005))
  async getStudentFundings(
    @GetStudent() user: GetStudent,
    @Query() query: ApiFnd005RequestQuery,
  ): Promise<ApiFnd005ResponseOk> {
    return this.fundingService.getStudentFundings(user.studentId, query);
  }

  @Student()
  @Get("student/fundings/activity-durations/activity-duration/:activityDId")
  @UsePipes(new ZodPipe(apiFnd006))
  async getStudentFundingActivityDuration(
    @GetStudent() user: GetStudent,
    @Param() param: ApiFnd006RequestParam,
    @Query() query: ApiFnd006RequestQuery,
  ): Promise<ApiFnd006ResponseOk> {
    return this.fundingService.getStudentFundingActivityDuration(
      user.studentId,
      param,
      query,
    );
  }

  @Public()
  @Get("/public/fundings/deadline")
  @UsePipes(new ZodPipe(apiFnd007))
  async getPublicFundingsDeadline(): Promise<ApiFnd007ResponseOk> {
    return this.fundingService.getPublicFundingsDeadline();
  }

  @Executive()
  @Get(ApiFnd012RequestUrl)
  @UsePipes(new ZodPipe(apiFnd012))
  async getExecutiveFunding(
    @GetExecutive() executive: GetExecutive,
    @Param() param: ApiFnd012RequestParam,
  ): Promise<ApiFnd012ResponseOk> {
    return this.fundingService.getExecutiveFunding(
      executive.executiveId,
      param.id,
    );
  }

  @Executive()
  @Post(ApiFnd013RequestUrl)
  @UsePipes(new ZodPipe(apiFnd013))
  async postExecutiveFundingComment(
    @GetExecutive() executive: GetExecutive,
    @Param() param: ApiFnd013RequestParam,
    @Body() body: ApiFnd013RequestBody,
  ): Promise<ApiFnd013ResponseCreated> {
    return this.fundingService.postExecutiveFundingComment(
      executive.executiveId,
      param.id,
      body.fundingStatusEnum,
      body.approvedAmount,
      body.content,
    );
  }
}
