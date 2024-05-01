import { Module } from "@nestjs/common";
import { NoticeController } from "./controller/notice.controller";
import { NoticeService } from "./service/notice.service";

@Module({
  controllers: [NoticeController],
  providers: [NoticeService],
})
export class NoticeModule {}
