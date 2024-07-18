import { Module } from "@nestjs/common";

import { StudentRepository as legacyStudentRepository } from "@sparcs-clubs/api/common/repository/student.repository";
import { UserRepository } from "@sparcs-clubs/api/common/repository/user.repository";
import ClubStudentTRepository from "@sparcs-clubs/api/feature/club/repository/club.club-student-t.repository";
import { DrizzleModule } from "src/drizzle/drizzle.module";

import { UserController } from "./controller/user.controller";
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
    legacyStudentRepository,
    ClubStudentTRepository,
  ],
  exports: [UserPublicService, UserService, UserRepository],
})
export default class UserModule {}
