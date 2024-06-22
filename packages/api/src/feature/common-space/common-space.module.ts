import { Module } from "@nestjs/common";
import { SemesterRepository } from "@sparcs-clubs/api/common/repository/semester.repository";
import { StudentRepository } from "@sparcs-clubs/api/common/repository/student.repository";
import { DrizzleModule } from "@sparcs-clubs/api/drizzle/drizzle.module";
import { CommonSpaceController } from "./controller/common-space.controller";
import { CommonSpaceUsageOrderDRepository } from "./repository/common-space-usage-order-d.repository";
import { CommonSpaceRepository } from "./repository/common-space.repository";
import { GetCommonSpacesUsageOrderRepository } from "./repository/getCommonSpacesUsageOrder.repository";
import { GetCommonSpacesUsageOrderMyRepository } from "./repository/getCommonSpacesUsageOrderMy.repository";
import { GetCommonSpaceUsageOrderRepository } from "./repository/getCommonSpaceUsageOrder.repository";
import { CommonSpaceService } from "./service/common-space.service";
import { ClubModule } from "../club/club.module";

@Module({
  imports: [DrizzleModule, ClubModule],
  controllers: [CommonSpaceController],
  providers: [
    CommonSpaceService,
    CommonSpaceRepository,
    GetCommonSpaceUsageOrderRepository,
    CommonSpaceUsageOrderDRepository,
    StudentRepository,
    GetCommonSpacesUsageOrderRepository,
    SemesterRepository,
    GetCommonSpacesUsageOrderMyRepository,
  ],
  exports: [CommonSpaceService],
})
export class CommonSpaceModule {}
