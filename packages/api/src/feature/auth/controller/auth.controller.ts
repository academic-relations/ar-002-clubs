import { Controller, Get, Query, Req, Res, Session } from "@nestjs/common";
import { UserDto } from "src/common/dto/user.dto";
import { GetUser } from "src/common/decorator/get-user.decorator";
import { Public } from "src/common/decorator/skip-auth.decorator";
import { UserService } from "src/feature/user/service/user.service";
import { getSsoConfig } from "@sparcs-clubs/api/env";
import { Request, Response } from "../dto/auth.dto";
import { SSOUser } from "../dto/sso.dto";
import { AuthService } from "../service/auth.service";
import { Client } from "../util/sparcs-sso";

@Controller("api/auth")
export class AuthController {
  private readonly ssoClient;

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {
    const ssoConfig = getSsoConfig();
    const ssoClient = new Client(
      ssoConfig.ssoClientId,
      ssoConfig.ssoSecretKey,
      ssoConfig.ssoIsBeta,
    );
    this.ssoClient = ssoClient;
  }

  @Public()
  @Get("login")
  user_login(
    @Query("next") next: string,
    @Query("social_login") social_login: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    if (req.user) {
      return res.redirect(next ?? "/");
    }
    // eslint-disable-next-line no-param-reassign
    req.session.next = next ?? "/";
    const { url, state } = this.ssoClient.get_login_params();
    // eslint-disable-next-line no-param-reassign
    req.session.sso_state = state;
    if (social_login === "0") {
      return res.redirect(`${url}&social_enabled=0&show_disabled_button=0`);
    }
    return res.redirect(url);
  }

  @Public()
  @Get("login/callback")
  async loginCallback(
    @Query("state") state: string,
    @Query("code") code: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Session() session: Record<string, any>,
    @Res() response: Response,
  ) {
    const stateBefore = session.sso_state;
    if (!stateBefore || stateBefore !== state) {
      response.redirect("/error/invalid-login");
    }
    const ssoProfile: SSOUser = await this.ssoClient.get_user_info(code);
    const {
      accessToken,
      accessTokenOptions,
      refreshToken,
      refreshTokenOptions,
    } = await this.authService.ssoLogin(ssoProfile);

    response.cookie("accessToken", accessToken, accessTokenOptions);
    response.cookie("refreshToken", refreshToken, refreshTokenOptions);

    /*
    @Todo
    call import_student_lectures(studentId)
     */

    // eslint-disable-next-line @typescript-eslint/naming-convention
    const next_url = session.next ?? "/";
    response.redirect(next_url);
  }

  @Get("roles")
  async getRoles(@GetUser() user: UserDto): Promise<string[]> {
    const roles = await this.authService.getRoles(user.id);
    return roles;
  }

  @Get("roles/role")
  async selectRole(
    @Query("role") role: string,
    @GetUser() user: UserDto,
    @Res() response: Response,
    @Query("next") next: string,
  ) {
    const { accessToken, ...accessTokenOptions } =
      await this.authService.getCookieWithRoleAccessToken(
        user.id,
        user.sid,
        role,
      );

    response.cookie("accessToken", accessToken, accessTokenOptions);
    response.redirect(next ?? "/");
  }

  @Get("info")
  async getUserProfile(@GetUser() user: UserDto): Promise<UserDto> {
    const profile = user;
    return profile;
  }

  @Public()
  @Get("/")
  async home(@Req() req: Request, @Res() res: Response) {
    return res.redirect("/auth/login");
  }

  @Public()
  @Get("logout")
  async logout(
    @Req() req: Request,
    @Res() res: Response,
    @Query("next") next: string,
    @GetUser() user: UserDto,
  ) {
    if (user) {
      const { sid } = user;
      const { protocol } = req;
      const host = req.get("host");
      const { originalUrl } = req;
      const absoluteUrl = `${protocol}://${host}${originalUrl}`;
      const logoutUrl = this.ssoClient.get_logout_url(sid, absoluteUrl);

      res.clearCookie("accessToken", { path: "/", maxAge: 0, httpOnly: true });
      res.clearCookie("refreshToken", { path: "/", maxAge: 0, httpOnly: true });

      // console.log(logoutUrl);
      return res.redirect(logoutUrl);
    }

    return res.redirect(next ?? "/");
  }
}
