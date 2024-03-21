import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { ClubsController } from "./clubs.controller";
import { ClubsService } from "./clubs.service";

@Module({
  imports: [PrismaModule],
  controllers: [ClubsController],
  providers: [ClubsService],
})
export class ClubsModule {}
