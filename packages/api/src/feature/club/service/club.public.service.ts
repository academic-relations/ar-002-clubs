import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { ClubTypeEnum } from "@sparcs-clubs/interface/common/enum/club.enum";

import { getKSTDate } from "@sparcs-clubs/api/common/util/util";

import { ClubDelegateDRepository } from "../repository/club.club-delegate-d.repository";
import ClubStudentTRepository from "../repository/club.club-student-t.repository";
import ClubRepository from "../repository/club.repository";
import SemesterDRepository from "../repository/club.semester-d.repository";

@Injectable()
export default class ClubPublicService {
  constructor(
    private clubDelegateDRepository: ClubDelegateDRepository,
    private clubRepository: ClubRepository,
    private clubStudentTRepository: ClubStudentTRepository,
    private semesterDRepository: SemesterDRepository,
  ) {}

  // semester common repositoryf를 제거하는 과정에서 발생한 프록시입니다. 사용하지 않는 것을 권장합니다.
  async findSemesterBetweenstartTermAndendTerm() {
    return this.semesterDRepository.findSemesterBetweenstartTermAndendTerm();
  }

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

  async getMemberFromSemester(param: { semesterId: number; clubId: number }) {
    const result = await this.clubStudentTRepository.findByClubIdAndSemesterId(
      param.clubId,
      param.semesterId,
    );

    return result;
  }

  /**
   * @param studentId 학생 id
   * @returns 해당 학생이 할동한 동아리와 기간을 리턴합니다.
   */
  async getClubBelongDurationOfStudent(param: { studentId: number }) {
    return this.clubRepository.findClubActivities(param.studentId);
  }

  /**
   * @param clubId 동아리 Id
   * @returns 동아리 id가 일치하는 동아리 목록을 리턴합니다.
   * 시스템에 문제가 없다면 리스트이 길이는 0 또는 1 이여야 합니다.
   */
  async getClubByClubId(param: { clubId: number }) {
    return this.clubRepository.findByClubId(param.clubId);
  }

  /**
   * @param clubId 동아리 id
   * @returns 동아리가 등록되었던 학기 정보들을 리턴합니다.
   */
  async getClubsExistedSemesters(param: { clubId: number }) {
    const semesters = await this.semesterDRepository.selectByClubId(param);
    return semesters;
  }

  // 학생(studentId)이 현재 학기 동아리(clubId)의 대표자 중 1명인지 확인합니다.
  // studentId와 clubId가 유효한지 검사하지 않습니다.
  async isStudentDelegate(studentId: number, clubId: number) {
    const representatives =
      await this.clubDelegateDRepository.findRepresentativeIdListByClubId(
        clubId,
      );

    if (
      representatives.find(row => row.studentId === studentId) === undefined
    ) {
      return false;
    }
    return true;
  }

  /**
   * @param clubStatusEnumId 동아리 상태 enum id의 배열
   * @param studentId 사용중인 학생 id
   * @param semesterId 신청 학기 id
   * @returns 특정 학기의 특정 상태(정동아리/가동아리/정동아리 or 가동아리)의 동아리(clubId) list
   * 예를 들어, getClubIdByClubStatusEnumId([ClubTypeEnum.Regular], semesterId) 의 경우,
   * semsterId 학기 당시 정동아리였던 동아리의 clubId list를 반환합니다.
   */
  async getClubIdByClubStatusEnumId(
    studentId: number,
    clubStatusEnumIds: Array<ClubTypeEnum>,
    semesterId: number,
  ) {
    const clubList = await this.clubRepository.findClubIdByClubStatusEnumId(
      studentId,
      clubStatusEnumIds,
      semesterId,
    );
    return clubList;
  }

  /**
   * @param studentId
   * @param semesterId
   * @returns 신규 등록 신청이 가능한 동아리 list
   * 신청 학기를 기준으로 아래에 포함되는 clubId list를 반환합니다.
   * 1. 최근 2학기 동안 가동아리 상태를 유지한 동아리
   * 2. 최근 3학기 이내 한 번이라도 정동아리였던 동아리
   */
  async getEligibleClubsForRegistration(studentId: number, semesterId: number) {
    const clubList = await this.clubRepository.findEligibleClubsForRegistration(
      studentId,
      semesterId,
    );
    return clubList;
  }

  async isStudentPresident(
    studentId: number,
    clubId: number,
  ): Promise<boolean> {
    const isPresident =
      await this.clubDelegateDRepository.isPresidentByStudentIdAndClubId(
        studentId,
        clubId,
      );
    return isPresident;
  }

  /**
   * @param studentId 학생의 ID
   * @param clubId 동아리의 ID
   * @returns void
   *
   * 학생을 특정 동아리에 추가합니다.
   * 이 메소드는 현재 학기(`semesterId`)에 해당하는 동아리에 학생을 추가합니다.
   * 현재 학기를 기준으로 `semesterId`를 조회하고, 조회된 학기가 없는 경우 예외를 발생시킵니다.
   * 조회된 `semesterId`를 사용하여 해당 동아리(`clubId`)에 학생(`studentId`)을 추가합니다.
   */

  async addStudentToClub(studentId: number, clubId: number): Promise<void> {
    const cur = getKSTDate(); // 현재 KST 시간을 가져옴

    const semesterId = await this.dateToSemesterId(cur);
    if (!semesterId) {
      throw new HttpException(
        "No current semester found.",
        HttpStatus.NOT_FOUND,
      );
    }

    // 신입 부원 추가
    await this.clubStudentTRepository.addStudentToClub(
      studentId,
      clubId,
      semesterId,
    );
  }

  /**
   * 학생을 특정 동아리에서 제거합니다.
   *
   * @param studentId 학생의 ID
   * @param clubId 동아리의 ID
   * @returns void
   *
   * 이 메소드는 현재 학기(`semesterId`)에 해당하는 동아리에서 학생을 제거합니다.
   * 현재 학기를 기준으로 `semesterId`를 조회하고, 조회된 학기가 없는 경우 예외를 발생시킵니다.
   * 조회된 `semesterId`를 사용하여 해당 동아리(`clubId`)에서 학생(`studentId`)을 제거합니다.
   */
  async removeStudentFromClub(
    studentId: number,
    clubId: number,
  ): Promise<void> {
    const cur = getKSTDate(); // 현재 KST 시간을 가져옴

    const semesterId = await this.dateToSemesterId(cur);
    if (!semesterId) {
      throw new HttpException(
        "No current semester found.",
        HttpStatus.NOT_FOUND,
      );
    }

    // 신입 부원 제거
    await this.clubStudentTRepository.removeStudentFromClub(
      studentId,
      clubId,
      semesterId,
    );
  }
}
