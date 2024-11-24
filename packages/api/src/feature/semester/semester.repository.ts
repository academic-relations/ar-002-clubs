import { Inject, Injectable } from "@nestjs/common";
import { count, desc, InferSelectModel, isNull } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";

import { DrizzleAsyncProvider } from "@sparcs-clubs/api/drizzle/drizzle.provider";

import { SemesterD } from "@sparcs-clubs/api/drizzle/schema/club.schema";

@Injectable()
export default class SemesterRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

  /**
   * @param offset      페이지네이션의 시작점 (1부터 시작)
   * @param itemCount   페이지에 표시할 항목의 수
   * @returns           최신순으로 정렬된 학기 목록에서 (offset-1) * itemCount부터 itemCount개의 항목을 가져옵니다.
   *                    전체 학기의 개수도 함께 반환합니다.
   */
  async selectSemesterByOffsetAndItemCount(param: {
    offset: number;
    itemCount: number;
  }): Promise<{
    semesters: InferSelectModel<typeof SemesterD>[];
    total: number;
  }> {
    const numberOfSemesters = (
      await this.db
        .select({ count: count() })
        .from(SemesterD)
        .where(isNull(SemesterD.deletedAt))
    ).at(0).count;

    const offset = (param.offset - 1) * param.itemCount;
    const semesters = await this.db
      .select()
      .from(SemesterD)
      .where(isNull(SemesterD.deletedAt))
      .orderBy(desc(SemesterD.id))
      .limit(param.itemCount)
      .offset(offset);

    return {
      semesters,
      total: numberOfSemesters,
    };
  }
}
