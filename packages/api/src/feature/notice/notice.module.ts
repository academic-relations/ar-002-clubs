import { Module } from "@nestjs/common";

import { DrizzleModule } from "src/drizzle/drizzle.module";

import { NoticeController } from "./controller/notice.controller";
import { NoticeRepository } from "./repository/notice.repository";
import { NoticeService } from "./service/notice.service";

@Module({
  imports: [DrizzleModule],
  controllers: [NoticeController],
  providers: [NoticeService, NoticeRepository],
})
export class NoticeModule {}
