import { ClubsResponseDtoType } from "@sparcs-clubs/interface/common/interfaces/IClubs";
import { Controller, Get } from "@nestjs/common";
import { ClubNotFoundException } from "@sparcs-clubs/api/features/club/club.exception";
import { ClubsService } from "./clubs.service";

@Controller("clubs")
export class ClubsController {
  constructor(private readonly clubsService: ClubsService) {}

  @Get()
  async getClubs(): Promise<ClubsResponseDtoType[]> {
    // await this.clubsService.getClubs();
    // return [
    //   {
    //     id: 1,
    //     name: "clubs",
    //     clubs: [
    //       {
    //         id: 2,
    //         name: "sparcs",
    //         type: "test",
    //         characteristic: "test1",
    //         representative: "tes",
    //         advisor: "te",
    //         totalMemberCnt: 10,
    //       },
    //     ],
    //   },
    // ];
    // throw new ClubNotFoundException();
    throw new ClubNotFoundException();
  }
}
