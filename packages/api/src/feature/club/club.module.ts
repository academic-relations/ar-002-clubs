import { Module } from "@nestjs/common";

import { DrizzleModule } from "src/drizzle/drizzle.module";

import UserModule from "../user/user.module";

import { ClubController } from "./controller/club.controller";
import ClubDelegateController from "./delegate/delegate.controller";
import ClubDelegateService from "./delegate/delegate.service";
import { ClubDelegateDRepository } from "./repository/club.club-delegate-d.repository";
import { ClubRoomTRepository } from "./repository/club.club-room-t.repository";
import ClubStudentTRepository from "./repository/club.club-student-t.repository";
import ClubTRepository from "./repository/club.club-t.repository";
import { DivisionPermanentClubDRepository } from "./repository/club.division-permanent-club-d.repository";
import { ClubGetStudentClubBrief } from "./repository/club.get-student-club-brief";
import { ClubPutStudentClubBrief } from "./repository/club.put-student-club-brief";
import ClubRepository from "./repository/club.repository";
import SemesterDRepository from "./repository/club.semester-d.repository";

import ClubPublicService from "./service/club.public.service";
import { ClubService } from "./service/club.service";

// TODO: delegate 관련 모듈화하기
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
