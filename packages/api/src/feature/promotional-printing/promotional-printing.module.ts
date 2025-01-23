import { Module } from "@nestjs/common";

import ClubModule from "@sparcs-clubs/api/feature/club/club.module";
import { DrizzleModule } from "src/drizzle/drizzle.module";

import { PromotionalPrintingController } from "./controller/promotional-printing.controller";
import { PromotionalPrintingOrderSizeRepository } from "./repository/promotional-printing-order-size.repository";
import { PromotionalPrintingOrderRepository } from "./repository/promotional-printing-order.repository";
import { PromotionalPrintingService } from "./service/promotional-printing.service";

@Module({
  imports: [ClubModule, DrizzleModule],
  controllers: [PromotionalPrintingController],
  providers: [
    PromotionalPrintingService,
    PromotionalPrintingOrderRepository,
    PromotionalPrintingOrderSizeRepository,
  ],
})
export class PromotionalPrintingModule {}
