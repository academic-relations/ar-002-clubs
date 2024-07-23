import { Body, Controller, Get, Param, Put, UsePipes } from "@nestjs/common";

import apiClb006 from "@sparcs-clubs/interface/api/club/endpoint/apiClb006";
import apiClb007 from "@sparcs-clubs/interface/api/club/endpoint/apiClb007";

import { ZodPipe } from "@sparcs-clubs/api/common/pipe/zod-pipe";

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

  @Get("/student/clubs/club/:clubId/delegates")
  @UsePipes(new ZodPipe(apiClb006))
  async getStudentClubDelegates(
    @Param() param: ApiClb006RequestParam,
  ): Promise<ApiClb006ResponseOK> {
    const mockStudentId = 605;

    const result = await this.clubDelegateService.getStudentClubDelegates({
      studentId: mockStudentId,
      clubId: param.clubId,
    });

    return result;
  }

  @Put("/student/clubs/club/:clubId/delegates/delegate")
  @UsePipes(new ZodPipe(apiClb007))
  async putStudentClubDelegate(
    @Body() body: ApiClb007RequestBody,
    @Param() param: ApiClb007RequestParam,
  ): Promise<ApiClb007ResponseCreated> {
    const mockStudentId = 605;

    await this.clubDelegateService.putStudentClubDelegate({
      studentId: mockStudentId,
      targetStudentId: body.studentId,
      clubId: param.clubId,
      clubDelegateEnumId: body.delegateEnumId,
    });

    return {};
  }
}
