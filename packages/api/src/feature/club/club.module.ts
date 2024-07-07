import { Module } from "@nestjs/common";

import { ClubTRepository } from "@sparcs-clubs/api/common/repository/club.club-t.respository";
import { ClubRepository } from "@sparcs-clubs/api/common/repository/club.repository";
import { DrizzleModule } from "src/drizzle/drizzle.module";

import { ClubController } from "./controller/club.controller";
import { ClubRepresentativeDRepository } from "./repository/club.club-representative-d.repository";
import { ClubRoomTRepository } from "./repository/club.club-room-t.repository";
import ClubStudentTRepository from "./repository/club.club-student-t.repository";
import { DivisionPermanentClubDRepository } from "./repository/club.division-permanent-club-d.repository";
import { ClubGetStudentClubBrief } from "./repository/club.get-student-club-brief";
import { ClubPutStudentClubBrief } from "./repository/club.put-student-club-brief";
import SemesterDRepository from "./repository/club.semester-d.repository";

import ClubPublicService from "./service/club.public.service";
import { ClubService } from "./service/club.service";

@Module({
  imports: [DrizzleModule],
  controllers: [ClubController],
  providers: [
    ClubService,
    ClubRoomTRepository,
    ClubRepresentativeDRepository,
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
