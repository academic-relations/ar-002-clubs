import { Module } from "@nestjs/common";
import { CommonSpaceModule } from "./feature/commonspace/commonspace.module";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DrizzleModule } from "./drizzle/drizzle.module";
import { UserModule } from "./feature/user/user.module";

@Module({
  imports: [DrizzleModule, CommonSpaceModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
