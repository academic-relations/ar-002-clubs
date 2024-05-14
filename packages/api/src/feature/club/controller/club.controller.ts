import { Controller, Get } from "@nestjs/common";
import { ApiClb001ResponseOK } from "@sparcs-clubs/interface/api/club/endpoint/apiClb001";
import { ClubService } from "../service/club.service";

@Controller()
export class ClubController {
  constructor(private readonly clubService: ClubService) {}

  @Get("clubs")
  async getClubs(): Promise<ApiClb001ResponseOK> {
    const result = await this.clubService.getClubs();
    return result;
  }
}
