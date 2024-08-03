import { Module } from "@nestjs/common";

import ClubStudentTRepository from "@sparcs-clubs/api/feature/club/repository/club.club-student-t.repository";
import UserRepository from "@sparcs-clubs/api/feature/user/repository/user.repository";

import { DrizzleModule } from "src/drizzle/drizzle.module";

import { UserController } from "./controller/user.controller";
import ExecutiveRepository from "./repository/executive.repository";
import { StudentRepository } from "./repository/student.repository";
import UserPublicService from "./service/user.public.service";
import { UserService } from "./service/user.service";

@Module({
  imports: [DrizzleModule],
  controllers: [UserController],
  providers: [
    UserPublicService,
    UserService,
    UserRepository,
    StudentRepository,
    ClubStudentTRepository,
    ExecutiveRepository,
  ],
  exports: [
    UserPublicService,
    UserService,
    UserRepository,
    ExecutiveRepository,
  ],
})
export default class UserModule {}
