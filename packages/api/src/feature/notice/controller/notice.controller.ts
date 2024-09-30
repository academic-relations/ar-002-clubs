import { Body, Controller, Get, Post, Query, UsePipes } from "@nestjs/common";
import apiNtc001 from "@sparcs-clubs/interface/api/notice/endpoint/apiNtc001";
import apiNtc003 from "@sparcs-clubs/interface/api/notice/endpoint/apiNtc003";
import apiNtc004 from "@sparcs-clubs/interface/api/notice/endpoint/apiNtc004";

import { ZodPipe } from "@sparcs-clubs/api/common/pipe/zod-pipe";
import {
  Executive,
  Public,
} from "@sparcs-clubs/api/common/util/decorators/method-decorator";
import logger from "@sparcs-clubs/api/common/util/logger";

import { NoticeService } from "../service/notice.service";

import type {
  ApiNtc001RequestQuery,
  ApiNtc001ResponseOK,
} from "@sparcs-clubs/interface/api/notice/endpoint/apiNtc001";

import type {
  ApiNtc003RequestBody,
  ApiNtc003ResponseCreated,
} from "@sparcs-clubs/interface/api/notice/endpoint/apiNtc003";

import type {
  ApiNtc004RequestBody,
  ApiNtc004ResponseCreated,
} from "@sparcs-clubs/interface/api/notice/endpoint/apiNtc004";

@Controller()
export class NoticeController {
  constructor(private readonly noticesService: NoticeService) {}

  @Public()
  @Get("/notices")
  @UsePipes(new ZodPipe(apiNtc001))
  async getNotices(
    @Query() query: ApiNtc001RequestQuery,
  ): Promise<ApiNtc001ResponseOK> {
    logger.debug(
      `[/notices] offset: ${query.pageOffset}, count: ${query.itemCount}`,
    );
    const notices = await this.noticesService.getNotices(
      query.pageOffset,
      query.itemCount,
    );
    return notices;
  }

  @Executive()
  @Post("/notices")
  @UsePipes(new ZodPipe(apiNtc003))
  async postNotices(
    @Body() body: ApiNtc003RequestBody,
  ): Promise<ApiNtc003ResponseCreated> {
    logger.debug(`[/notices] title: ${body.title}, link: ${body.link}`);
    const result = await this.noticesService.postNotices(body);
    return result;
  }

  @Executive()
  @Post("/notices/update")
  @UsePipes(new ZodPipe(apiNtc004))
  async postNoticesCrawling(
    @Body() _body: ApiNtc004RequestBody,
  ): Promise<ApiNtc004ResponseCreated> {
    logger.debug(`[/notices/update]`);
    const result = await this.noticesService.postNoticesCrawling();
    return result;
  }
}
