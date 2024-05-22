import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { ClubModule } from "./feature/club/club.module";
import { CommonSpaceModule } from "./feature/commonspace/common-space.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DrizzleModule } from "./drizzle/drizzle.module";
import { UserModule } from "./feature/user/user.module";
import { AuthModule } from "./feature/auth/auth.module";
import { JwtCookieGuard } from "./feature/auth/guard/jwt-cookie.guard";
import { MockAuthGuard } from "./feature/auth/guard/mock-auth.guard";
import { NoticeModule } from "./feature/notice/notice.module";
import { RentalModule } from "./feature/rental/rental.module";
import { PromotionalPrintingModule } from "./feature/promotional-printing/promotional-printing.module";
import { ActivityCertificateModule } from "./feature/activity-certificate/activity-certificate.module";

@Module({
  imports: [
    ClubModule,
    CommonSpaceModule,
    DrizzleModule,
    NoticeModule,
    PromotionalPrintingModule,
    RentalModule,
    UserModule,
    AuthModule,
    ActivityCertificateModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass:
        process.env.NODE_ENV === "production" ? JwtCookieGuard : MockAuthGuard,
    },
    JwtCookieGuard,
    MockAuthGuard,
    AppService,
    JwtService,
  ],
})
export class AppModule {}
