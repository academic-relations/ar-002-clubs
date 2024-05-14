import { Module } from "@nestjs/common";
import { DrizzleModule } from "src/drizzle/drizzle.module";

import { NoticeRepository } from "./repository/notice.repository";
import { NoticeController } from "./controller/notice.controller";
import { NoticeService } from "./service/notice.service";

@Module({
  imports: [DrizzleModule],
  controllers: [NoticeController],
  providers: [NoticeService, NoticeRepository],
})
export class NoticeModule {}
