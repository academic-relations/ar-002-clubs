import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { StudentRepository } from "../repository/student.repository";

@Injectable()
export default class UserPublicService {
  constructor(private studentRepository: StudentRepository) {}

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

  async getStudentByTId(studentT: { id: number }) {
    const studentIds = await this.studentRepository.selectStudentIdByStudentTId(
      studentT.id,
    );

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
