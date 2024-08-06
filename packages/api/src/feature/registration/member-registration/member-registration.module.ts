import { Module } from "@nestjs/common";

import { DrizzleModule } from "@sparcs-clubs/api/drizzle/drizzle.module";
import { ClubModule } from "@sparcs-clubs/api/feature/club/club.module";
import UserModule from "@sparcs-clubs/api/feature/user/user.module";

import { MemberRegistrationController } from "./controller/member-registration.controller";
import { MemberRegistrationRepository } from "./repository/member-registration.repository";
import { MemberRegistrationService } from "./service/member-registration.service";

@Module({
  imports: [ClubModule, UserModule, DrizzleModule],
  controllers: [MemberRegistrationController],
  providers: [MemberRegistrationService, MemberRegistrationRepository],
  exports: [MemberRegistrationRepository, MemberRegistrationService],
})
export class MemberRegistrationModule {}
