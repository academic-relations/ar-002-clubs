import { Module } from "@nestjs/common";
import { ClubModule } from "./feature/club/club.module";
import { CommonSpaceModule } from "./feature/commonspace/commonspace.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DrizzleModule } from "./drizzle/drizzle.module";
import { UserModule } from "./feature/user/user.module";
import { NoticeModule } from "./feature/notice/notice.module";
import { RentalModule } from "./feature/rental/rental.module";

@Module({
  imports: [
    DrizzleModule,
    ClubModule,
    NoticeModule,
    UserModule,
    RentalModule,
    CommonSpaceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
