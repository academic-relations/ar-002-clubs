import { Inject, Injectable } from "@nestjs/common";

import { and, eq, gte, isNull, lte, or } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";

import logger from "@sparcs-clubs/api/common/util/logger";
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
      .where(and(eq(Professor.userId, id), isNull(Professor.deletedAt)))
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

  async selectProfessorById(id: number) {
    return this.db
      .select()
      .from(Professor)
      .where(and(eq(Professor.userId, id), isNull(Professor.deletedAt)));
  }

  async updateProfessorPhoneNumber(id: number, phoneNumber: string) {
    const isUpdateSucceed = await this.db.transaction(async tx => {
      const [result] = await tx
        .update(Professor)
        .set({ phoneNumber })
        .where(and(eq(Professor.userId, id), isNull(Professor.deletedAt)));
      if (result.affectedRows === 0) {
        logger.debug("[updatePhoneNumber] rollback occurs");
        tx.rollback();
        return false;
      }
      return true;
    });
    return isUpdateSucceed;
  }
}
