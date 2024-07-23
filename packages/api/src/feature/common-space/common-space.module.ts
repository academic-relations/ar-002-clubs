import { Module } from "@nestjs/common";

import { SemesterRepository } from "@sparcs-clubs/api/common/repository/semester.repository";
import { StudentRepository } from "@sparcs-clubs/api/common/repository/student.repository";
import { DrizzleModule } from "@sparcs-clubs/api/drizzle/drizzle.module";
import ClubStudentTRepository from "@sparcs-clubs/api/feature/club/repository/club.club-student-t.repository";

import { CommonSpaceController } from "./controller/common-space.controller";
import { CommonSpaceUsageOrderDRepository } from "./repository/common-space-usage-order-d.repository";
import { CommonSpaceRepository } from "./repository/common-space.repository";
import { GetCommonSpacesUsageOrderRepository } from "./repository/getCommonSpacesUsageOrder.repository";
import { GetCommonSpacesUsageOrderMyRepository } from "./repository/getCommonSpacesUsageOrderMy.repository";
import { GetCommonSpaceUsageOrderRepository } from "./repository/getCommonSpaceUsageOrder.repository";
import { CommonSpaceService } from "./service/common-space.service";

@Module({
  imports: [DrizzleModule],
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
    ClubStudentTRepository, // TODO: should be removed
  ],
  exports: [CommonSpaceService],
})
export class CommonSpaceModule {}
