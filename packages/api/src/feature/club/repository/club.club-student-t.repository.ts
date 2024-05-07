import { Injectable, Inject } from "@nestjs/common";
import { MySql2Database } from "drizzle-orm/mysql2";
import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";
import { ClubStudentT } from "src/drizzle/schema/club.schema";
import { count, eq } from "drizzle-orm";

const takeUniqueOrThrow = <T>(values: T[]): T => {
  if (values.length !== 1)
    throw new Error("Found non unique or inexistent value");
  return values[0];
};

@Injectable()
export class ClubStudentTRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

  async findTotalMemberCntByClubId(
    clubId: number,
  ): Promise<{ totalMemberCnt: number }> {
    const totalMemberCnt = await this.db
      .select({ totalMemberCnt: count() })
      .from(ClubStudentT)
      .where(eq(ClubStudentT.clubId, clubId)) // TODO  여기 현재 semester만 필터링하는 것도 추가해야 함.
      .then(takeUniqueOrThrow);

    return totalMemberCnt; // 아니면 위 then 지우고 totalMemberCnt[0]
  }
}
