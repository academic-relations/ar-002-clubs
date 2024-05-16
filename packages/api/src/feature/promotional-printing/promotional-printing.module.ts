import { Module } from "@nestjs/common";
import { DrizzleModule } from "src/drizzle/drizzle.module";

import { PromotionalPrintingRepository } from "./repository/promotional-printing.repository";
import { PromotionalPrintingController } from "./controller/promotional-printing.controller";
import { PromotionalPrintingService } from "./service/promotional-printing.service";

@Module({
  imports: [DrizzleModule],
  controllers: [PromotionalPrintingController],
  providers: [PromotionalPrintingService, PromotionalPrintingRepository],
})
export class NoticeModule {}
