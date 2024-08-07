import { Module } from "@nestjs/common";

import { DrizzleModule } from "src/drizzle/drizzle.module";

import { MeetingGateway } from "./meeting.gateway";
import { MeetingRepository } from "./meeting.repository";
import { MeetingService } from "./meeting.service";

@Module({
  imports: [DrizzleModule],
  providers: [MeetingGateway, MeetingService, MeetingRepository],
})
export class MeetingModule {}
