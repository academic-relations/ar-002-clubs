import { Module } from "@nestjs/common";
import { DrizzleModule } from "src/drizzle/drizzle.module";

import { NoticesRepository } from "./repository/notices.repository";
import { NoticesController } from "./controller/notices.controller";
import { NoticesService } from "./service/notices.service";

@Module({
  imports: [DrizzleModule],
  controllers: [NoticesController],
  providers: [NoticesService, NoticesRepository],
})
export class NoticeModule {}
