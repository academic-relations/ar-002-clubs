import { Module } from "@nestjs/common";

import { DrizzleModule } from "@sparcs-clubs/api/drizzle/drizzle.module";

import DivisionController from "./division.controller";
import DivisionRepository from "./division.repository";
import DivisionService from "./division.service";

@Module({
  imports: [DrizzleModule],
  controllers: [DivisionController],
  providers: [DivisionRepository, DivisionService],
  exports: [],
})
export default class DivisionModule {}
