import { Module } from "@nestjs/common";

import { DrizzleModule } from "src/drizzle/drizzle.module";

import { RegistrationController } from "./controller/registration.controller";
import { MemberRegistrationModule } from "./member-registration/member-registration.module";
import { RegistrationRepository } from "./repository/registration.repository";
import { RegistrationService } from "./service/registration.service";

@Module({
  imports: [DrizzleModule, MemberRegistrationModule],
  controllers: [RegistrationController],
  providers: [
    RegistrationRepository,
    RegistrationService,
    MemberRegistrationModule,
  ],
})
export class RegistrationModule {}
