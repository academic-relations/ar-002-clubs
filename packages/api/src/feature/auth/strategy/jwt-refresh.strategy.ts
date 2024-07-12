import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-jwt";

// PassportStrategy(인증 방식, 이름)
export class JwtRefreshStrategy extends PassportStrategy(Strategy, "refresh") {
  constructor() {
    super({
      jwtFromRequest: req => {
        const cookie = req.cookies.refreshToken;
        return cookie;
      },
      secretOrKey: process.env.REFRESH_TOKEN_SECRET_KEY,
    });
  }

  // 검증 성공 시 실행, 실패 시는 에러
  // ### Passport는 validate에 성공할시 리턴값을 request.user에 저장함!!! ###
  validate(payload) {
    return {
      id: payload.id,
      sid: payload.sid,
      name: payload.name,
      email: payload.email,
    };
  }
}
