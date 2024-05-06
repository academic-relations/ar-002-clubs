import { Controller, Get, Query } from "@nestjs/common";

import apiNtc001 from "@sparcs-clubs/interface/api/notice/endpoint/apiNtc001";

import type {
  ApiNtc001RequestQuery,
  ApiNtc001ResponseOK,
} from "@sparcs-clubs/interface/api/notice/endpoint/apiNtc001";

import { NoticesService } from "../service/notices.service";

@Controller("/api/notices")
export class NoticesController {
  constructor(private readonly noticesService: NoticesService) {}

  @Get()
  async notices(
    @Query("pageOffset") pageOffset: ApiNtc001RequestQuery["pageOffset"],
    @Query("itemCount") itemCount: ApiNtc001RequestQuery["itemCount"],
  ): Promise<ApiNtc001ResponseOK> {
    // zodExceptionHandler는 전역으로 관리될것이라고 알고있어서 추가하지 않았습니다
    // 쿼리 파라미터를 파싱하는 가장 좋은 방법에 관해 고민이 됩니다
    const query: ApiNtc001RequestQuery = apiNtc001.requestQuery.parse({
      pageOffset: Number(pageOffset),
      itemCount: Number(itemCount),
    });
    // 백엔드도 동일하게 로그레벨 활용하나요?
    console.log(
      `[/notices] getting notice with offset ${query.pageOffset}, count ${query.itemCount}`,
    );
    const notices = await this.noticesService.notices(
      query.pageOffset,
      query.itemCount,
    );

    return notices;
  }
}
