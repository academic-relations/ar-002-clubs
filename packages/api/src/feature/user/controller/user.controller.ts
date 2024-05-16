import { Controller, Get, Query } from "@nestjs/common";
import { UserService } from "../service/user.service";

@Controller("/api/user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("student")
  async getStudentById(@Query("studentId") query: number) {
    const student = await this.userService.findStudentById(query);
    return student;
  }
}
