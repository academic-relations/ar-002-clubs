import { Module } from "@nestjs/common";

import { DrizzleModule } from "src/drizzle/drizzle.module";

import ClubRepository from "../club/repository/club.repository";

import { RegistrationController } from "./controller/registration.controller";
import { RegistrationRepository } from "./repository/registration.repository";
import { RegistrationService } from "./service/registration.service";

@Module({
  imports: [DrizzleModule],
  controllers: [RegistrationController],
  providers: [RegistrationRepository, RegistrationService, ClubRepository],
})
export class RegistrationModule {}
