import { Module } from "@nestjs/common";
import { DrizzleModule } from "src/drizzle/drizzle.module";

import UserModule from "../user/user.module";
import { AgendaModule } from "./agenda/agenda.module";
import { AnnouncementModule } from "./announcement/announcement.module";
import MeetingController from "./meeting.controller";
import { MeetingGateway } from "./meeting.gateway";
import { MeetingRepository } from "./meeting.repository";
import { MeetingService } from "./meeting.service";

@Module({
  imports: [DrizzleModule, UserModule, AnnouncementModule, AgendaModule],
  controllers: [MeetingController],
  providers: [MeetingGateway, MeetingService, MeetingRepository],
})
export class MeetingModule {}
