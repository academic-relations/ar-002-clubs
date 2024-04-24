import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { DrizzleModule } from "src/drizzle/drizzle.module";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  imports: [PrismaModule, DrizzleModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
