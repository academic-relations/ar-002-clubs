import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaModule } from "./prisma/prisma.module";
import { ClubsModule } from "./features/club/clubs.module";

@Module({
  imports: [PrismaModule, ClubsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
