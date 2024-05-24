import { Controller, Get, Query } from "@nestjs/common";
import { GetProfileStudent } from "@sparcs-clubs/api/common/decorator/get-user.decorator";
import { UserService } from "../service/user.service";

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("/users/user")
  async getUserById(@Query("studentId") query: number) {
    const student = await this.userService.findStudentById(query);
    return student;
  }

  // auth 사용 예시
  @Get("/users/student")
  async getStudent(@GetProfileStudent student) {
    return student;
  }
}
