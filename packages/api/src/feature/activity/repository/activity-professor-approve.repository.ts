import { Inject, Injectable } from "@nestjs/common";
import { and, eq } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";

import { DrizzleAsyncProvider } from "@sparcs-clubs/api/drizzle/drizzle.provider";
import { ActivityProfessorApprove } from "@sparcs-clubs/api/drizzle/schema/activity.schema";

@Injectable()
export default class ActivityProfessorApproveRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

  async insert(clubId: number, activityDId: number): Promise<boolean> {
    const [result] = await this.db.insert(ActivityProfessorApprove).values({
      clubId,
      activityDId,
    });

    return result.affectedRows === 1;
  }

  async fetch(clubId: number, activityDId: number) {
    const [result] = await this.db
      .select()
      .from(ActivityProfessorApprove)
      .where(
        and(
          eq(ActivityProfessorApprove.clubId, clubId),
          eq(ActivityProfessorApprove.activityDId, activityDId),
        ),
      );
    return result;
  }
}
