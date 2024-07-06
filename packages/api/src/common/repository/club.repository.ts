import { Inject, Injectable } from "@nestjs/common";
import { and, eq, gte, isNull, lte, or, sql } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";

import { getKSTDate, takeUnique } from "@sparcs-clubs/api/common/util/util";
import {
  Club,
  ClubRepresentativeD,
  ClubStudentT,
  ClubT,
} from "@sparcs-clubs/api/drizzle/schema/club.schema";
import {
  Division,
  DivisionPermanentClubD,
} from "@sparcs-clubs/api/drizzle/schema/division.schema";
import {
  Professor,
  Student,
} from "@sparcs-clubs/api/drizzle/schema/user.schema";
import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";

import type { ApiClb001ResponseOK } from "@sparcs-clubs/interface/api/club/endpoint/apiClb001";

interface IClubs {
  id: number;
  name: string;
  clubs: {
    type: number;
    id: number;
    name: string;
    isPermanent: boolean;
    characteristic: string;
    representative: string;
    advisor: string;
    totalMemberCnt: number;
  }[];
}

@Injectable()
export class ClubRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

  // clubId가 일치하는 club을 리스트로 가져옵니다.
  async findByClubId(clubId: number) {
    const clubList = await this.db
      .select()
      .from(Club)
      .where(eq(Club.id, clubId))
      .limit(1);

    return clubList;
  }

  async findClubDetail(clubId: number) {
    const crt = getKSTDate();
    const clubInfo = await this.db
      .select({
        id: Club.id,
        name: Club.name,
        type: ClubT.clubStatusEnumId,
        characteristic: ClubT.characteristicKr,
        advisor: Professor.name,
        description: Club.description,
        foundingYear: Club.foundingYear,
      })
      .from(Club)
      .leftJoin(ClubT, eq(ClubT.clubId, Club.id))
      .leftJoin(Professor, eq(Professor.id, ClubT.professorId))
      .where(
        and(
          eq(Club.id, clubId),
          or(
            and(isNull(ClubT.endTerm), gte(ClubT.startTerm, crt)),
            gte(ClubT.endTerm, crt),
          ),
          or(eq(ClubT.clubStatusEnumId, 1), eq(ClubT.clubStatusEnumId, 2)),
        ),
      )
      .limit(1)
      .then(takeUnique);

    const divisionName = await this.db
      .select({ name: Division.name })
      .from(Club)
      .leftJoin(Division, eq(Division.id, Club.divisionId))
      .where(eq(Club.id, clubId))
      .then(takeUnique);
    return { ...clubInfo, divisionName };
  }

  async getClubs(): Promise<ApiClb001ResponseOK> {
    const crt = getKSTDate();
    const rows = await this.db
      .select({
        id: Division.id,
        name: Division.name,
        clubs: {
          type: ClubT.clubStatusEnumId,
          id: Club.id,
          name: Club.name,
          isPermanent: sql`COALESCE(MAX(CASE WHEN ${DivisionPermanentClubD.id} IS NOT NULL THEN TRUE ELSE FALSE END), FALSE)`,
          characteristic: ClubT.characteristicKr,
          representative: Student.name,
          advisor: Professor.name,
          totalMemberCnt: sql<number>`count(${ClubStudentT.id})`,
        },
      })
      .from(Division)
      .leftJoin(Club, eq(Club.divisionId, Division.id))
      .innerJoin(
        ClubT,
        and(
          eq(Club.id, ClubT.clubId),
          or(
            and(isNull(ClubT.endTerm), lte(ClubT.startTerm, crt)),
            gte(ClubT.endTerm, crt),
          ),
          or(eq(ClubT.clubStatusEnumId, 1), eq(ClubT.clubStatusEnumId, 2)),
        ),
      )
      .leftJoin(Professor, eq(ClubT.professorId, Professor.id))
      .leftJoin(
        ClubStudentT,
        and(
          eq(Club.id, ClubStudentT.clubId),
          or(isNull(ClubStudentT.endTerm), gte(ClubStudentT.endTerm, crt)),
        ),
      )
      .leftJoin(
        ClubRepresentativeD,
        and(
          eq(Club.id, ClubRepresentativeD.clubId),
          eq(ClubRepresentativeD.clubRepresentativeEnum, 1),
          or(
            isNull(ClubRepresentativeD.endTerm),
            gte(ClubRepresentativeD.endTerm, crt),
          ),
        ),
      )
      .leftJoin(Student, eq(ClubRepresentativeD.studentId, Student.id))
      .leftJoin(
        DivisionPermanentClubD,
        eq(Club.id, DivisionPermanentClubD.clubId),
      )
      .groupBy(
        Division.id,
        Division.name,
        Club.id,
        Club.name,
        ClubT.clubStatusEnumId,
        ClubT.characteristicKr,
        Student.name,
        Professor.name,
      );
    const record = rows.reduce<Record<number, IClubs>>((acc, row) => {
      const divId = row.id;
      const divName = row.name;
      const club = row.clubs;

      if (!acc[divId]) {
        // eslint-disable-next-line no-param-reassign
        acc[divId] = { id: divId, name: divName, clubs: [] };
      }

      if (club) {
        acc[divId].clubs.push({ ...club, isPermanent: club.isPermanent === 1 });
      }
      return acc;
    }, {});
    const result = {
      divisions: Object.values(record),
    };
    return result;
  }

  async findClubActivities(studentId: number): Promise<{
    clubs: { id: number; name: string; startMonth: Date; endMonth: Date }[];
  }> {
    const clubActivities = await this.db
      .select()
      .from(ClubStudentT)
      .leftJoin(Club, eq(Club.id, ClubStudentT.clubId))
      .where(eq(ClubStudentT.studentId, studentId))
      .then(rows =>
        rows.map(row => ({
          id: row.club_student_t.clubId,
          name: row.club.name,
          startMonth: row.club_student_t.startTerm,
          endMonth: row.club_student_t.endTerm,
        })),
      );
    return { clubs: clubActivities };
  }

  async findClubName(clubId: number): Promise<string> {
    return this.db
      .select({ name: Club.name })
      .from(Club)
      .where(eq(Club.id, clubId))
      .then(result => result[0]?.name);
  }
}
