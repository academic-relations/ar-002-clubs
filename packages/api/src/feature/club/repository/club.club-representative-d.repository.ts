import { Inject, Injectable } from "@nestjs/common";
import { and, eq, gte, isNull, lte, or } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";

import { getKSTDate, takeUnique } from "src/common/util/util";
import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";
import { ClubRepresentativeD } from "src/drizzle/schema/club.schema";
import { Student } from "src/drizzle/schema/user.schema";

@Injectable()
export class ClubRepresentativeDRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

  // 가장 최근 대표자의 이름을 가져오기
  async findRepresentativeName(
    clubId: number,
    startTerm?: Date,
  ): Promise<{ name: string }> {
    const currentDate = getKSTDate();

    const representative = await this.db
      .select({ name: Student.name })
      .from(ClubRepresentativeD)
      .leftJoin(Student, eq(Student.id, ClubRepresentativeD.studentId))
      .where(
        and(
          eq(ClubRepresentativeD.clubId, clubId),
          eq(ClubRepresentativeD.clubRepresentativeEnum, 1),
          lte(ClubRepresentativeD.startTerm, startTerm || currentDate),
          or(
            gte(ClubRepresentativeD.endTerm, startTerm || currentDate),
            isNull(ClubRepresentativeD.endTerm),
          ),
        ),
      )
      .orderBy(ClubRepresentativeD.endTerm)
      .limit(1)
      .then(takeUnique);

    return representative;
  }

  // 현재 동아리 대표자 목록 가져오기
  async findRepresentativeIdListByClubId(
    clubId: number,
  ): Promise<Array<{ studentId: number }>> {
    const currentDate = getKSTDate();

    const representative = await this.db
      .select({ studentId: ClubRepresentativeD.studentId })
      .from(ClubRepresentativeD)
      .where(
        and(
          eq(ClubRepresentativeD.clubId, clubId),
          lte(ClubRepresentativeD.startTerm, currentDate),
          or(
            gte(ClubRepresentativeD.endTerm, currentDate),
            isNull(ClubRepresentativeD.endTerm),
          ),
        ),
      )
      .orderBy(ClubRepresentativeD.endTerm);

    return representative;
  }

  async findRepresentativeByClubIdAndStudentId(
    studentId: number,
    clubId: number,
  ): Promise<boolean> {
    const crt = getKSTDate();
    const result = !!(await this.db
      .select({ id: ClubRepresentativeD.id })
      .from(ClubRepresentativeD)
      .where(
        and(
          eq(ClubRepresentativeD.clubId, clubId),
          eq(ClubRepresentativeD.studentId, studentId),
          lte(ClubRepresentativeD.startTerm, crt),
          or(
            gte(ClubRepresentativeD.endTerm, crt),
            isNull(ClubRepresentativeD.endTerm),
          ),
        ),
      )
      .limit(1)
      .then(takeUnique));
    return result;
  }
}
