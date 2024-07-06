import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { UserRepository } from "@sparcs-clubs/api/common/repository/user.repository";
import ClubStudentTRepository from "@sparcs-clubs/api/feature/club/repository/club.club-student-t.repository";

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly clubStudentTRepository: ClubStudentTRepository,
  ) {}

  async getStudentUserMy(studentId: number) {
    const user = await this.userRepository.findStudentById(studentId);
    if (!user) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }
    const { name, email, department, studentNumber, phoneNumber } = user[0];
    const clubs =
      await this.clubStudentTRepository.getClubsByStudentId(studentId);
    const userData = {
      name,
      email,
      department: department || "학과 정보 없음",
      studentNumber,
      phoneNumber: phoneNumber || "",
      clubs,
    };

    return userData;
  }

  async findStudentById(query: number) {
    const student = await this.userRepository.create(query);
    if (!student) {
      throw new HttpException("Student Doesn't exist", HttpStatus.NOT_FOUND);
    }
    return student;
  }
}
