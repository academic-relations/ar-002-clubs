import { ApiClb002ResponseOK } from "@sparcs-clubs/interface/api/club/endpoint/apiClb002";
import { Controller, Get, Param } from "@nestjs/common";
import { ClubService } from "../service/club.service";

@Controller("/api/club")
export class ClubController {
  constructor(private readonly clubService: ClubService) {}

  @Get(":id")
  async getClubDetails(
    @Param("id") clubId: number,
  ): Promise<ApiClb002ResponseOK> {
    const clubDetail = await this.clubService.getClubDetails(clubId);
    return clubDetail;
  }
}
