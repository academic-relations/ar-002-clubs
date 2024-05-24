import { Controller, Get, Query, Req, Res, Session } from "@nestjs/common";
import { UserDto } from "src/common/dto/user.dto";
import { GetUser } from "src/common/decorator/get-user.decorator";
import { Public } from "src/common/decorator/skip-auth.decorator";
import { Request, Response } from "../dto/auth.dto";
import { AuthService } from "../service/auth.service";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Get("/auth/login")
  async getAuthLogin(
    @Query("next") next: string,
    @Query("social_login") socialLogin: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const query = { next, socialLogin };
    const url = await this.authService.getAuthLogin(query, req);
    return res.redirect(url);
  }

  @Public()
  @Get("/auth/login/callback")
  async getAuthLoginCallback(
    @Query("state") state: string,
    @Query("code") code: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    @Session() session: Request["session"],
    @Res() res: Response,
  ) {
    const query = { state, code };
    const { nextUrl, refreshToken, refreshTokenOptions } =
      await this.authService.getAuthLoginCallback(query, session);
    if (refreshToken && refreshTokenOptions) {
      res.cookie("refreshToken", refreshToken, refreshTokenOptions);
    }
    return res.redirect(nextUrl);
  }

  @Public()
  @Get("/auth/logout")
  async getAuthLogout(
    @Query("next") next: string,
    @Req() req: Request,
    @Res() res: Response,
    @GetUser() user: UserDto,
  ) {
    const query = { next };
    const url = await this.authService.getAuthLogout(query, req, user);
    if (user) {
      res.clearCookie("refreshToken", { path: "/", maxAge: 0, httpOnly: true });
    }
    return res.redirect(url);
  }

  @Get("/auth/info")
  async getUserProfile(@GetUser() user: UserDto): Promise<UserDto> {
    const profile = user;
    return profile;
  }

  // @Get("/auth/roles")
  // async getRoles(@GetUser() user: UserDto): Promise<string[]> {
  //   const roles = await this.authService.getRoles(user.id);
  //   return roles;
  // }

  // @Get("/auth/roles/role")
  // async selectRole(
  //   @Query("role") role: string,
  //   @GetUser() user: UserDto,
  //   @Res() response: Response,
  //   @Query("next") next: string,
  // ) {
  //   const { accessToken, ...accessTokenOptions } =
  //     await this.authService.getCookieWithRoleAccessToken(
  //       user.id,
  //       user.sid,
  //       role,
  //     );

  //   response.cookie("accessToken", accessToken, accessTokenOptions);
  //   response.redirect(next ?? "/");
  // }

  // @Public()
  // @Get("/auth")
  // async home(@Req() req: Request, @Res() res: Response) {
  //   return res.redirect("/auth/login");
  // }
}
