import { Module } from "@nestjs/common";
import { ClubModule } from "./feature/club/club.module";
import { CommonSpaceModule } from "./feature/common-space/common-space.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DrizzleModule } from "./drizzle/drizzle.module";
import { UserModule } from "./feature/user/user.module";
import { NoticeModule } from "./feature/notice/notice.module";
import { RentalModule } from "./feature/rental/rental.module";
import { PromotionalPrintingModule } from "./feature/promotional-printing/promotional-printing.module";

@Module({
  imports: [
    ClubModule,
    CommonSpaceModule,
    DrizzleModule,
    NoticeModule,
    PromotionalPrintingModule,
    RentalModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
