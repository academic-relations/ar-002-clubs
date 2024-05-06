import { Injectable, Inject } from "@nestjs/common";
import { MySql2Database } from "drizzle-orm/mysql2";
import { count, desc } from "drizzle-orm";
import { Notice } from "src/drizzle/schema/notice.schema";
import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";

import type { NoticesRepositoryResponse } from "@sparcs-clubs/api/feature/notice/dto/notices.dto";

@Injectable()
export class NoticesRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

  // Notice 의 id 내림차순으로 정렬된 상태에서, 페이지네이션을 수행합니다.
  async notices(
    pageOffset: number,
    itemCount: number,
  ): Promise<NoticesRepositoryResponse> {
    const numberOfNotices = (
      await this.db.select({ count: count() }).from(Notice)
    ).at(0).count;

    const startIndex = (pageOffset - 1) * itemCount + 1;
    const notices: NoticesRepositoryResponse["notices"] = await this.db
      .select()
      .from(Notice)
      .orderBy(desc(Notice.id))
      .limit(itemCount)
      .offset(startIndex - 1);

    return {
      notices,
      total: numberOfNotices,
      offset: pageOffset,
    };
  }
}
