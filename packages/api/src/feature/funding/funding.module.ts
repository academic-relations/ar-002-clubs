import { S3Client } from "@aws-sdk/client-s3";
import { Module } from "@nestjs/common";

import { DrizzleModule } from "src/drizzle/drizzle.module";

import ActivityModule from "../activity/activity.module";
import ActivityRepository from "../activity/repository/activity.repository";
import ActivityPublicService from "../activity/service/activity.public.service";
import { ClubModule } from "../club/club.module";
import { ClubDelegateDRepository } from "../club/repository/club.club-delegate-d.repository";
import ClubStudentTRepository from "../club/repository/club.club-student-t.repository";
import ClubRepository from "../club/repository/club.repository";
import SemesterDRepository from "../club/repository/club.semester-d.repository";
import ClubPublicService from "../club/service/club.public.service";
import { FileModule } from "../file/file.module";
import { FileRepository } from "../file/repository/file.repository";
import FilePublicService from "../file/service/file.public.service";
import { StudentRepository } from "../user/repository/student.repository";
import UserPublicService from "../user/service/user.public.service";
import UserModule from "../user/user.module";

import FundingController from "./funding.controller";
import FundingRepository from "./funding.repository";
import FundingService from "./funding.service";

@Module({
  imports: [DrizzleModule, UserModule, ClubModule, ActivityModule, FileModule],
  controllers: [FundingController],
  providers: [
    FundingRepository,
    FundingService,
    UserPublicService,
    ClubPublicService,
    ActivityPublicService,
    FilePublicService,
    StudentRepository,
    ClubRepository,
    ClubStudentTRepository,
    SemesterDRepository,
    ClubDelegateDRepository,
    ActivityRepository,
    S3Client,
    FileRepository,
  ],
  exports: [],
})
export default class FundingModule {}
