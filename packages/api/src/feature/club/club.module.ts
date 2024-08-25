import { Module } from "@nestjs/common";

import { DrizzleModule } from "src/drizzle/drizzle.module";

import UserModule from "../user/user.module";

import ClubDelegateController from "./controller/club-delegate.controller";
import { ClubController } from "./controller/club.controller";
import { ClubDelegateDRepository } from "./repository/club.club-delegate-d.repository";
import { ClubRoomTRepository } from "./repository/club.club-room-t.repository";
import ClubStudentTRepository from "./repository/club.club-student-t.repository";
import ClubTRepository from "./repository/club.club-t.repository";
import { DivisionPermanentClubDRepository } from "./repository/club.division-permanent-club-d.repository";
import { ClubGetStudentClubBrief } from "./repository/club.get-student-club-brief";
import { ClubPutStudentClubBrief } from "./repository/club.put-student-club-brief";
import ClubRepository from "./repository/club.repository";
import SemesterDRepository from "./repository/club.semester-d.repository";
import { ClubDelegateService } from "./service/club-delegate.service";
import ClubPublicService from "./service/club.public.service";
import { ClubService } from "./service/club.service";

@Module({
  imports: [DrizzleModule, UserModule],
  controllers: [ClubController, ClubDelegateController],
  providers: [
    ClubService,
    ClubDelegateService,
    ClubRoomTRepository,
    ClubDelegateDRepository,
    ClubRepository,
    ClubStudentTRepository,
    ClubTRepository,
    ClubStudentTRepository,
    DivisionPermanentClubDRepository,
    SemesterDRepository,
    ClubPublicService,
    ClubGetStudentClubBrief,
    ClubPutStudentClubBrief,
  ],
  exports: [ClubPublicService],
})
export class ClubModule {}
