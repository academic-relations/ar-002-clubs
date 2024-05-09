import { DrizzleModule } from "src/drizzle/drizzle.module";
import { Module } from "@nestjs/common";
import { ClubRepository } from "@sparcs-clubs/api/common/repository/club.repository";
import { ClubStudentTRepository } from "@sparcs-clubs/api/common/repository/club.club-student-t.repository";
import { ClubController } from "./controller/club.controller";
import { ClubService } from "./service/club.service";
import { ClubRoomTRepository } from "./repository/club.club-room-t.repository";
import { ClubRepresentativeDRepository } from "./repository/club.club-representative-d.repository";

@Module({
  imports: [DrizzleModule],
  controllers: [ClubController],
  providers: [
    ClubService,
    ClubRoomTRepository,
    ClubRepresentativeDRepository,
    ClubRepository,
    ClubStudentTRepository,
  ],
  exports: [ClubService],
})
export class ClubModule {}
