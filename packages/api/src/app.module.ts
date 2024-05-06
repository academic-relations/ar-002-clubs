import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DrizzleModule } from "./drizzle/drizzle.module";
import { UserModule } from "./feature/user/user.module";
import { AuthModule } from "./feature/auth/auth.module";
import { JwtCookieGuard } from "./feature/auth/guard/jwt-cookie.guard";
import { MockAuthGuard } from "./feature/auth/guard/mock-auth.guard";

@Module({
  imports: [DrizzleModule, UserModule, AuthModule],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass:
        process.env.NODE_ENV === "production" ? JwtCookieGuard : MockAuthGuard,
    },
    JwtCookieGuard,
    MockAuthGuard,
    AppService,
    JwtService,
  ],
})
export class AppModule {}
