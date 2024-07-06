import { Inject, Injectable } from "@nestjs/common";
import { and, eq, gte, isNull, lte, or } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";

import { Professor } from "@sparcs-clubs/api/drizzle/schema/user.schema";
import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";
import { ClubT } from "src/drizzle/schema/club.schema";

import { getKSTDate, takeUnique } from "../util/util";

@Injectable()
export class ClubTRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

  async findClubDetail(semesterId: number, clubId: number) {
    return this.db
      .select({
        clubStatusEnumId: ClubT.clubStatusEnumId,
        characteristicKr: ClubT.characteristicKr,
        professorId: ClubT.professorId,
        professorName: Professor.name,
      })
      .from(ClubT)
      .where(and(eq(ClubT.semesterId, semesterId), eq(ClubT.clubId, clubId)))
      .leftJoin(Professor, eq(Professor.id, ClubT.professorId))
      .then(result => ({
        clubStatusEnumId: result[0]?.clubStatusEnumId,
        characteristicKr: result[0]?.characteristicKr,
        advisor: result[0]?.professorId ? result[0].professorName : null,
      }));
  }

  async findClubById(clubId: number): Promise<boolean> {
    const crt = getKSTDate();
    const result = !!(await this.db
      .select({
        id: ClubT.clubId,
      })
      .from(ClubT)
      .where(
        and(
          eq(ClubT.clubId, clubId),
          or(
            and(isNull(ClubT.endTerm), lte(ClubT.endTerm, crt)),
            gte(ClubT.endTerm, crt),
          ),
        ),
      )
      .limit(1)
      .then(takeUnique));
    return result;
  }
}
