import { Controller, Get } from "@nestjs/common";
import { ClubService } from "../service/club.service";

@Controller("club")
export class ClubController {
  constructor(private readonly clubService: ClubService) {}

  @Get("clubs")
  async getClubs() {
    const result = await this.clubService.getClubs();
    return result;
  }
}
