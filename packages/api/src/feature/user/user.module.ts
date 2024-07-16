import { Module } from "@nestjs/common";

import { ExecutiveRepository } from "@sparcs-clubs/api/common/repository/executive.repository";
import { StudentRepository } from "@sparcs-clubs/api/common/repository/student.repository";
import { UserRepository } from "@sparcs-clubs/api/common/repository/user.repository";
import ClubStudentTRepository from "@sparcs-clubs/api/feature/club/repository/club.club-student-t.repository";

import { DrizzleModule } from "src/drizzle/drizzle.module";

import { UserController } from "./controller/user.controller";
import { UserService } from "./service/user.service";

@Module({
  imports: [DrizzleModule],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    StudentRepository,
    ClubStudentTRepository,
    ExecutiveRepository,
  ],
  exports: [UserService, UserRepository, ExecutiveRepository],
})
export class UserModule {}
