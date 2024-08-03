import { Module } from "@nestjs/common";

import { ClubModule } from "@sparcs-clubs/api/feature/club/club.module";
import { ClubDelegateDRepository } from "@sparcs-clubs/api/feature/club/repository/club.club-delegate-d.repository";
import UserModule from "@sparcs-clubs/api/feature/user/user.module";

import { DrizzleModule } from "src/drizzle/drizzle.module";

import { ActivityCertificateController } from "./controller/activity-certificate.controller";
import { ActivityCertificateRepository } from "./repository/activity-certificate.repository";
import { ActivityCertificateService } from "./service/activity-certificate.service";

@Module({
  imports: [DrizzleModule, UserModule, ClubModule],
  controllers: [ActivityCertificateController],
  providers: [
    ActivityCertificateService,
    ActivityCertificateRepository,
    ClubDelegateDRepository,
  ],
})
export class ActivityCertificateModule {}
