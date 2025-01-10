import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { IExecutiveSummary } from "@sparcs-clubs/interface/api/user/type/user.type";

import logger from "@sparcs-clubs/api/common/util/logger";
import { getKSTDate } from "@sparcs-clubs/api/common/util/util";

import { MStudent } from "../model/student.model";
import ExecutiveRepository from "../repository/executive.repository";
import ProfessorRepository from "../repository/professor.repository";
import { StudentRepository } from "../repository/student.repository";

@Injectable()
export default class UserPublicService {
  constructor(
    private studentRepository: StudentRepository,
    private executiveRepository: ExecutiveRepository,
    private professorRepository: ProfessorRepository,
  ) {}

  /**
   * 학생의 id를 통해 학생 정보를 가져옵니다.
   * 만약 매치되는 학생이 존재하지 않을 경우 undefined를 리턴합니다.
   * */
  async getStudentById(student: { id: number }) {
    const students = await this.studentRepository.selectStudentById(student.id);

    if (students.length > 1)
      throw new HttpException("unreachable", HttpStatus.INTERNAL_SERVER_ERROR);

    if (students.length === 0) {
      return undefined;
    }

    return students[0];
  }

  /**
   * 집행부원의 id를 통해 집행부원 정보를 가져옵니다.
   * 만약 매치되는 집행부원이 존재하지 않을 경우 undefined를 리턴합니다.
   * */
  async getExecutiveById(executive: { id: number }) {
    const executives = await this.executiveRepository.getExecutiveById(
      executive.id,
    );

    if (executives.length > 1)
      throw new HttpException("unreachable", HttpStatus.INTERNAL_SERVER_ERROR);

    if (executives.length === 0) {
      return undefined;
    }

    return executives[0];
  }

  /**
   * 현재 모든 집행부원을 가져옵니다.
   * 느려요~
   * */
  async getCurrentExecutives() {
    const today = getKSTDate();
    const executives = await this.executiveRepository.selectExecutiveByDate({
      date: today,
    });

    return executives;
  }

  async getExecutiveAndExecutiveTByExecutiveId(executive: {
    executiveId: number;
  }) {
    const executiveTs = await this.executiveRepository.getExecutiveById(
      executive.executiveId,
    );
    if (executiveTs.length > 1)
      throw new HttpException("unreachable", HttpStatus.INTERNAL_SERVER_ERROR);
    if (executiveTs.length === 0) {
      return undefined;
    }
    logger.debug(`executiveT.id: ${executiveTs[0].executiveId}`);
    const executives = await this.executiveRepository.selectExecutiveById({
      id: executiveTs[0].executiveId,
    });
    if (executives.length > 1)
      throw new HttpException("unreachable", HttpStatus.INTERNAL_SERVER_ERROR);
    if (executives.length === 0) {
      return undefined;
    }
    logger.debug(`executive.name: ${executives[0].name}`);

    return {
      executive: executives[0],
      executiveT: executiveTs[0],
    };
  }

  /**
   * @param professor 교수id를 받습니다
   * @returns 해당 id에 매칭되는 교수 정보를 반환합니다. 없을 경우 undefined를 반환합니다.
   */
  async getProfessorById(professor: { id: number }) {
    const professors = await this.professorRepository.selectProfessorById(
      professor.id,
    );

    if (professors.length > 1)
      throw new HttpException("unreachable", HttpStatus.INTERNAL_SERVER_ERROR);

    if (professors.length === 0) {
      return undefined;
    }

    return professors[0];
  }

  async isNotGraduateStudent(
    studentId: number,
    semesterId: number,
  ): Promise<boolean> {
    const isNotgraduateStudent =
      await this.studentRepository.isNotgraduateStudent(studentId, semesterId);
    if (!isNotgraduateStudent) return false;
    return true;
  }

  /**
   * StudentTId를 통해 학생의 Id를 가져옵니다.
   * 만약 매치되는 id가 존재하지 않을 경우 undefined를 리턴합니다.
   * */
  async getStudentByTId(studentT: { id: number }) {
    const studentIds = await this.studentRepository.selectStudentIdByStudentTId(
      studentT.id,
    );

    if (studentIds.length === 0) {
      return undefined;
    }

    if (studentIds.length > 1)
      throw new HttpException("unreachable", HttpStatus.INTERNAL_SERVER_ERROR);

    const students = await Promise.all(
      studentIds.map(async student =>
        this.studentRepository.selectStudentById(student.studentId),
      ),
    );

    if (students.length > 1)
      throw new HttpException("unreachable", HttpStatus.INTERNAL_SERVER_ERROR);

    if (students.length === 0) {
      return undefined;
    }

    return students[0][0];
  }
  /**
   * 학생의 전화번호를 업데이트 합니다.
   * */

  async updateStudentPhoneNumber(userId: number, phoneNumber: string) {
    await this.studentRepository.updateStudentPhoneNumber(userId, phoneNumber);
  }

  /**
   * 학생의 studentID Array를 통해 학생 정보를 반환합니다.
   * */
  async getStudentsByIds(studentIds: number[]): Promise<MStudent[]> {
    const students =
      await this.studentRepository.selectStudentsByIds(studentIds);
    if (students.length === 0) {
      throw new HttpException("Student Doesn't exist", HttpStatus.NOT_FOUND);
    }
    return students;
  }

  /**
   * 현재 모든 집행부원의 ExecutiveSummary를 가져옵니다.
   * Entity 적용 버전
   * */
  async getCurrentExecutiveSummaries(): Promise<IExecutiveSummary[]> {
    const today = getKSTDate();
    const executives =
      await this.executiveRepository.selectExecutiveSummaryByDate({
        date: today,
      });

    return executives;
  }
}
