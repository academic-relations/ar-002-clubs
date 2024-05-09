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

export interface IClubs {
  divisionId: number;
  divisionName: string;
  clubs: {
    clubId: number;
    clubName: string;
    clubType: number;
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

  async getAllClubs(): Promise<Record<number, IClubs>> {
    const crt = new Date();
    const rows = await this.db
      .select({
        divisionId: Division.id,
        divisionName: Division.name,
        clubs: {
          clubId: Club.id,
          clubName: Club.name,
          clubType: ClubT.clubStatusEnumId,
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
    const result = rows.reduce<Record<number, IClubs>>((acc, row) => {
      const divId = row.divisionId;
      const divName = row.divisionName;
      const club = row.clubs;

      if (!acc[divId]) {
        // eslint-disable-next-line no-param-reassign
        acc[divId] = { divisionId: divId, divisionName: divName, clubs: [] };
      }

      if (club) {
        acc[divId].clubs.push(club);
      }
      return acc;
    }, {});
    return result;
  }
}

/*
200: 정상 응답
{
   divisions:
   [{
      "id": (int, Division.id),
      "name": (string, 20),
      "clubs":
      [{
         "id": (int, Clubs.id), --> clubT에 있음.
         "name": (string, 20), --> clubT에 있음.
         "type": (int, ClubStatusEnum.id), --> clubT에 있음.
         "isPermanent": (bool), --> division에 DivisionPermanentClubD있음.
         "characteristic": (string, 50), --> clubT에 있음.
         "representative": (string, 20), --> ClbuRepresentative에 있음.
         "advisor": (string?, 20), --> ClubT에 있음.
         "totalMemberCnt": (number, 0 < cnt), --> ClubStudentT의 count.
      }]
   }]
}
*/
// 1. division 전체 목록 가져오기
// 2. club과 join
