import { Module } from "@nestjs/common";
import { ClubModule } from "./feature/club/club.module";
import { CommonSpaceModule } from "./feature/commonspace/commonspace.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DrizzleModule } from "./drizzle/drizzle.module";
import { UserModule } from "./feature/user/user.module";
import { NoticeModule } from "./feature/notice/notice.module";

@Module({
  imports: [
    DrizzleModule,
    ClubModule,
    NoticeModule,
    UserModule,
    CommonSpaceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
