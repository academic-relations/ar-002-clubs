import { Inject, Injectable } from "@nestjs/common";
import { and, gt, isNull, lte } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";

import { DrizzleAsyncProvider } from "@sparcs-clubs/api/drizzle/drizzle.provider";
import { SemesterD } from "@sparcs-clubs/api/drizzle/schema/club.schema";

@Injectable()
export default class SemesterDRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

  async findByDate(date: Date) {
    const result = await this.db
      .select()
      .from(SemesterD)
      .where(
        and(
          lte(SemesterD.startTerm, date),
          gt(SemesterD.endTerm, date),
          isNull(SemesterD.deletedAt),
        ),
      );

    return result;
  }
}
