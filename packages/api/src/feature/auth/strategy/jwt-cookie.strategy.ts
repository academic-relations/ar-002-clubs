import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { getJwtConfig } from "@sparcs-clubs/api/env";
import { UserDto } from "@sparcs-clubs/api/common/dto/user.dto";
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

  async validate(payload: JwtPayload): Promise<UserDto> {
    const userInfo = await this.authService.findAllProfileInfoBySid(
      payload.sid,
    );
    return userInfo;
  }
}
