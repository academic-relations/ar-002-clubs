import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DrizzleModule } from "./drizzle/drizzle.module";
import { UserModule } from "./feature/user/user.module";
import { ClubModule } from "./feature/club/club.module";

@Module({
  imports: [DrizzleModule, UserModule, ClubModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
