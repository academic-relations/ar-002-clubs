import { DrizzleModule } from "src/drizzle/drizzle.module";
import { Module } from "@nestjs/common";
import { ClubController } from "./controller/club.controller";
import { ClubService } from "./service/club.service";
import { ClubRepository } from "./repository/club.club.repository";
import { UserModule } from "../user/user.module";
import { ClubRoomTRepository } from "./repository/club.club-room-t.repository";
import { ClubRepresentativeDRepository } from "./repository/club.club-representative.repository";
import { ClubStudentTRepository } from "./repository/club.club-student-t.repository";

@Module({
  imports: [DrizzleModule, UserModule],
  controllers: [ClubController],
  providers: [
    ClubService,
    ClubRepository,
    ClubRoomTRepository,
    ClubRepresentativeDRepository,
    ClubStudentTRepository,
  ],
  exports: [ClubService],
})
export class ClubModule {}
