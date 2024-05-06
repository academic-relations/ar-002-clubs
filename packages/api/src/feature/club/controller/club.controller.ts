import { Controller } from "@nestjs/common";
import { ClubService } from "../service/club.service";

@Controller("")
export class ClubController {
  constructor(private readonly clubService: ClubService) {}

  // @Get("student/clubs/my")
  // async getClubsByStudent(@GetUser() user: ProfileDto) {
  //   const clubs = await this.clubService.findAllClubsByStudent(user);
  //   return clubs;
  // }
}
