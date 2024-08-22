import { Body, Controller, Get, Param, Put, UsePipes } from "@nestjs/common";
import apiClb001, {
  ApiClb001ResponseOK,
} from "@sparcs-clubs/interface/api/club/endpoint/apiClb001";
import apiClb002, {
  ApiClb002RequestParam,
  ApiClb002ResponseOK,
} from "@sparcs-clubs/interface/api/club/endpoint/apiClb002";
import apiClb003, {
  ApiClb003ResponseOK,
} from "@sparcs-clubs/interface/api/club/endpoint/apiClb003";
import apiClb004, {
  ApiClb004RequestParam,
  ApiClb004ResponseOK,
} from "@sparcs-clubs/interface/api/club/endpoint/apiClb004";
import apiClb005, {
  ApiClb005RequestBody,
  ApiClb005RequestParam,
  ApiClb005ResponseCreated,
} from "@sparcs-clubs/interface/api/club/endpoint/apiClb005";

import { ZodPipe } from "@sparcs-clubs/api/common/pipe/zod-pipe";
import {
  Public,
  Student,
} from "@sparcs-clubs/api/common/util/decorators/method-decorator";
import { GetStudent } from "@sparcs-clubs/api/common/util/decorators/param-decorator";

import { ClubService } from "../service/club.service";

@Controller()
export class ClubController {
  constructor(private readonly clubService: ClubService) {}

  @Public()
  @Get("clubs")
  @UsePipes(new ZodPipe(apiClb001))
  async getClubs(): Promise<ApiClb001ResponseOK> {
    const result = await this.clubService.getClubs();
    // return apiClb001.responseBodyMap[200].parse(result);
    return result;
  }

  @Public()
  @Get("clubs/club/:clubId")
  @UsePipes(new ZodPipe(apiClb002))
  async getClub(
    @Param() param: ApiClb002RequestParam,
  ): Promise<ApiClb002ResponseOK> {
    const clubInfo = await this.clubService.getClub(param);
    // return apiClb002.responseBodyMap[200].parse(clubInfo);
    return clubInfo;
  }

  @Student()
  @Get("student/clubs/my")
  @UsePipes(new ZodPipe(apiClb003))
  async getStudentClubsMy(
    @GetStudent() user: GetStudent,
  ): Promise<ApiClb003ResponseOK> {
    const result = await this.clubService.getStudentClubsMy(user.studentId);
    return result;
  }

  @Student()
  @Get("student/clubs/club/:clubId/brief")
  @UsePipes(new ZodPipe(apiClb004))
  async getStudentClubBrief(
    @GetStudent() user: GetStudent,
    @Param() param: ApiClb004RequestParam,
  ): Promise<ApiClb004ResponseOK> {
    const result = await this.clubService.getStudentClubBrief(
      user.studentId,
      param,
    );
    return result;
  }

  @Student()
  @Put("student/clubs/club/:clubId/brief")
  @UsePipes(new ZodPipe(apiClb005))
  async putStudentClubBrief(
    @GetStudent() user: GetStudent,
    @Param() param: ApiClb005RequestParam,
    @Body() body: ApiClb005RequestBody,
  ): Promise<ApiClb005ResponseCreated> {
    const result = await this.clubService.putStudentClubBrief(
      user.studentId,
      param,
      body,
    );
    return result;
  }
}
