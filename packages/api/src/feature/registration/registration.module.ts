import { Module } from "@nestjs/common";

import { DrizzleModule } from "src/drizzle/drizzle.module";

import { RegistrationController } from "./controller/registration.controller";
import { RegistrationService } from "./service/registration.service";

@Module({
  imports: [DrizzleModule],
  controllers: [RegistrationController],
  providers: [RegistrationService],
})
export class RegistrationModule {}
