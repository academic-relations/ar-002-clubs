import {
  CanActivate,
  ExecutionContext,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { IS_PUBLIC_KEY } from "src/common/decorator/skip-auth.decorator";
import { getJwtConfig } from "@sparcs-clubs/api/env";
import { Request } from "../dto/auth.dto";
import { AuthService } from "../service/auth.service";

@Injectable()
export class MockAuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly authService: AuthService,
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    // const response = context.switchToHttp().getResponse<Response>();
    const sid = request.cookies["auth-cookie"];
    if (sid) {
      const user = await this.authService.findBySid(sid);
      if (!user) {
        throw new NotFoundException("user is not found");
      }

      request.user = user;
      return this.determineAuth(context, true);
    }
    const accessTokenFromCookie = this.extractTokenFromCookie(
      request,
      "accessToken",
    );

    try {
      if (!accessTokenFromCookie) throw new Error("jwt expired");
      const payload = await this.jwtService.verify(accessTokenFromCookie, {
        secret: getJwtConfig().secret,
      });
      const user = await this.authService.findBySid(payload.sid);

      request.user = user;
      return this.determineAuth(context, true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      if (e.message === "jwt expired") {
        try {
          const refreshToken = this.extractTokenFromCookie(
            request,
            "refreshToken",
          );
          if (!refreshToken) throw new UnauthorizedException();
          const payload = await this.jwtService.verify(refreshToken, {
            secret: getJwtConfig().secret,
          });
          const user = await this.authService.findBySid(payload.sid);
          if (!user) {
            throw new NotFoundException("user is not found");
          }
          if (
            user.refreshToken &&
            (await bcrypt.compare(refreshToken, user.refreshToken))
          ) {
            const { accessToken, ...accessTokenOptions } =
              this.authService.getCookieWithAccessToken(payload.sid);

            if (!request.res) {
              throw new InternalServerErrorException(
                "res property is not found in request",
              );
            }
            request.res.cookie("accessToken", accessToken, accessTokenOptions);
            request.user = user;
            return this.determineAuth(context, true);
          }
          return this.determineAuth(context, false);
          // eslint-disable-next-line @typescript-eslint/no-shadow
        } catch (e) {
          const result = this.determineAuth(context, false);
          if (result) {
            return result;
          }
          throw new UnauthorizedException();
        }
      }
      const result = this.determineAuth(context, false);
      if (result) {
        return result;
      }
      throw new UnauthorizedException();
    }
  }

  private determineAuth(context: ExecutionContext, result: boolean): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }
    return result;
  }

  private extractTokenFromCookie(
    request: Request,
    type: "accessToken" | "refreshToken",
  ): string | undefined {
    const cookie = request.cookies[type];
    if (cookie) {
      return cookie;
    }
    return undefined;
  }
}
