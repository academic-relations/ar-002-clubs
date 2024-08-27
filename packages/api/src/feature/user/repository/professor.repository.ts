import { Inject, Injectable } from "@nestjs/common";

import { and, eq, gte, isNull, lte, or } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";

import { getKSTDate, takeUnique } from "@sparcs-clubs/api/common/util/util";

import { DrizzleAsyncProvider } from "@sparcs-clubs/api/drizzle/drizzle.provider";
import {
  Professor,
  ProfessorT,
} from "@sparcs-clubs/api/drizzle/schema/user.schema";

@Injectable()
export default class ProfessorRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

  async getProfessorPhoneNumber(id: number) {
    const crt = getKSTDate();
    const result = await this.db
      .select({ phoneNumber: Professor.phoneNumber })
      .from(Professor)
      .where(eq(Professor.userId, id))
      .leftJoin(
        ProfessorT,
        and(
          eq(ProfessorT.professorId, Professor.id),
          or(gte(ProfessorT.endTerm, crt), isNull(ProfessorT.endTerm)),
          lte(ProfessorT.startTerm, crt),
          isNull(ProfessorT.deletedAt),
        ),
      )
      .then(takeUnique);
    return result;
  }
}
