import { Module } from "@nestjs/common";
import { DrizzleModule } from "@sparcs-clubs/api/drizzle/drizzle.module";
import { ClubController } from "./controller/club.controller";
import { ClubService } from "./service/club.service";

@Module({
  imports: [DrizzleModule],
  controllers: [ClubController],
  providers: [ClubService],
})
export class ClubModule {}
