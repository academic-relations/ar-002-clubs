import { Module } from "@nestjs/common";
import { ClubController } from "./controller/club.controller";
import { ClubService } from "./service/club.service";

@Module({
  controllers: [ClubController],
  providers: [ClubService],
})
export class ClubModule {}
