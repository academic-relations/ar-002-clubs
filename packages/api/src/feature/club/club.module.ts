import { Module } from "@nestjs/common";
import { DrizzleModule } from "@sparcs-clubs/api/drizzle/drizzle.module";
import { ClubRepository } from "@sparcs-clubs/api/common/repository/club.repository";
import { ClubController } from "./controller/club.controller";
import { ClubService } from "./service/club.service";

@Module({
  imports: [DrizzleModule],
  controllers: [ClubController],
  providers: [ClubService, ClubRepository],
})
export class ClubModule {}
