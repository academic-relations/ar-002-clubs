import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { getJwtConfig } from "@sparcs-clubs/api/env";
import { JwtPayload } from "../dto/auth.dto";
import { AuthService } from "../service/auth.service";

/*

@Todo
- reimplement JwtCookieStrategy because of the refreshToken
 */

@Injectable()
export class JwtCookieStrategy extends PassportStrategy(
  Strategy,
  "jwt-cookie",
) {
  constructor(private readonly authService: AuthService) {
    super({
      secretOrKey: getJwtConfig().secret,
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromExtractors([
        request => request?.cookies?.accessToken,
      ]),
    });
  }

  async validate(payload: JwtPayload) {
    console.log("JWT Payload:", payload);
    const user = await this.authService.findBySid(payload.sid);
    if (!user) {
      console.log("User not found with SID:", payload.sid);
      throw new UnauthorizedException();
    }
    console.log("Authenticated User:", user);
    return user; // This should be the complete user object
  }
}
