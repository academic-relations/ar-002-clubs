import { Module } from "@nestjs/common";

import { JwtModule } from "@nestjs/jwt";

import { PassportModule } from "@nestjs/passport";

import { DrizzleModule } from "src/drizzle/drizzle.module";

import { AuthController } from "./controller/auth.controller";
import { AuthRepository } from "./repository/auth.repository";
import { AuthService } from "./service/auth.service";
import { JwtAccessStrategy } from "./strategy/jwt-access.strategy";
import { JwtRefreshStrategy } from "./strategy/jwt-refresh.strategy";

@Module({
  imports: [
    DrizzleModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES_IN,
      },
    }),
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthRepository,
    JwtRefreshStrategy,
    JwtAccessStrategy,
  ],
})
export class AuthModule {}
