import { Injectable, NotFoundException } from "@nestjs/common";
import { ApiClb002ResponseOK } from "@sparcs-clubs/interface/api/club/endpoint/apiClb002";
import { ClubRepository } from "@sparcs-clubs/api/common/repository/club.repository";
import { ClubRepresentativeDRepository } from "@sparcs-clubs/api/feature/club/repository/club.club-representative-d.repository";
import { ClubRoomTRepository } from "@sparcs-clubs/api/feature/club/repository/club.club-room-t.repository";
import { ClubStudentTRepository } from "@sparcs-clubs/api/common/repository/club.club-student-t.repository";

@Injectable()
export class ClubService {
  constructor(
    private clubRepository: ClubRepository,
    private clubRepresentativeDRepository: ClubRepresentativeDRepository,
    private clubRoomTRepository: ClubRoomTRepository,
    private clubStudentTRepository: ClubStudentTRepository,
  ) {}

  async getClub(clubId: number): Promise<ApiClb002ResponseOK> {
    const [clubDetails, totalMemberCnt, representative, roomDetails] =
      await Promise.all([
        this.clubRepository.findClubDetail(clubId),
        this.clubStudentTRepository.findTotalMemberCntByClubId(clubId),
        this.clubRepresentativeDRepository.findRepresentativeNameByClubId(
          clubId,
        ),
        this.clubRoomTRepository.findClubLocationById(clubId),
      ]);

    if (!clubDetails) {
      throw new NotFoundException(`Club with ID ${clubId} not found.`);
    }
    if (!totalMemberCnt || !representative || !roomDetails) {
      throw new NotFoundException(
        `Some details for club ID ${clubId} are missing.`,
      );
    }

    return {
      id: clubDetails.id,
      name: clubDetails.name,
      type: clubDetails.type,
      characteristic: clubDetails.characteristic,
      advisor: clubDetails.advisor,
      divisionName: clubDetails.divisionName.name,
      description: clubDetails.description,
      foundingYear: clubDetails.foundingYear,
      totalMemberCnt: totalMemberCnt.totalMemberCnt,
      representative: representative
        ? representative.name
        : "No representative assigned",
      room: roomDetails.room,
      buildingName: roomDetails.buildingName,
    };
  }
}
