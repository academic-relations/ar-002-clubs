import { Module } from "@nestjs/common";
import { ClubModule } from "./feature/club/club.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DrizzleModule } from "./drizzle/drizzle.module";
import { UserModule } from "./feature/user/user.module";

@Module({
  imports: [DrizzleModule, ClubModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
