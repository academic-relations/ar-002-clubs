import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { and, eq, gte, inArray, isNull, lte } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";

import { IDivisionSummary } from "@sparcs-clubs/interface/api/club/type/club.type";

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

  async findDivisionById(divisionId: number): Promise<number | undefined> {
    const result = await this.db
      .select({ id: Division.id })
      .from(Division)
      .where(and(eq(Division.id, divisionId), isNull(Division.deletedAt)))
      .then(takeUnique);
    return result ? result.id : undefined;
  }

  async selectDivisionById(param: { id: number }) {
    const result = await this.db
      .select()
      .from(Division)
      .where(and(eq(Division.id, param.id), isNull(Division.deletedAt)));
    return result;
  }

  async fetchSummaries(ids: number[]): Promise<IDivisionSummary[]> {
    if (ids.length === 0) {
      return [];
    }

    const result = await this.db
      .select({
        id: Division.id,
        name: Division.name,
      })
      .from(Division)
      .where(inArray(Division.id, ids));
    return result;
  }

  async fetchSummary(id: number): Promise<IDivisionSummary> {
    const result = await this.db
      .select({
        id: Division.id,
        name: Division.name,
      })
      .from(Division)
      .where(and(eq(Division.id, id), isNull(Division.deletedAt)));

    if (result.length !== 1) {
      throw new NotFoundException("Division not found");
    }

    return result[0];
  }
}
