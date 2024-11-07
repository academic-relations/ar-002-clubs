import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Res,
  UsePipes,
} from "@nestjs/common";

import apiClb006 from "@sparcs-clubs/interface/api/club/endpoint/apiClb006";
import apiClb007 from "@sparcs-clubs/interface/api/club/endpoint/apiClb007";
import apiClb008 from "@sparcs-clubs/interface/api/club/endpoint/apiClb008";
import apiClb011 from "@sparcs-clubs/interface/api/club/endpoint/apiClb011";
import apiClb012 from "@sparcs-clubs/interface/api/club/endpoint/apiClb012";
import apiClb013 from "@sparcs-clubs/interface/api/club/endpoint/apiClb013";
import apiClb015 from "@sparcs-clubs/interface/api/club/endpoint/apiClb015";

import { Response } from "express";

import { ZodPipe } from "@sparcs-clubs/api/common/pipe/zod-pipe";

import { Student } from "@sparcs-clubs/api/common/util/decorators/method-decorator";
import { GetStudent } from "@sparcs-clubs/api/common/util/decorators/param-decorator";

import ClubDelegateService from "./delegate.service";

import type {
  ApiClb006RequestParam,
  ApiClb006ResponseOK,
} from "@sparcs-clubs/interface/api/club/endpoint/apiClb006";
import type {
  ApiClb007RequestBody,
  ApiClb007RequestParam,
  ApiClb007ResponseCreated,
} from "@sparcs-clubs/interface/api/club/endpoint/apiClb007";
import type {
  ApiClb008RequestParam,
  ApiClb008ResponseOk,
} from "@sparcs-clubs/interface/api/club/endpoint/apiClb008";
import type {
  ApiClb011RequestParam,
  ApiClb011ResponseOk,
} from "@sparcs-clubs/interface/api/club/endpoint/apiClb011";
import type {
  ApiClb012RequestParam,
  ApiClb012ResponseCreated,
} from "@sparcs-clubs/interface/api/club/endpoint/apiClb012";
import type {
  ApiClb013RequestParam,
  ApiClb013ResponseOk,
} from "@sparcs-clubs/interface/api/club/endpoint/apiClb013";
import type {
  ApiClb015ResponseNoContent,
  ApiClb015ResponseOk,
} from "@sparcs-clubs/interface/api/club/endpoint/apiClb015";

@Controller()
export default class ClubDelegateController {
  constructor(private clubDelegateService: ClubDelegateService) {}

  @Student()
  @Get("/student/clubs/club/:clubId/delegates")
  @UsePipes(new ZodPipe(apiClb006))
  async getStudentClubDelegates(
    @GetStudent() user: GetStudent,
    @Param() param: ApiClb006RequestParam,
  ): Promise<ApiClb006ResponseOK> {
    const result = await this.clubDelegateService.getStudentClubDelegates({
      studentId: user.studentId,
      clubId: param.clubId,
    });

    return result;
  }

  @Student()
  @Put("/student/clubs/club/:clubId/delegates/delegate")
  @UsePipes(new ZodPipe(apiClb007))
  async putStudentClubDelegate(
    @GetStudent() user: GetStudent,
    @Body() body: ApiClb007RequestBody,
    @Param() param: ApiClb007RequestParam,
  ): Promise<ApiClb007ResponseCreated> {
    await this.clubDelegateService.putStudentClubDelegate({
      studentId: user.studentId,
      targetStudentId: body.studentId,
      clubId: param.clubId,
      clubDelegateEnumId: body.delegateEnumId,
    });

    return {};
  }

  @Student()
  @Get(
    "/student/clubs/club/:clubId/delegates/delegate/:delegateEnumId/candidates",
  )
  @UsePipes(new ZodPipe(apiClb008))
  async getStudentClubDelegateCandidates(
    @GetStudent() user: GetStudent,
    @Param() param: ApiClb008RequestParam,
  ): Promise<ApiClb008ResponseOk> {
    const result =
      await this.clubDelegateService.getStudentClubDelegateCandidates({
        studentId: user.studentId,
        param,
      });

    return result;
  }

  @Student()
  @Get("/student/clubs/club/:clubId/delegates/delegate/requests")
  @UsePipes(new ZodPipe(apiClb011))
  async getStudentClubDelegateRequests(
    @GetStudent() user: GetStudent,
    @Param() param: ApiClb011RequestParam,
  ): Promise<ApiClb011ResponseOk> {
    const result =
      await this.clubDelegateService.getStudentClubDelegateRequests({
        studentId: user.studentId,
        param,
      });

    return result;
  }

  @Student()
  @Delete("/student/clubs/club/:clubId/delegates/delegate/requests")
  @UsePipes(new ZodPipe(apiClb012))
  async deleteStudentClubDelegateRequests(
    @GetStudent() user: GetStudent,
    @Param() param: ApiClb012RequestParam,
  ): Promise<ApiClb012ResponseCreated> {
    await this.clubDelegateService.deleteStudentClubDelegateRequests({
      studentId: user.studentId,
      param,
    });

    return {};
  }

  @Student()
  @Get("/student/clubs/delegates/requests")
  @UsePipes(new ZodPipe(apiClb013))
  async getStudentClubsDelegatesRequests(
    @GetStudent() user: GetStudent,
    @Param() param: ApiClb013RequestParam,
  ): Promise<ApiClb013ResponseOk> {
    const result =
      await this.clubDelegateService.getStudentClubsDelegatesRequests({
        studentId: user.studentId,
        param,
      });

    return result;
  }

  @Student()
  @Get("/student/clubs/delegates/delegate/my")
  @UsePipes(new ZodPipe(apiClb015))
  async getStudentClubDelegate(
    @GetStudent() user: GetStudent,
    @Res({ passthrough: true }) res: Response,
  ): Promise<ApiClb015ResponseOk | ApiClb015ResponseNoContent> {
    const result = await this.clubDelegateService.getStudentClubDelegate(
      user.studentId,
    );

    res.status(result.status);
    return result.data;
  }
}
