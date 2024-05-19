import { Module } from "@nestjs/common";
import { DrizzleModule } from "src/drizzle/drizzle.module";

import { ActivityCertificateController } from "./controller/activity-certificate.controller";
import { ActivityCertificateService } from "./service/activity-certificate.service";
import { ActivityCertificateRepository } from "./repository/activity-certificate.repository";

@Module({
  imports: [DrizzleModule],
  controllers: [ActivityCertificateController],
  providers: [ActivityCertificateService, ActivityCertificateRepository],
})
export class ActivityCertificateModule {}
