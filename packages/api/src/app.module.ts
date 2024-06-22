import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DrizzleModule } from "./drizzle/drizzle.module";
import { ActivityCertificateModule } from "./feature/activity-certificate/activity-certificate.module";
import { ClubModule } from "./feature/club/club.module";
import { CommonSpaceModule } from "./feature/common-space/common-space.module";
import { NoticeModule } from "./feature/notice/notice.module";
import { PromotionalPrintingModule } from "./feature/promotional-printing/promotional-printing.module";
import { RentalModule } from "./feature/rental/rental.module";
import { UserModule } from "./feature/user/user.module";

@Module({
  imports: [
    ClubModule,
    CommonSpaceModule,
    DrizzleModule,
    NoticeModule,
    PromotionalPrintingModule,
    RentalModule,
    UserModule,
    ActivityCertificateModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
