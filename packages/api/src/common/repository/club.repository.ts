import { ApiClb001ResponseOK } from "@sparcs-clubs/interface/api/club/endpoint/apiClb001";
import { Injectable, Inject } from "@nestjs/common";
import {
  Club,
  ClubStudentT,
  ClubT,
  ClubRepresentativeD,
} from "@sparcs-clubs/api/drizzle/schema/club.schema";
import {
  Division,
  DivisionPermanentClubD,
} from "@sparcs-clubs/api/drizzle/schema/division.schema";
import { Student, User } from "@sparcs-clubs/api/drizzle/schema/user.schema";
import { and, count, eq, sql, isNull, or, gte } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";
import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";
import { takeUnique } from "@sparcs-clubs/api/common/util/util";

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

  // clubI가 일치하는 club을 리스트로 가져옵니다.
  async findByClubId(clubId: number) {
    const clubList = await this.db
      .select()
      .from(Club)
      .where(eq(Club.id, clubId))
      .limit(1);

    return clubList;
  }

  async findClubDetail(clubId: number) {
    const clubInfo = await this.db
      .select({
        id: Club.id,
        name: Club.name,
        type: ClubT.clubStatusEnumId,
        characteristic: ClubT.characteristicKr,
        // TODO: professor table에서 join하도록 변경
        // advisor: ClubT.advisor,
        description: Club.description,
        foundingYear: Club.foundingYear,
      })
      .from(Club)
      .leftJoin(ClubT, eq(ClubT.id, Club.id))
      .where(eq(Club.id, clubId))
      .limit(1)
      .then(takeUnique);

    const divisionName = await this.db
      .select({ name: Division.name })
      .from(Club)
      .leftJoin(Division, eq(Division.id, Club.divisionId))
      .then(takeUnique);
    return { ...clubInfo, divisionName };
  }

  async getClubs(): Promise<ApiClb001ResponseOK> {
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
          // TODO: professor table에서 join하도록 변경
          // advisor: ClubT.advisor,
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
        // TODO: professor table에서 join하도록 변경
        // ClubT.advisor,
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
        // acc[divId].clubs.push(club);
        acc[divId].clubs.push({ ...club, advisor: "" });
      }
      return acc;
    }, {});
    const result = {
      divisions: Object.values(record),
    };
    return result;
  }
}
