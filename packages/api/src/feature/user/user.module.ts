import { Module } from "@nestjs/common";
import { DrizzleModule } from "src/drizzle/drizzle.module";
import { UserRepository } from "@sparcs-clubs/api/common/repository/user.repository"; // 추가된 부분
import { StudentRepository } from "@sparcs-clubs/api/common/repository/student.repository"; // 추가된 부분
import { UserController } from "./controller/user.controller";
import { UserService } from "./service/user.service";

@Module({
  imports: [DrizzleModule],
  controllers: [UserController],
  providers: [UserService, UserRepository, StudentRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
