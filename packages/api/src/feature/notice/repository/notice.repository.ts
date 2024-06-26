import { Inject, Injectable } from "@nestjs/common";
import { count, desc } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";

import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";
import { Notice } from "src/drizzle/schema/notice.schema";

import type { GetNoticePaginationReturn } from "@sparcs-clubs/api/feature/notice/dto/notice.dto";

@Injectable()
export class NoticeRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

  // Notice 의 id 내림차순으로 정렬된 상태에서, 페이지네이션을 수행합니다.
  async getNoticePagination(
    pageOffset: number,
    itemCount: number,
  ): Promise<GetNoticePaginationReturn> {
    const numberOfNotices = (
      await this.db.select({ count: count() }).from(Notice)
    ).at(0).count;

    const startIndex = (pageOffset - 1) * itemCount + 1;
    const notices: GetNoticePaginationReturn["notices"] = await this.db
      .select()
      .from(Notice)
      .orderBy(desc(Notice.date))
      .limit(itemCount)
      .offset(startIndex - 1);

    return {
      notices,
      total: numberOfNotices,
      offset: pageOffset,
    };
  }
}
