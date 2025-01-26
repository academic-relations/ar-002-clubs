import { forwardRef, Module } from "@nestjs/common";

import { DrizzleModule } from "src/drizzle/drizzle.module";

import UserModule from "../user/user.module";

import { ClubController } from "./controller/club.controller";
import { ClubDelegateDRepository } from "./delegate/club.club-delegate-d.repository";
// eslint-disable-next-line import/no-cycle
import { DelegateModule } from "./delegate/delegate.module";
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

@Module({
  imports: [DrizzleModule, UserModule, forwardRef(() => DelegateModule)],
  controllers: [ClubController],
  providers: [
    ClubService,
    ClubRoomTRepository,
    ClubRepository,
    ClubStudentTRepository,
    ClubTRepository,
    ClubStudentTRepository,
    DivisionPermanentClubDRepository,
    SemesterDRepository,
    ClubPublicService,
    ClubGetStudentClubBrief,
    ClubPutStudentClubBrief,
    ClubDelegateDRepository,
  ],
  exports: [ClubPublicService],
})
export default class ClubModule {}
