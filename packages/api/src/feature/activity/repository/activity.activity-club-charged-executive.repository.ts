import { Inject, Injectable } from "@nestjs/common";
import { and, eq, isNull } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";

// import logger from "@sparcs-clubs/api/common/util/logger";
import { DrizzleAsyncProvider } from "@sparcs-clubs/api/drizzle/drizzle.provider";
import { ActivityClubChargedExecutive } from "@sparcs-clubs/api/drizzle/schema/activity.schema";

@Injectable()
export default class ActivityClubChargedExecutiveRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

  /**
   * @param acitvityDId 활동기간 아이디를 받습니다.
   * @param clubId 동아리 아이디를 받습니다.
   * @returns 해당 활동기간 해당 동아리의 활동보고서 당당 집행부원을 리턴합니다.
   * 담당자가 존재하징 않을 수 있습니다. 리턴은 배열 형태이며, 배열의 길이는 1 이하여야 합니다.
   */
  async selectActivityClubChargedExecutiveByClubId(param: {
    acitvityDId: number;
    clubId: number;
  }) {
    const result = await this.db
      .select()
      .from(ActivityClubChargedExecutive)
      .where(
        and(
          eq(ActivityClubChargedExecutive.activityDId, param.acitvityDId),
          eq(ActivityClubChargedExecutive.clubId, param.clubId),
          isNull(ActivityClubChargedExecutive.deletedAt),
        ),
      );
    return result;
  }
}
