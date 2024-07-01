import { Controller, Get, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Response } from "express";

import logger from "@sparcs-clubs/api/common/util/logger";

import {
  UserAccessTokenPayload,
  UserRefreshTokenPayload,
} from "../dto/auth.dto";
import { AuthService } from "../service/auth.service";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/auth/signin")
  // @UsePipes(new ZodPipe(apiAth001))
  async postAuthSignin(@Res() res: Response) {
    const token = await this.authService.postAuthSignin();
    res.setHeader("Set-Cookie", `refreshToken=${token.refreshToken}`);
    res.json({ accessToken: token.accessToken });
  }

  @UseGuards(AuthGuard("refresh"))
  @Post("/auth/refresh")
  getAuthRefresh(@Req() req: Request & UserRefreshTokenPayload) {
    logger.debug(req.user);
    // return this.authService.postAuthRefresh({ user: req.user });
  }

  @UseGuards(AuthGuard("access"))
  @Get("/auth/test")
  test(@Req() req: Request & UserAccessTokenPayload) {
    logger.debug(req.user);
  }
}
