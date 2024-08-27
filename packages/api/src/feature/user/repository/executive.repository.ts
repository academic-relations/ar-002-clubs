import { Inject, Injectable } from "@nestjs/common";

import { and, eq, gte, isNull, lte, or } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";

import { getKSTDate, takeUnique } from "@sparcs-clubs/api/common/util/util";

import { DrizzleAsyncProvider } from "@sparcs-clubs/api/drizzle/drizzle.provider";
import {
  Executive,
  ExecutiveT,
} from "@sparcs-clubs/api/drizzle/schema/user.schema";

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
          or(gte(ExecutiveT.endTerm, crt), isNull(ExecutiveT.endTerm)),
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
          or(gte(ExecutiveT.endTerm, crt), isNull(ExecutiveT.endTerm)),
          lte(ExecutiveT.startTerm, crt),
          isNull(ExecutiveT.deletedAt),
        ),
      );
    return result;
  }

  async getExecutivePhoneNumber(id: number) {
    const crt = getKSTDate();
    const result = await this.db
      .select({ phoneNumber: Executive.phoneNumber })
      .from(Executive)
      .where(eq(Executive.userId, id))
      .leftJoin(
        ExecutiveT,
        and(
          eq(ExecutiveT.executiveId, Executive.id),
          or(gte(ExecutiveT.endTerm, crt), isNull(ExecutiveT.endTerm)),
          lte(ExecutiveT.startTerm, crt),
          isNull(ExecutiveT.deletedAt),
        ),
      )
      .then(takeUnique);
    return result;
  }
}
