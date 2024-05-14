import { ApiClb001ResponseOK } from "@sparcs-clubs/interface/api/club/endpoint/apiClb001";
import { Injectable, Inject } from "@nestjs/common";
import {
  Club,
  ClubStudentT,
  ClubT,
  clubRepresentativeD,
} from "@sparcs-clubs/api/drizzle/schema/club.schema";
import {
  Division,
  DivisionPermanentClubD,
} from "@sparcs-clubs/api/drizzle/schema/division.schema";
import { Student, User } from "@sparcs-clubs/api/drizzle/schema/user.schema";
import { and, count, eq, sql, isNull, or, gte } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";
import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";

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

  async getAllClubs(): Promise<ApiClb001ResponseOK> {
    const crt = new Date();
    const rows = await this.db
      .select({
        id: Division.id,
        name: Division.name,
        clubs: {
          type: ClubT.clubStatusEnumId,
          id: Club.id,
          name: Club.name,
          isPermanent: sql<boolean>`COALESCE(MAX(CASE WHEN DivisionPermanentClubD.id IS NOT NULL THEN 'true' ELSE 'false' END),'false')`,
          characteristic: ClubT.characteristicKr,
          representative: User.name,
          advisor: ClubT.advisor,
          totalMemberCnt: count(ClubStudentT),
        },
      })
      .from(Division)
      .leftJoin(Club, eq(Club.divisionId, Division.id))
      .leftJoin(ClubT, eq(Club.id, ClubT.id))
      .leftJoin(
        ClubStudentT,
        and(
          eq(Club.id, ClubStudentT.clubId),
          or(isNull(ClubStudentT.endTerm), gte(ClubStudentT.endTerm, crt)),
        ),
      )
      .leftJoin(
        clubRepresentativeD,
        and(
          eq(Club.id, clubRepresentativeD.clubId),
          eq(clubRepresentativeD.clubRepresentativeEnum, 1),
          or(
            isNull(clubRepresentativeD.endTerm),
            gte(clubRepresentativeD.endTerm, crt),
          ),
        ),
      )
      .leftJoin(Student, eq(clubRepresentativeD.studentId, Student.id))
      .leftJoin(User, eq(Student.userId, User.id))
      .leftJoin(
        DivisionPermanentClubD,
        eq(Club.id, DivisionPermanentClubD.clubId),
      )
      .groupBy(
        Division.id,
        Club.id,
        Club.name,
        ClubT.clubStatusEnumId,
        ClubT.characteristicKr,
        User.name,
        ClubT.advisor,
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
        acc[divId].clubs.push(club);
      }
      return acc;
    }, {});
    const result = {
      divisions: Object.values(record),
    };
    return result;
  }
}
