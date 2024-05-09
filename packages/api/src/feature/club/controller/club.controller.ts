import {
  ApiClb002RequestParam,
  ApiClb002ResponseOK,
} from "@sparcs-clubs/interface/api/club/endpoint/apiClb002";
import { Controller, Get, Param } from "@nestjs/common";
import { ClubService } from "../service/club.service";

@Controller("/api/club")
export class ClubController {
  constructor(private readonly clubService: ClubService) {}

  @Get(":id")
  async getClub(
    @Param("id") clubId: ApiClb002RequestParam,
  ): Promise<ApiClb002ResponseOK> {
    const clubInfo = await this.clubService.getClub(Number(clubId));
    return clubInfo;
  }
}
