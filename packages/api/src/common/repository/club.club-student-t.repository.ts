import { Injectable, Inject } from "@nestjs/common";
import { MySql2Database } from "drizzle-orm/mysql2";
import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";
import { ClubStudentT } from "src/drizzle/schema/club.schema";
import { count, eq } from "drizzle-orm";
import { takeUnique } from "../util/util";

@Injectable()
export class ClubStudentTRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

  async findTotalMemberCnt(
    clubId: number,
  ): Promise<{ totalMemberCnt: number }> {
    const totalMemberCnt = await this.db
      .select({ totalMemberCnt: count() })
      .from(ClubStudentT)
      .where(eq(ClubStudentT.clubId, clubId)) // TODO 현재는 모든 club 회원 수를 반환. 여기 현재 semester만 필터링하는 것도 추가해야 함.
      .then(takeUnique);

    return totalMemberCnt;
  }
}
