import { Module } from "@nestjs/common";
import { DrizzleModule } from "src/drizzle/drizzle.module";

import { ClubRegistrationModule } from "./club-registration/club-registration.module";
import { RegistrationController } from "./controller/registration.controller";
import { MemberRegistrationModule } from "./member-registration/member-registration.module";
import { RegistrationRepository } from "./repository/registration.repository";
import { RegistrationService } from "./service/registration.service";

@Module({
  imports: [DrizzleModule, MemberRegistrationModule, ClubRegistrationModule],
  controllers: [RegistrationController],
  providers: [RegistrationRepository, RegistrationService],
})
export class RegistrationModule {}
