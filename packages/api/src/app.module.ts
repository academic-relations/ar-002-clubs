import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DrizzleModule } from "./drizzle/drizzle.module";
import ActivityModule from "./feature/activity/activity.module";
import { ActivityCertificateModule } from "./feature/activity-certificate/activity-certificate.module";
import { AuthModule } from "./feature/auth/auth.module";
import { ClubModule } from "./feature/club/club.module";
import { CommonSpaceModule } from "./feature/common-space/common-space.module";
import { FileModule } from "./feature/file/file.module";
import { NoticeModule } from "./feature/notice/notice.module";
import { PromotionalPrintingModule } from "./feature/promotional-printing/promotional-printing.module";
import { RentalModule } from "./feature/rental/rental.module";
import { SocketModule } from "./feature/socket/socket.module";
import UserModule from "./feature/user/user.module";

@Module({
  imports: [
    ActivityModule,
    ClubModule,
    CommonSpaceModule,
    DrizzleModule,
    FileModule,
    NoticeModule,
    PromotionalPrintingModule,
    RentalModule,
    UserModule,
    ActivityCertificateModule,
    AuthModule,
    SocketModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
