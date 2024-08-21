import { Body, Controller, Get, Param, Put, UsePipes } from "@nestjs/common";

import apiClb006 from "@sparcs-clubs/interface/api/club/endpoint/apiClb006";
import apiClb007 from "@sparcs-clubs/interface/api/club/endpoint/apiClb007";

import { ZodPipe } from "@sparcs-clubs/api/common/pipe/zod-pipe";

import { Student } from "@sparcs-clubs/api/common/util/decorators/method-decorator";
import { GetStudent } from "@sparcs-clubs/api/common/util/decorators/param-decorator";

import ClubDelegateService from "../service/club-delegate.service";

import type {
  ApiClb006RequestParam,
  ApiClb006ResponseOK,
} from "@sparcs-clubs/interface/api/club/endpoint/apiClb006";
import type {
  ApiClb007RequestBody,
  ApiClb007RequestParam,
  ApiClb007ResponseCreated,
} from "@sparcs-clubs/interface/api/club/endpoint/apiClb007";

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
}
