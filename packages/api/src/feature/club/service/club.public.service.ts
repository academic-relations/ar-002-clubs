import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { getKSTDate } from "@sparcs-clubs/api/common/util/util";

import { ClubRepresentativeDRepository } from "../repository/club.club-representative-d.repository";
import ClubStudentTRepository from "../repository/club.club-student-t.repository";
import SemesterDRepository from "../repository/club.semester-d.repository";

@Injectable()
export default class ClubPublicService {
  constructor(
    private clubRepresentativeDRepository: ClubRepresentativeDRepository,
    private clubStudentTRepository: ClubStudentTRepository,
    private semesterDRepository: SemesterDRepository,
  ) {}

  // date를 포함하고 있는 학기의 semesterId를 리턴합니다.
  // 만약 해당하는 semester가 존재하지 않을 경우, undefined를 리턴합니다.
  async dateToSemesterId(date: Date): Promise<number | undefined> {
    const result = await this.semesterDRepository.findByDate(date);

    if (result.length !== 1) {
      return undefined;
    }
    return result[0].id;
  }

  // 학생(studentId)이 현재 학기 동아리(clubId)에 소속되어 있는지 확인합니다.
  // studentId와 clubId가 유효한지 검사하지 않습니다.
  async isStudentBelongsTo(studentId: number, clubId: number) {
    const semesterId = await this.dateToSemesterId(getKSTDate());
    if (semesterId === undefined)
      throw new HttpException(
        "Today is not in semester",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );

    const result = await this.clubStudentTRepository.findByClubIdAndSemesterId(
      clubId,
      semesterId,
    );

    if (result.find(row => row.studentId === studentId)) return true;
    return false;
  }

  // 학생(studentId)이 현재 학기 동아리(clubId)의 대표자 중 1명인지 확인합니다.
  // studentId와 clubId가 유효한지 검사하지 않습니다.
  async isStudentRepresentative(studentId: number, clubId: number) {
    const representatives =
      await this.clubRepresentativeDRepository.findRepresentativeIdListByClubId(
        clubId,
      );

    if (
      representatives.find(row => row.studentId === studentId) === undefined
    ) {
      return false;
    }
    return true;
  }
}
