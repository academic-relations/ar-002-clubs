import { Module } from "@nestjs/common";

import { DrizzleModule } from "src/drizzle/drizzle.module";

import ActivityModule from "../activity/activity.module";
import { ClubModule } from "../club/club.module";
import { FileModule } from "../file/file.module";
import ExecutiveRepository from "../user/repository/executive.repository";
import ProfessorRepository from "../user/repository/professor.repository";
import { StudentRepository } from "../user/repository/student.repository";
import UserPublicService from "../user/service/user.public.service";
import UserModule from "../user/user.module";

import FundingController from "./controller/funding.controller";
import FundingCommentRepository from "./repository/funding.comment.repository";
import FundingRepository from "./repository/funding.repository";
import FundingService from "./service/funding.service";

@Module({
  imports: [DrizzleModule, UserModule, ClubModule, ActivityModule, FileModule],
  controllers: [FundingController],
  providers: [
    FundingRepository,
    FundingService,
    StudentRepository,
    ExecutiveRepository,
    ProfessorRepository,
    UserPublicService,
    FundingCommentRepository,
  ],
  exports: [],
})
export default class FundingModule {}
