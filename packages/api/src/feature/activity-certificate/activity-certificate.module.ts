import { Module } from "@nestjs/common";

import { ClubRepository } from "@sparcs-clubs/api/common/repository/club.repository";
import { DrizzleModule } from "src/drizzle/drizzle.module";

import { ActivityCertificateController } from "./controller/activity-certificate.controller";
import { ActivityCertificateRepository } from "./repository/activity-certificate.repository";
import { ActivityCertificateService } from "./service/activity-certificate.service";

@Module({
  imports: [DrizzleModule],
  controllers: [ActivityCertificateController],
  providers: [
    ActivityCertificateService,
    ActivityCertificateRepository,
    ClubRepository,
  ],
})
export class ActivityCertificateModule {}
