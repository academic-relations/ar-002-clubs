import { S3Client } from "@aws-sdk/client-s3";
import { Module } from "@nestjs/common";

import { DrizzleModule } from "src/drizzle/drizzle.module";

import { ClubModule } from "../club/club.module";

import { FileRepository } from "../file/repository/file.repository";
import FilePublicService from "../file/service/file.public.service";

import ActivityActivityTermController from "./controller/activity.activity-term.controller";
import ActivityController from "./controller/activity.controller";
import ActivityActivityTermRepository from "./repository/activity.activity-term.repository";
import ActivityRepository from "./repository/activity.repository";
import ActivityActivityTermService from "./service/activity.activity-term.service";
import ActivityPublicService from "./service/activity.public.service";
import ActivityService from "./service/activity.service";

@Module({
  imports: [ClubModule, DrizzleModule],
  controllers: [ActivityController, ActivityActivityTermController],
  providers: [
    ActivityRepository,
    ActivityActivityTermRepository,
    ActivityService,
    ActivityActivityTermService,
    ActivityPublicService,
    FilePublicService,
    FileRepository,
    S3Client,
  ],
  exports: [ActivityPublicService],
})
export default class ActivityModule {}
