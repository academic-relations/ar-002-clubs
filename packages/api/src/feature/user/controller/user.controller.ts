import { Controller, Get, Query, UsePipes } from "@nestjs/common";
import apiUsr001 from "@sparcs-clubs/interface/api/user/endpoint/apiUsr001";

import { ZodPipe } from "@sparcs-clubs/api/common/pipe/zod-pipe";

import { Student } from "@sparcs-clubs/api/common/util/decorators/method-decorator";
import { GetStudent } from "@sparcs-clubs/api/common/util/decorators/param-decorator";

import { UserService } from "../service/user.service";

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Student()
  @Get("/student/user/my")
  @UsePipes(new ZodPipe(apiUsr001))
  async getStudentUserMy(@GetStudent() user: GetStudent) {
    const student = await this.userService.getStudentUserMy(user.studentId);
    return student;
    // return apiUsr001.responseBodyMap[200].parse(student);
  }

  @Get("student")
  async getStudentById(@Query("studentId") query: number) {
    const student = await this.userService.findStudentById(query);
    return student;
  }
}
