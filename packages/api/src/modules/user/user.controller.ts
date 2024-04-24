import { Controller, Get, Query } from "@nestjs/common";
// import { session_userprofile } from '@prisma/client';
// import { GetUser } from '../../common/decorators/get-user.decorator';
import { UserService } from "./user.service";

@Controller("/api/user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("student")
  async getTimetableImage(@Query("studentId") query: number) {
    const student = await this.userService.findStudentById(query);

    return student;
  }
}
