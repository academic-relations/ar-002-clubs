import { Module } from "@nestjs/common";

import { DrizzleModule } from "@sparcs-clubs/api/drizzle/drizzle.module";
import { ClubModule } from "@sparcs-clubs/api/feature/club/club.module";
import ClubStudentTRepository from "@sparcs-clubs/api/feature/club/repository/club.club-student-t.repository";
import UserModule from "@sparcs-clubs/api/feature/user/user.module";

import { CommonSpaceController } from "./controller/common-space.controller";
import { CommonSpaceUsageOrderDRepository } from "./repository/common-space-usage-order-d.repository";
import { CommonSpaceRepository } from "./repository/common-space.repository";
import { GetCommonSpacesUsageOrderRepository } from "./repository/getCommonSpacesUsageOrder.repository";
import { GetCommonSpacesUsageOrderMyRepository } from "./repository/getCommonSpacesUsageOrderMy.repository";
import { GetCommonSpaceUsageOrderRepository } from "./repository/getCommonSpaceUsageOrder.repository";
import { CommonSpaceService } from "./service/common-space.service";

@Module({
  imports: [ClubModule, DrizzleModule, UserModule],
  controllers: [CommonSpaceController],
  providers: [
    CommonSpaceService,
    CommonSpaceRepository,
    GetCommonSpaceUsageOrderRepository,
    CommonSpaceUsageOrderDRepository,
    GetCommonSpacesUsageOrderRepository,
    GetCommonSpacesUsageOrderMyRepository,
    ClubStudentTRepository, // TODO: should be removed
  ],
  exports: [CommonSpaceService],
})
export class CommonSpaceModule {}
