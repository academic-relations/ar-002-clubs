import { ApiClb001ResponseOK } from "@sparcs-clubs/interface/api/club/endpoint/apiClb001";
import {
  ApiClb002RequestParam,
  ApiClb002ResponseOK,
} from "@sparcs-clubs/interface/api/club/endpoint/apiClb002";
import apiClb003, {
  ApiClb003ResponseOK,
} from "@sparcs-clubs/interface/api/club/endpoint/apiClb003";
import { Controller, Get, Param, UsePipes } from "@nestjs/common";
import { ZodPipe } from "@sparcs-clubs/api/common/pipes/zod-pipe";
import { ClubService } from "../service/club.service";

@Controller()
export class ClubController {
  constructor(private readonly clubService: ClubService) {}

  @Get("clubs")
  async getClubs(): Promise<ApiClb001ResponseOK> {
    const result = await this.clubService.getClubs();
    return result;
  }

  @Get("clubs/club/:id")
  async getClub(
    @Param("id") clubId: ApiClb002RequestParam,
  ): Promise<ApiClb002ResponseOK> {
    const clubInfo = await this.clubService.getClub(Number(clubId));
    return clubInfo;
  }

  @Get("student/clubs/my")
  @UsePipes(new ZodPipe(apiClb003))
  async getStudentClubsMy(): Promise<ApiClb003ResponseOK> {
    // TODO: getProfileStudent로 인증 로직 이용해 수정 필요
    const studentId = 1;
    const result = await this.clubService.getStudentClubsMy(studentId);
    return result;
  }
}
