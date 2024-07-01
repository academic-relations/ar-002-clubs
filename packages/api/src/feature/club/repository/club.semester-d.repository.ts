import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { and, gte, lte } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";

import { getKSTDate } from "src/common/util/util";

import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";
import { SemesterD } from "src/drizzle/schema/club.schema";

@Injectable()
export class SemesterDRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

  // 가장 최근 대표자의 이름을 가져오기
  async getCurrentSemester() {
    const krToday = getKSTDate(new Date());

    const currentSemester = await this.db
      .select()
      .from(SemesterD)
      .where(
        and(lte(SemesterD.startTerm, krToday), gte(SemesterD.endTerm, krToday)),
      );

    if (currentSemester.length !== 1) {
      throw new HttpException(
        "[getCurrentSemester] current date is not semester?",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return currentSemester[0];
  }
}
