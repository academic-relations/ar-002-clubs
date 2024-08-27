import { Body, Controller, Get, Query, UsePipes } from "@nestjs/common";
import apiUsr001 from "@sparcs-clubs/interface/api/user/endpoint/apiUsr001";
import apiUsr002, {
  ApiUsr002RequestBody,
  ApiUsr002ResponseOk,
} from "@sparcs-clubs/interface/api/user/endpoint/apiUsr002";

import { ZodPipe } from "@sparcs-clubs/api/common/pipe/zod-pipe";

import { Student } from "@sparcs-clubs/api/common/util/decorators/method-decorator";
import {
  GetStudent,
  GetUser,
} from "@sparcs-clubs/api/common/util/decorators/param-decorator";

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

  @Get("/user/my/phone")
  @UsePipes(new ZodPipe(apiUsr002))
  async getPhoneNumber(
    @GetUser() user: GetUser,
    @Body() body: ApiUsr002RequestBody,
  ): Promise<ApiUsr002ResponseOk> {
    let phoneNumber;

    if (
      body.profile === "undergraduate" ||
      body.profile === "master" ||
      body.profile === "doctor"
    ) {
      phoneNumber = await this.userService.getStudentPhoneNumberByUserId(
        user.id,
      );
    } else if (body.profile === "executive") {
      phoneNumber = await this.userService.getExecutivePhoneNumberByUserId(
        user.id,
      );
    } else if (body.profile === "professor") {
      phoneNumber = await this.userService.getProfessorPhoneNumberByUserId(
        user.id,
      );
    }
    // TODO: employee

    if (!phoneNumber) {
      phoneNumber = await this.userService.getUserPhoneNumber(user.id);
      if (!phoneNumber) {
        return null;
      }
    }
    return phoneNumber;
  }
}
