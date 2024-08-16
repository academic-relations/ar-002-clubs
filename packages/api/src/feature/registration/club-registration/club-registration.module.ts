import { Module } from "@nestjs/common";

import { DrizzleModule } from "@sparcs-clubs/api/drizzle/drizzle.module";

import { ClubModule } from "@sparcs-clubs/api/feature/club/club.module";

import { ClubRegistrationController } from "./controller/club-registration.controller";
import { ClubRegistrationRepository } from "./repository/club-registration.repository";
import { ClubRegistrationPublicService } from "./service/club-registration.public.service";
import { ClubRegistrationService } from "./service/club-registration.service";

@Module({
  imports: [DrizzleModule, ClubModule],
  controllers: [ClubRegistrationController],
  providers: [
    ClubRegistrationRepository,
    ClubRegistrationService,
    ClubRegistrationPublicService,
  ],
  exports: [ClubRegistrationPublicService],
})
export class ClubRegistrationModule {}
