import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DrizzleModule } from "./drizzle/drizzle.module";
import { UserModule } from "./feature/user/user.module";
import { NoticeModule } from "./feature/notice/notice.module";

@Module({
  imports: [DrizzleModule, NoticeModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
