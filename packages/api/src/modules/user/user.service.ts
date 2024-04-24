import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UserRepository } from "@sparcs-clubs/api/drizzle/repositories/user.repository";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findStudentById(query: number) {
    const student = await this.userRepository.create(query);
    if (!student) {
      throw new HttpException("Student Doesn't exist", HttpStatus.NOT_FOUND);
    }
    return student;
  }
}
