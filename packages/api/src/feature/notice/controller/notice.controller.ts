import { Controller, Get, Query, UsePipes } from "@nestjs/common";
import apiNtc001 from "@sparcs-clubs/interface/api/notice/endpoint/apiNtc001";

import { ZodPipe } from "@sparcs-clubs/api/common/pipe/zod-pipe";
import logger from "@sparcs-clubs/api/common/util/logger";

import { NoticeService } from "../service/notice.service";

import type {
  ApiNtc001RequestQuery,
  ApiNtc001ResponseOK,
} from "@sparcs-clubs/interface/api/notice/endpoint/apiNtc001";

@Controller()
export class NoticeController {
  constructor(private readonly noticesService: NoticeService) {}

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
}
