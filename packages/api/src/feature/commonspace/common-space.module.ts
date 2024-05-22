import { Module } from "@nestjs/common";
import { DrizzleModule } from "@sparcs-clubs/api/drizzle/drizzle.module";
import { CommonSpaceController } from "./controller/common-space.controller";
import { CommonSpaceService } from "./service/common-space.service";
import { CommonSpaceRepository } from "./repository/common-space.repository";
import { GetCommonSpaceUsageOrderRepository } from "./repository/getCommonSpaceUsageOrder.repository";
import { CommonSpaceUsageOrderDRepository } from "./repository/common-space-usage-order-d.repository";
import { ClubModule } from "../club/club.module";
import { GetCommonSpacesUsageOrderRepository } from "./repository/getCommonSpacesUsageOrder.repository";

@Module({
  imports: [DrizzleModule, ClubModule],
  controllers: [CommonSpaceController],
  providers: [
    CommonSpaceService,
    CommonSpaceRepository,
    GetCommonSpaceUsageOrderRepository,
    CommonSpaceUsageOrderDRepository,
    GetCommonSpacesUsageOrderRepository,
  ],
  exports: [CommonSpaceService],
})
export class CommonSpaceModule {}
