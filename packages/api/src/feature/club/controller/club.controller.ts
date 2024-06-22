import { Controller, Get, Param, UsePipes } from "@nestjs/common";
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
import { ZodPipe } from "@sparcs-clubs/api/common/pipe/zod-pipe";
import { ClubService } from "../service/club.service";

@Controller()
export class ClubController {
  constructor(private readonly clubService: ClubService) {}

  @Get("clubs")
  @UsePipes(new ZodPipe(apiClb001))
  async getClubs(): Promise<ApiClb001ResponseOK> {
    const result = await this.clubService.getClubs();
    // return apiClb001.responseBodyMap[200].parse(result);
    return result;
  }

  @Get("clubs/club/:clubId")
  @UsePipes(new ZodPipe(apiClb002))
  async getClub(
    @Param() param: ApiClb002RequestParam,
  ): Promise<ApiClb002ResponseOK> {
    const clubInfo = await this.clubService.getClub(param);
    // return apiClb002.responseBodyMap[200].parse(clubInfo);
    return clubInfo;
  }

  @Get("student/clubs/my")
  @UsePipes(new ZodPipe(apiClb003))
  async getStudentClubsMy(): Promise<ApiClb003ResponseOK> {
    // TODO: getProfileStudent로 인증 로직 이용해 수정 필요
    const studentId = 605;
    const result = await this.clubService.getStudentClubsMy(studentId);
    // return apiClb003.responseBodyMap[200].parse(result);
    return result;
  }
}
