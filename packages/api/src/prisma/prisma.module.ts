import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { ClubsRepository } from "./repositories/clubs.repository";

@Module({
  providers: [PrismaService, ClubsRepository],
  exports: [PrismaService],
})
export class PrismaModule {}
