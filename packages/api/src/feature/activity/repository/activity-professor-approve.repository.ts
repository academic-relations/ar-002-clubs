import { Inject, Injectable } from "@nestjs/common";
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
}
