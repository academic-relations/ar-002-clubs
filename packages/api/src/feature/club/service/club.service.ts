import { Injectable } from "@nestjs/common";
import { ApiClb002ResponseOK } from "@sparcs-clubs/interface/api/club/endpoint/apiClb002";
import { ClubRepository } from "@sparcs-clubs/api/feature/club/repository/club.club.repository";
import { ClubRepresentativeDRepository } from "@sparcs-clubs/api/feature/club/repository/club.club-representative.repository";
import { ClubRoomTRepository } from "@sparcs-clubs/api/feature/club/repository/club.club-room-t.repository";
import { ClubStudentTRepository } from "@sparcs-clubs/api/feature/club/repository/club.club-student-t.repository";

@Injectable()
export class ClubService {
  constructor(
    private clubRepository: ClubRepository,
    private clubRepresentativeDRepository: ClubRepresentativeDRepository,
    private clubRoomTRepository: ClubRoomTRepository,
    private clubStudentTRepository: ClubStudentTRepository,
  ) {}

  async getClubDetails(clubId: number): Promise<ApiClb002ResponseOK> {
    const [
      { clubInfo, divisionName },
      totalMemberCnt,
      representative,
      roomDetails,
    ] = await Promise.all([
      this.clubRepository.findClubDetailsById(clubId),
      this.clubStudentTRepository.findTotalMemberCntByClubId(clubId),
      this.clubRepresentativeDRepository.findRepresentativeNameByClubId(clubId),
      this.clubRoomTRepository.findClubLocationById(clubId),
    ]);

    const result = {
      ...clubInfo,
      ...totalMemberCnt,
      ...divisionName,
      ...roomDetails,
      representative: representative.name,
    };

    return result;
  }
}
