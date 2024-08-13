import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import ExecutiveRepository from "../repository/executive.repository";
import { StudentRepository } from "../repository/student.repository";

@Injectable()
export default class UserPublicService {
  constructor(
    private studentRepository: StudentRepository,
    private executiveRepository: ExecutiveRepository,
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
}
