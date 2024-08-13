import { Module } from "@nestjs/common";

import { ClubModule } from "@sparcs-clubs/api/feature//club/club.module";
import { ClubDelegateDRepository } from "@sparcs-clubs/api/feature/club/repository/club.club-delegate-d.repository";

import { DrizzleModule } from "src/drizzle/drizzle.module";

import ClubPublicService from "../club/service/club.public.service";

import { PromotionalPrintingController } from "./controller/promotional-printing.controller";
import { PromotionalPrintingOrderSizeRepository } from "./repository/promotional-printing-order-size.repository";
import { PromotionalPrintingOrderRepository } from "./repository/promotional-printing-order.repository";
import { PromotionalPrintingService } from "./service/promotional-printing.service";

@Module({
  imports: [ClubModule, DrizzleModule],
  controllers: [PromotionalPrintingController],
  providers: [
    ClubPublicService,
    ClubDelegateDRepository,
    PromotionalPrintingService,
    PromotionalPrintingOrderRepository,
    PromotionalPrintingOrderSizeRepository,
  ],
})
export class PromotionalPrintingModule {}
