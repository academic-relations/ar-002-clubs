import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { DrizzleModule } from "@sparcs-clubs/api/drizzle/drizzle.module";
import { UserRepository } from "src/common/repository/user.repository";
import { UserService } from "../user/service/user.service";
import { AuthController } from "./controller/auth.controller";
import { AuthService } from "./service/auth.service";
import { JwtCookieStrategy } from "./strategy/jwt-cookie.strategy";
import { AuthRepository } from "./repository/auth.repository";

@Module({
  imports: [
    DrizzleModule,
    PassportModule.register({ defaultStrategy: "jwt-cookie" }),
    JwtModule.register({}),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtCookieStrategy,
    UserService,
    UserRepository,
    AuthRepository,
  ],
  exports: [AuthService],
})
export class AuthModule {}
