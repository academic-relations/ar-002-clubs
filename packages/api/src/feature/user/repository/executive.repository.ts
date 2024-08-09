import { Inject, Injectable } from "@nestjs/common";

import { and, eq, gte, lte } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";

import { getKSTDate } from "@sparcs-clubs/api/common/util/util";

import { DrizzleAsyncProvider } from "@sparcs-clubs/api/drizzle/drizzle.provider";
import { ExecutiveT } from "@sparcs-clubs/api/drizzle/schema/user.schema";

@Injectable()
export default class ExecutiveRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

  async findExecutiveById(id: number): Promise<boolean> {
    const crt = getKSTDate();
    const result = await this.db
      .select()
      .from(ExecutiveT)
      .where(
        and(
          eq(ExecutiveT.executiveId, id),
          gte(ExecutiveT.endTerm, crt),
          lte(ExecutiveT.startTerm, crt),
        ),
      );
    return result.length > 0;
  }

  async getExecutiveById(id: number) {
    const crt = getKSTDate();
    const result = await this.db
      .select()
      .from(ExecutiveT)
      .where(
        and(
          eq(ExecutiveT.executiveId, id),
          gte(ExecutiveT.endTerm, crt),
          lte(ExecutiveT.startTerm, crt),
        ),
      );
    return result;
  }
}
