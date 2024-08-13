import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
} from "@nestjs/common";
import apiAut001, {
  ApiAut001ResponseOk,
} from "@sparcs-clubs/interface/api/auth/endpoint/apiAut001";
import apiAut002, {
  ApiAut002ResponseOk,
} from "@sparcs-clubs/interface/api/auth/endpoint/apiAut002";
import apiAut003, {
  ApiAut003ResponseOk,
} from "@sparcs-clubs/interface/api/auth/endpoint/apiAut003";
import { Request, Response } from "express";

import { ZodPipe } from "@sparcs-clubs/api/common/pipe/zod-pipe";
import {
  Public,
  Student,
} from "@sparcs-clubs/api/common/util/decorators/method-decorator";
import { GetStudent } from "@sparcs-clubs/api/common/util/decorators/param-decorator";
import logger from "@sparcs-clubs/api/common/util/logger";

import { UserRefreshTokenPayload } from "../dto/auth.dto";
import { JwtRefreshGuard } from "../guard/jwt-refresh.guard";
import { AuthService } from "../service/auth.service";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post("/auth/sign-in")
  @UsePipes(new ZodPipe(apiAut001))
  async postAuthSignin(
    @Res() res: Response,
  ): Promise<Response<ApiAut001ResponseOk>> {
    const token = await this.authService.postAuthSignin();
    res.cookie("refreshToken", token.refreshToken, {
      expires: token.expiresAt,
      httpOnly: true,
      path: "/auth/refresh",
    });
    res.cookie("refreshToken", token.refreshToken, {
      expires: token.expiresAt,
      httpOnly: true,
      path: "/auth/sign-out",
    });
    return res.json({ accessToken: token.accessToken });
  }

  @Public()
  @UseGuards(JwtRefreshGuard)
  @Post("/auth/refresh")
  @UsePipes(new ZodPipe(apiAut002))
  async postAuthRefresh(
    @Req() req: Request & UserRefreshTokenPayload,
  ): Promise<ApiAut002ResponseOk> {
    return this.authService.postAuthRefresh(req.user);
  }

  @Public()
  @UseGuards(JwtRefreshGuard)
  @Post("/auth/sign-out")
  @UsePipes(new ZodPipe(apiAut003))
  postAuthSignout(
    @Res({ passthrough: true }) res: Response,
    @Req() req: Request & UserRefreshTokenPayload,
  ): Promise<ApiAut003ResponseOk> {
    const { refreshToken } = req?.cookies || {};
    res.cookie("refreshToken", null, {
      maxAge: -1,
      httpOnly: true,
      path: "/auth/refresh",
    });
    res.cookie("refreshToken", null, {
      maxAge: -1,
      httpOnly: true,
      path: "/auth/sign-out",
    });
    return this.authService.postAuthSignout(req.user, refreshToken);
  }

  // test용 API, 실제 사용하지 않음
  @Student()
  @Get("/auth/test")
  test(@GetStudent() user: GetStudent) {
    function printObjectPropertyTypes<T>(obj: T): void {
      // eslint-disable-next-line no-restricted-syntax, guard-for-in
      for (const key in obj) {
        logger.debug(`Property ${key} is of type ${typeof obj[key]}`);
      }
    }
    printObjectPropertyTypes(user);
    logger.debug(user.studentId + user.studentNumber);
  }

  // @Public()
  // @Get("/auth/login")
  // async getAuthLogin(
  //   @Query("next") next: string,
  //   @Query("social_login") socialLogin: string,
  //   @Req() req: Request,
  //   @Res() res: Response,
  // ) {
  //   const query = { next, socialLogin };
  //   const url = await this.authService.getAuthLogin(query, req);
  //   return res.redirect(url);
  // }

  // @Public()
  // @Get("/auth/login/callback")
  // async getAuthLoginCallback(
  //   @Query("state") state: string,
  //   @Query("code") code: string,
  //   @Session() session: Request["session"],
  //   @Res() res: Response,
  // ) {
  //   const query = { state, code };
  //   const { nextUrl, refreshToken, refreshTokenOptions } =
  //     await this.authService.getAuthLoginCallback(query, session);
  //   if (refreshToken && refreshTokenOptions) {
  //     res.cookie("refreshToken", refreshToken, refreshTokenOptions);
  //   }
  //   return res.redirect(nextUrl);
  // }

  // @Public()
  // @Get("/auth/logout")
  // async getAuthLogout(
  //   @Query("next") next: string,
  //   @Req() req: Request,
  //   @Res() res: Response,
  //   @GetUser() user: UserDto,
  // ) {
  //   const query = { next };
  //   const url = await this.authService.getAuthLogout(query, req, user);
  //   if (user) {
  //     res.clearCookie("refreshToken", { path: "/", maxAge: 0, httpOnly: true });
  //   }
  //   return res.redirect(url);
  // }
}
