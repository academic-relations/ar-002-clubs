import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaModule } from "./prisma/prisma.module";
import { DrizzleModule } from "./drizzle/drizzle.module";
import { UserModule } from "./modules/user/user.module";

@Module({
  imports: [PrismaModule, DrizzleModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
