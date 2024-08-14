import { Module } from "@nestjs/common";

import { DrizzleModule } from "src/drizzle/drizzle.module";

import ActivityModule from "../activity/activity.module";
import { ClubModule } from "../club/club.module";
import { FileModule } from "../file/file.module";
import UserModule from "../user/user.module";

import FundingController from "./funding.controller";
import FundingRepository from "./funding.repository";
import FundingService from "./funding.service";

@Module({
  imports: [DrizzleModule, UserModule, ClubModule, ActivityModule, FileModule],
  controllers: [FundingController],
  providers: [FundingRepository, FundingService],
  exports: [],
})
export default class FundingModule {}
