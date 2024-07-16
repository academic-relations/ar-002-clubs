import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
  UsePipes,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import apiAut001, {
  ApiAut001ResponseOk,
} from "@sparcs-clubs/interface/api/auth/endpoint/apiAut001";
import apiAut002, {
  ApiAut002ResponseOk,
} from "@sparcs-clubs/interface/api/auth/endpoint/apiAut002";
import apiAut003, {
  ApiAut003ResponseOk,
} from "@sparcs-clubs/interface/api/auth/endpoint/apiAut003";
import { Response } from "express";

import { ZodPipe } from "@sparcs-clubs/api/common/pipe/zod-pipe";
import logger from "@sparcs-clubs/api/common/util/logger";

import {
  UserAccessTokenPayload,
  UserRefreshTokenPayload,
} from "../dto/auth.dto";
import { AuthService } from "../service/auth.service";

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/auth/sign-in")
  @UsePipes(new ZodPipe(apiAut001))
  async postAuthSignin(
    @Res() res: Response,
  ): Promise<Response<ApiAut001ResponseOk>> {
    const token = await this.authService.postAuthSignin();
    res.setHeader("Set-Cookie", `refreshToken=${token.refreshToken}`);
    return res.json({ accessToken: token.accessToken });
  }

  @UseGuards(AuthGuard("refresh"))
  @Post("/auth/refresh")
  @UsePipes(new ZodPipe(apiAut002))
  async postAuthRefresh(
    @Req() req: Request & UserRefreshTokenPayload,
  ): Promise<ApiAut002ResponseOk> {
    return this.authService.postAuthRefresh(req.user);
  }

  @UseGuards(AuthGuard("access"))
  @Post("/auth/sign-out")
  @UsePipes(new ZodPipe(apiAut003))
  postAuthSignout(
    @Req() req: Request & UserRefreshTokenPayload,
  ): Promise<ApiAut003ResponseOk> {
    return this.authService.postAuthSignout(req.user);
  }

  // test용 API, 실제 사용하지 않음
  @UseGuards(AuthGuard("access"))
  @Get("/auth/test")
  test(@Req() req: Request & UserAccessTokenPayload) {
    logger.debug(req.user);
  }
}
