import { ClubRepository } from "@sparcs-clubs/api/feature/club/repository/club.club.repository";
import { ClubRepresentativeDRepository } from "@sparcs-clubs/api/feature/club/repository/club.club-representative.repository";
import { ClubRoomTRepository } from "@sparcs-clubs/api/feature/club/repository/club.club-room-t.repository";
import { Injectable } from "@nestjs/common";
import { ApiClb002ResponseOK } from "@sparcs-clubs/interface/api/club/endpoint/apiClb002";
import { ClubStudentTRepository } from "../repository/club.club-student-t.repository";

@Injectable()
export class ClubService {
  constructor(
    private clubRepository: ClubRepository,
    private clubRepresentativeDRepository: ClubRepresentativeDRepository,
    private clubRoomTRepository: ClubRoomTRepository,
    private clubStudentTRepository: ClubStudentTRepository,
  ) {}

  async getClubDetails(clubId: number): Promise<ApiClb002ResponseOK> {
    const { clubInfo, divisionName } =
      await this.clubRepository.findClubDetailsById(clubId);

    // 총 멤버 수 가져오기
    const totalMemberCnt =
      await this.clubStudentTRepository.findTotalMemberCntByClubId(clubId);
    console.log(totalMemberCnt);

    // representive 이름 가져오기
    const representative =
      await this.clubRepresentativeDRepository.findRepresentativeNameByClubId(
        clubId,
      );
    console.log(representative);

    // room 정보 가져오기
    const roomDetails =
      await this.clubRoomTRepository.findClubLocationById(clubId);
    console.log(roomDetails);

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
