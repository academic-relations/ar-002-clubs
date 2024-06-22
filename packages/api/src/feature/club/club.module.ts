import { Module } from "@nestjs/common";

import { ClubStudentTRepository } from "@sparcs-clubs/api/common/repository/club.club-student-t.repository";
import { ClubTRepository } from "@sparcs-clubs/api/common/repository/club.club-t.respository";
import { ClubRepository } from "@sparcs-clubs/api/common/repository/club.repository";
import { DrizzleModule } from "src/drizzle/drizzle.module";

import { ClubController } from "./controller/club.controller";
import { ClubRepresentativeDRepository } from "./repository/club.club-representative-d.repository";
import { ClubRoomTRepository } from "./repository/club.club-room-t.repository";
import { DivisionPermanentClubDRepository } from "./repository/club.division-permanent-club-d.repository";
import { ClubService } from "./service/club.service";

@Module({
  imports: [DrizzleModule],
  controllers: [ClubController],
  providers: [
    ClubService,
    ClubRoomTRepository,
    ClubRepresentativeDRepository,
    ClubRepository,
    ClubTRepository,
    ClubStudentTRepository,
    DivisionPermanentClubDRepository,
  ],
  exports: [
    ClubService,
    ClubRoomTRepository,
    ClubRepresentativeDRepository,
    ClubRepository,
    ClubStudentTRepository,
  ],
})
export class ClubModule {}
