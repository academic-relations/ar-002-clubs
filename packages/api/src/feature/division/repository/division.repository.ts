import { Inject, Injectable } from "@nestjs/common";

import { and, eq, gte, isNull, lte } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";

import { getKSTDate, takeUnique } from "@sparcs-clubs/api/common/util/util";
import { DrizzleAsyncProvider } from "@sparcs-clubs/api/drizzle/drizzle.provider";
import {
  Division,
  DivisionPresidentD,
} from "@sparcs-clubs/api/drizzle/schema/division.schema";

@Injectable()
export default class DivisionRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

  async selectDivisionsAndDivisionPresidents() {
    const today = getKSTDate();

    const result = await this.db
      .select()
      .from(Division)
      .innerJoin(
        DivisionPresidentD,
        and(
          isNull(Division.deletedAt),
          isNull(DivisionPresidentD.deletedAt),
          eq(Division.id, DivisionPresidentD.divisionId),
          lte(DivisionPresidentD.startTerm, today),
          gte(DivisionPresidentD.endTerm, today),
        ),
      );
    return result;
  }

  async findDivisionById(divisionId: number): Promise<number | null> {
    const result = await this.db
      .select({ id: Division.id })
      .from(Division)
      .where(and(eq(Division.id, divisionId), isNull(Division.deletedAt)))
      .then(takeUnique);
    return result ? result.id : null;
  }
}
