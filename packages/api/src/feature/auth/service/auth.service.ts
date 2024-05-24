import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { getJwtConfig, getSsoConfig } from "@sparcs-clubs/api/env";
import { UserRepository } from "src/common/repository/user.repository";
import { UserDto } from "@sparcs-clubs/api/common/dto/user.dto";
import { Client } from "../util/sparcs-sso";
import { SSOUser } from "../dto/sso.dto";
import { Request } from "../dto/auth.dto";
import { AuthRepository } from "../repository/auth.repository";

@Injectable()
export class AuthService {
  private readonly ssoClient;

  constructor(
    private readonly userRepository: UserRepository,
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {
    const ssoConfig = getSsoConfig();
    const ssoClient = new Client(
      ssoConfig.ssoClientId,
      ssoConfig.ssoSecretKey,
      ssoConfig.ssoIsBeta,
    );
    this.ssoClient = ssoClient;
  }

  public async getAuthLogin(query, req: Request) {
    if (req.user) {
      return query.next ?? "/";
    }
    // eslint-disable-next-line no-param-reassign
    req.session.next = query.next ?? "/";
    const { url, state } = this.ssoClient.get_login_params();
    // eslint-disable-next-line no-param-reassign
    req.session.ssoState = state;
    if (query.socialLogin === "0") {
      return `${url}&social_enabled=0&show_disabled_button=0`;
    }
    return url;
  }

  public async getAuthLoginCallback(query, session: Request["session"]) {
    const stateBefore = session.ssoState;
    if (!stateBefore || stateBefore !== query.state) {
      return {
        nextUrl: "/error/invalid-login",
        refreshToken: null,
        refreshTokenOptions: null,
      };
    }
    const ssoProfile: SSOUser = await this.ssoClient.get_user_info(query.code);
    const {
      // accessToken,
      // accessTokenOptions,
      refreshToken,
      refreshTokenOptions,
    } = await this.ssoLogin(ssoProfile);
    const nextUrl = session.next ?? "/";
    return { nextUrl, refreshToken, refreshTokenOptions };
  }

  public async getAuthLogout(query, req: Request, user: UserDto) {
    if (user) {
      const { sid } = user;
      const { protocol } = req;
      const host = req.get("host");
      const { originalUrl } = req;
      const absoluteUrl = `${protocol}://${host}${originalUrl}`;
      const logoutUrl = this.ssoClient.get_logout_url(sid, absoluteUrl);
      return logoutUrl;
    }

    return query.next ?? "/";
  }

  public async findBySid(sid: string) {
    return this.userRepository.findBySid(sid);
  }

  public async findAllProfileInfoBySid(sid: string) {
    return this.userRepository.findAllProfileInfoBySid(sid);
  }

  public async ssoLogin(ssoProfile: SSOUser) {
    const { sid } = ssoProfile;
    let user = await this.findBySid(sid);

    // const kaistInfo = ssoProfile.kaist_info;
    // const studentId = kaistInfo.ku_std_no ?? "";
    const role = "";

    const { accessToken, ...accessTokenOptions } =
      this.getCookieWithAccessToken(sid, role);
    const { refreshToken, ...refreshTokenOptions } =
      this.getCookieWithRefreshToken(sid);

    const salt = await bcrypt.genSalt(Number(process.env.saltRounds));
    const encryptedRefreshToken = await bcrypt.hash(refreshToken, salt);

    if (!user) {
      user = await this.createUser(
        sid,
        ssoProfile.email,
        `${ssoProfile.last_name}${ssoProfile.first_name}`,
        encryptedRefreshToken,
      );
    } else {
      user = await this.updateUser(
        user.id,
        sid,
        ssoProfile.email,
        `${ssoProfile.last_name}${ssoProfile.first_name}`,
        encryptedRefreshToken,
      );
    }

    return {
      accessToken,
      accessTokenOptions,
      refreshToken,
      refreshTokenOptions,
    };
  }

  public async getRoles(userId: number): Promise<string[]> {
    const roles = this.authRepository.findRolesById(userId);
    return roles;
  }

  public async getCookieWithRoleAccessToken(
    userId: number,
    sid: string,
    role: string,
  ) {
    const roles = await this.authRepository.findRolesById(userId);
    if (!roles.includes(role)) {
      throw new UnauthorizedException(`No access rights for role: ${role}`);
    }

    const payload = {
      sid,
      role,
    };

    const jwtConfig = getJwtConfig();
    const token = this.jwtService.sign(payload, {
      secret: jwtConfig.secret,
      expiresIn: `${jwtConfig.signOptions.expiresIn}s`,
    });

    return {
      accessToken: token,
      path: "/",
      httpOnly: true,
      maxAge: Number(jwtConfig.signOptions.expiresIn) * 1000,
    };
  }

  public getCookieWithAccessToken(sid: string, role: string) {
    const payload = {
      sid,
      role,
    };

    const jwtConfig = getJwtConfig();
    const token = this.jwtService.sign(payload, {
      secret: jwtConfig.secret,
      expiresIn: `${jwtConfig.signOptions.expiresIn}s`,
    });
    return {
      accessToken: token,
      path: "/",
      httpOnly: true,
      maxAge: Number(jwtConfig.signOptions.expiresIn) * 1000,
    };
  }

  public getCookieWithRefreshToken(sid: string) {
    const payload = {
      sid,
    };

    const jwtConfig = getJwtConfig();
    const refreshToken = this.jwtService.sign(payload, {
      secret: jwtConfig.secret,
      expiresIn: `${jwtConfig.signOptions.refreshExpiresIn}s`,
    });
    return {
      refreshToken,
      path: "/",
      httpOnly: true,
      maxAge: Number(jwtConfig.signOptions.refreshExpiresIn) * 1000,
    };
  }

  async createUser(
    sid: string,
    email: string,
    name: string,
    refreshToken: string,
  ): Promise<UserDto> {
    const user = {
      sid,
      email,
      name,
      refreshToken,
    };
    return this.userRepository.createUser(user);
  }

  async updateUser(
    userId: number,
    sid: string,
    email: string,
    name: string,
    refreshToken: string,
  ): Promise<UserDto> {
    const user = {
      sid,
      email,
      name,
      refreshToken,
    };
    return this.userRepository.updateUser(userId, user);
  }
}
