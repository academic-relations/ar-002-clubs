import { Module } from "@nestjs/common";

import { ClubRepository } from "@sparcs-clubs/api/common/repository/club.repository";
import { ClubDelegateDRepository } from "@sparcs-clubs/api/feature/club/repository/club.club-delegate-d.repository";
import { DrizzleModule } from "src/drizzle/drizzle.module";

import { PromotionalPrintingController } from "./controller/promotional-printing.controller";
import { PromotionalPrintingOrderSizeRepository } from "./repository/promotional-printing-order-size.repository";
import { PromotionalPrintingOrderRepository } from "./repository/promotional-printing-order.repository";
import { PromotionalPrintingService } from "./service/promotional-printing.service";

@Module({
  imports: [DrizzleModule],
  controllers: [PromotionalPrintingController],
  providers: [
    ClubRepository,
    ClubDelegateDRepository,
    PromotionalPrintingService,
    PromotionalPrintingOrderRepository,
    PromotionalPrintingOrderSizeRepository,
  ],
})
export class PromotionalPrintingModule {}
