import { Module } from "@nestjs/common";

import { DrizzleModule } from "src/drizzle/drizzle.module";

import FundingController from "./controller/funding.controller";
import FundingRepository from "./repository/funding.repository";
import FundingService from "./service/funding.service";

@Module({
  imports: [DrizzleModule],
  controllers: [FundingController],
  providers: [FundingRepository, FundingService],
  exports: [],
})
export default class FundingModule {}
