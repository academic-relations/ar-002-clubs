import { Module } from "@nestjs/common";
import { DrizzleModule } from "@sparcs-clubs/api/drizzle/drizzle.module";
import { CommonSpaceController } from "./controller/common-space.controller";
import { CommonSpaceService } from "./service/common-space.service";
import { CommonSpaceRepository } from "./repository/common-space.repository";
import { GetCommonSpaceUsageOrderRepository } from "./repository/getCommonSpaceUsageOrder.repository";

@Module({
  imports: [DrizzleModule],
  controllers: [CommonSpaceController],
  providers: [
    CommonSpaceService,
    CommonSpaceRepository,
    GetCommonSpaceUsageOrderRepository,
  ],
  exports: [CommonSpaceService],
})
export class CommonSpaceModule {}
