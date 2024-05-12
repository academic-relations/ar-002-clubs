import { Module } from "@nestjs/common";
import { DrizzleModule } from "@sparcs-clubs/api/drizzle/drizzle.module";
import { CommonSpaceController } from "./controller/commonspace.controller";
import { CommonSpaceService } from "./service/commonspace.service";
import { CommonSpaceRepository } from "./repository/commonspace.endpoint.repository";

@Module({
  imports: [DrizzleModule],
  controllers: [CommonSpaceController],
  providers: [CommonSpaceService, CommonSpaceRepository],
})
export class CommonSpaceModule {}
