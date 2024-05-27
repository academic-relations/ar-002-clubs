import { Module } from "@nestjs/common";
import { DrizzleModule } from "src/drizzle/drizzle.module";
import { UserRepository } from "@sparcs-clubs/api/common/repository/user.repository";
import { StudentRepository } from "@sparcs-clubs/api/common/repository/student.repository";
import { ClubStudentTRepository } from "@sparcs-clubs/api/common/repository/club.club-student-t.repository";
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
  ],
  exports: [UserService, UserRepository],
})
export class UserModule {}
