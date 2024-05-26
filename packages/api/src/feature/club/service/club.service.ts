import { Injectable, NotFoundException } from "@nestjs/common";
import { ApiClb001ResponseOK } from "@sparcs-clubs/interface/api/club/endpoint/apiClb001";
import { ApiClb002ResponseOK } from "@sparcs-clubs/interface/api/club/endpoint/apiClb002";
import { ApiClb003ResponseOK } from "@sparcs-clubs/interface/api/club/endpoint/apiClb003";
import { ClubRepository } from "@sparcs-clubs/api/common/repository/club.repository";
import { ClubRepresentativeDRepository } from "@sparcs-clubs/api/feature/club/repository/club.club-representative-d.repository";
import { ClubRoomTRepository } from "@sparcs-clubs/api/feature/club/repository/club.club-room-t.repository";
import { ClubStudentTRepository } from "@sparcs-clubs/api/common/repository/club.club-student-t.repository";
import { ClubTRepository } from "@sparcs-clubs/api/common/repository/club.club-t.respository";
import { DivisionPermanentClubDRepository } from "../repository/club.division-permanent-club-d.repository";

@Injectable()
export class ClubService {
  constructor(
    private clubRepository: ClubRepository,
    private clubRepresentativeDRepository: ClubRepresentativeDRepository,
    private clubRoomTRepository: ClubRoomTRepository,
    private clubStudentTRepository: ClubStudentTRepository,
    private clubTRepository: ClubTRepository,
    private divisionPermanentClubDRepository: DivisionPermanentClubDRepository,
  ) {}

  async getClubs(): Promise<ApiClb001ResponseOK> {
    const result = await this.clubRepository.getClubs();
    return result;
  }

  async getClub(clubId: number): Promise<ApiClb002ResponseOK> {
    const [clubDetails, totalMemberCnt, representative, roomDetails] =
      await Promise.all([
        this.clubRepository.findClubDetail(clubId),
        this.clubStudentTRepository.findTotalMemberCnt(clubId),
        this.clubRepresentativeDRepository.findRepresentativeName(clubId),
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
      // TODO: professor에서 join 하도록 수정
      // advisor: clubDetails.advisor,
      advisor: "",
      divisionName: clubDetails.divisionName.name,
      description: clubDetails.description,
      isPermanent: false,
      foundingYear: clubDetails.foundingYear,
      totalMemberCnt: totalMemberCnt.totalMemberCnt,
      representative: representative.name,
      room: `${roomDetails.buildingName} ${roomDetails.room}`,
    };
  }

  async getStudentClubsMy(studentId: number): Promise<ApiClb003ResponseOK> {
    const studentSemesters =
      await this.clubStudentTRepository.findStudentSemester(studentId);

    const result = await Promise.all(
      studentSemesters.map(async semester => {
        const clubs = await Promise.all(
          semester.clubs.map(async (club: { id: number }) => {
            const clubName = await this.clubRepository.findClubName(club.id);
            const clubInfo = await this.clubTRepository.findClubDetail(
              semester.id,
              club.id,
            );
            const totalMemberCnt =
              await this.clubStudentTRepository.findSemesterTotalMemberCnt(
                club.id,
                semester.id,
              );
            const representative =
              await this.clubRepresentativeDRepository.findRepresentativeName(
                club.id,
                semester.startTerm,
                semester.endTerm,
              );
            const isPermanent =
              await this.divisionPermanentClubDRepository.findPermenantClub(
                club.id,
                semester.startTerm,
                semester.endTerm,
              );

            return {
              type: clubInfo.clubStatusEnumId,
              id: club.id,
              name: clubName,
              isPermanent,
              characteristic: clubInfo.characteristicKr,
              representative: representative.name,
              advisor: clubInfo.advisor,
              totalMemberCnt,
            };
          }),
        );

        return {
          id: semester.id,
          name: semester.name,
          clubs,
        };
      }),
    );

    return { semesters: result };
  }
}
