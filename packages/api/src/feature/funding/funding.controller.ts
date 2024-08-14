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
import apiFnd001, {
  ApiFnd001RequestBody,
  ApiFnd001ResponseCreated,
} from "@sparcs-clubs/interface/api/funding/apiFnd001";
import apiFnd002, {
  ApiFnd002RequestParam,
  ApiFnd002ResponseOk,
} from "@sparcs-clubs/interface/api/funding/apiFnd002";
import apiFnd003, {
  ApiFnd003RequestBody,
  ApiFnd003RequestParam,
  ApiFnd003ResponseOk,
} from "@sparcs-clubs/interface/api/funding/apiFnd003";
import apiFnd004, {
  ApiFnd004RequestParam,
  ApiFnd004ResponseOk,
} from "@sparcs-clubs/interface/api/funding/apiFnd004";
import apiFnd005, {
  ApiFnd005RequestBody,
  ApiFnd005ResponseOk,
} from "@sparcs-clubs/interface/api/funding/apiFnd005";
import apiFnd006, {
  ApiFnd006RequestBody,
  ApiFnd006RequestParam,
  ApiFnd006ResponseOk,
} from "@sparcs-clubs/interface/api/funding/apiFnd006";

import { ZodPipe } from "@sparcs-clubs/api/common/pipe/zod-pipe";

import { Student } from "@sparcs-clubs/api/common/util/decorators/method-decorator";
import { GetStudent } from "@sparcs-clubs/api/common/util/decorators/param-decorator";

import FundingService from "./funding.service";

@Controller()
export default class FundingController {
  constructor(private fundingService: FundingService) {}

  // TODO: Authentication 필요
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

  // TODO: Authentication 필요
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

  // TODO: Authentication 필요
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
    @Body() body: ApiFnd005RequestBody,
  ): Promise<ApiFnd005ResponseOk> {
    return this.fundingService.getStudentFundings(user.studentId, body);
  }

  @Student()
  @Get("student/fundings/semesters/semester/:semesterId")
  @UsePipes(new ZodPipe(apiFnd006))
  async getStudentFundingSemester(
    @GetStudent() user: GetStudent,
    @Param() param: ApiFnd006RequestParam,
    @Body() body: ApiFnd006RequestBody,
  ): Promise<ApiFnd006ResponseOk> {
    return this.fundingService.getStudentFundingSemester(
      user.studentId,
      param,
      body,
    );
  }
}
