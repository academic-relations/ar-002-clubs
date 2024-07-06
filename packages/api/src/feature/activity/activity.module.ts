import { Module } from "@nestjs/common";

import { DrizzleModule } from "src/drizzle/drizzle.module";

import { ClubModule } from "../club/club.module";

import ActivityController from "./controller/activity.controller";
import ActivityRepository from "./repository/activity.repositroy";
import ActivityService from "./service/activity.service";

@Module({
  imports: [ClubModule, DrizzleModule],
  controllers: [ActivityController],
  providers: [ActivityRepository, ActivityService],
  exports: [],
})
export default class ActivityModule {}
