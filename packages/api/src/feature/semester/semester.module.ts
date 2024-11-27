import { Module } from "@nestjs/common";

import { DrizzleModule } from "src/drizzle/drizzle.module";

import SemesterController from "./semester.controller";
import SemesterRepository from "./semester.repository";
import SemesterService from "./semester.service";

@Module({
  imports: [DrizzleModule],
  controllers: [SemesterController],
  providers: [SemesterRepository, SemesterService],
  exports: [],
})
export default class SemesterModule {}
