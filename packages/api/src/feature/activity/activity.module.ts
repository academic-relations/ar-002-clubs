import { Module } from "@nestjs/common";

import { DrizzleModule } from "src/drizzle/drizzle.module";

import { ClubModule } from "../club/club.module";
import { FileModule } from "../file/file.module";

import { ClubRegistrationModule } from "../registration/club-registration/club-registration.module";

import ActivityActivityTermController from "./controller/activity.activity-term.controller";
import ActivityController from "./controller/activity.controller";
import ActivityActivityTermRepository from "./repository/activity.activity-term.repository";
import ActivityRepository from "./repository/activity.repository";
import ActivityActivityTermService from "./service/activity.activity-term.service";
import ActivityPublicService from "./service/activity.public.service";
import ActivityService from "./service/activity.service";

@Module({
  imports: [ClubModule, DrizzleModule, FileModule, ClubRegistrationModule],
  controllers: [ActivityController, ActivityActivityTermController],
  providers: [
    ActivityRepository,
    ActivityActivityTermRepository,
    ActivityService,
    ActivityActivityTermService,
    ActivityPublicService,
  ],
  exports: [ActivityPublicService],
})
export default class ActivityModule {}
