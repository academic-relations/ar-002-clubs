import { Module } from "@nestjs/common";

import { DrizzleModule } from "@sparcs-clubs/api/drizzle/drizzle.module";

import { ClubModule } from "@sparcs-clubs/api/feature/club/club.module";

import { ClubRegistrationController } from "./controller/club-registration.controller";
import { ClubRegistrationRepository } from "./repository/club-registration.repository";
import { ClubRegistrationService } from "./service/club-registration.service";

@Module({
  imports: [DrizzleModule, ClubModule],
  controllers: [ClubRegistrationController],
  providers: [ClubRegistrationRepository, ClubRegistrationService],
})
export class ClubRegistrationModule {}
