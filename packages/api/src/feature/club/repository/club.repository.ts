import { Inject, Injectable } from "@nestjs/common";
import { ClubTypeEnum } from "@sparcs-clubs/interface/common/enum/club.enum";
import { and, eq, gt, gte, inArray, isNull, lte, or, sql } from "drizzle-orm";
import { union } from "drizzle-orm/mysql-core";
import { MySql2Database } from "drizzle-orm/mysql2";

import { getKSTDate, takeUnique } from "@sparcs-clubs/api/common/util/util";
import {
  Club,
  ClubDelegateD,
  ClubStudentT,
  ClubT,
} from "@sparcs-clubs/api/drizzle/schema/club.schema";
import {
  Division,
  DivisionPermanentClubD,
} from "@sparcs-clubs/api/drizzle/schema/division.schema";
import {
  Professor,
  ProfessorT,
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
    name_kr: string;
    name_en: string;
    isPermanent: boolean;
    characteristic: string;
    representative: string;
    advisor: string;
    totalMemberCnt: number;
  }[];
}

@Injectable()
export default class ClubRepository {
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
        name_kr: Club.name_kr,
        name_en: Club.name_en,
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
          name_kr: Club.name_kr,
          name_en: Club.name_en,
          isPermanent: DivisionPermanentClubD.id,
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
        ClubDelegateD,
        and(
          eq(Club.id, ClubDelegateD.clubId),
          eq(ClubDelegateD.ClubDelegateEnumId, 1),
          or(isNull(ClubDelegateD.endTerm), gte(ClubDelegateD.endTerm, crt)),
        ),
      )
      .leftJoin(Student, eq(ClubDelegateD.studentId, Student.id))
      .leftJoin(
        DivisionPermanentClubD,
        and(
          eq(DivisionPermanentClubD.clubId, Club.id),
          lte(DivisionPermanentClubD.startTerm, crt),
          or(
            gte(DivisionPermanentClubD.endTerm, crt),
            isNull(DivisionPermanentClubD.endTerm),
          ),
        ),
      )
      .groupBy(
        Division.id,
        Division.name,
        Club.id,
        Club.name_kr,
        Club.name_en,
        ClubT.clubStatusEnumId,
        ClubT.characteristicKr,
        Student.name,
        Professor.name,
        DivisionPermanentClubD.id,
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
        acc[divId].clubs.push({
          ...club,
          isPermanent: club.isPermanent !== null,
        });
      }
      return acc;
    }, {});
    const result = {
      divisions: Object.values(record),
    };
    return result;
  }

  async findClubActivities(studentId: number): Promise<{
    clubs: {
      id: number;
      name_kr: string;
      name_en: string;
      dateRange: { startMonth: Date; endMonth: Date | null }[];
    }[];
  }> {
    const clubActivities = await this.db
      .select()
      .from(ClubStudentT)
      .leftJoin(Club, eq(Club.id, ClubStudentT.clubId))
      .where(eq(ClubStudentT.studentId, studentId))
      .then(rows =>
        rows.map(row => ({
          id: row.club_student_t.clubId,
          name_kr: row.club.name_kr,
          name_en: row.club.name_en,
          startMonth: row.club_student_t.startTerm,
          endMonth: row.club_student_t.endTerm,
        })),
      );

    const groupedActivities = clubActivities.reduce(
      (acc, activity) => {
        const {
          id,
          name_kr: nameKr,
          name_en: nameEn,
          startMonth,
          endMonth,
        } = activity;

        if (!acc[id]) {
          Object.assign(acc[id], {
            id,
            name_kr: nameKr,
            name_en: nameEn,
            dateRange: [],
          });
        }

        let updated = false;
        const { dateRange } = acc[id];

        for (let i = 0; i < dateRange.length; i += 1) {
          const dates = dateRange[i];

          if (
            startMonth.getTime() - dates.endMonth.getTime() ===
            24 * 60 * 60 * 1000
          ) {
            dates.endMonth = endMonth;
            updated = true;
            break;
          }
        }

        if (!updated) {
          acc[id].dateRange.push({ startMonth, endMonth });
        }

        return acc;
      },
      {} as {
        [key: number]: {
          id: number;
          name_kr: string;
          name_en: string;
          dateRange: { startMonth: Date; endMonth: Date | null }[];
        };
      },
    );
    return { clubs: Object.values(groupedActivities) };
  }

  async findClubName(
    clubId: number,
  ): Promise<{ name_kr: string; name_en: string }> {
    return this.db
      .select({ name_kr: Club.name_kr, name_en: Club.name_en })
      .from(Club)
      .where(eq(Club.id, clubId))
      .then(result =>
        result[0]
          ? { name_kr: result[0].name_kr, name_en: result[0].name_en }
          : undefined,
      );
  }

  async findClubIdByClubStatusEnumId(
    studentId: number,
    clubStatusEnumIds: Array<ClubTypeEnum>,
    semesterId: number,
  ) {
    const result = await this.db.transaction(async tx => {
      const cur = getKSTDate();
      const delegate = tx
        .select({
          clubId: ClubDelegateD.clubId,
        })
        .from(ClubDelegateD)
        .where(
          and(
            eq(ClubDelegateD.studentId, studentId),
            lte(ClubDelegateD.startTerm, cur),
            or(gte(ClubDelegateD.endTerm, cur), isNull(ClubDelegateD.endTerm)),
            isNull(ClubDelegateD.deletedAt),
          ),
        );
      const professor = tx
        .select({
          id: Professor.id,
          name: Professor.name,
          email: Professor.email,
          professorEnumId: ProfessorT.professorEnum,
        })
        .from(Professor)
        .innerJoin(
          ProfessorT,
          and(
            eq(Professor.id, ProfessorT.professorId),
            lte(ProfessorT.startTerm, cur),
            or(gt(ProfessorT.endTerm, cur), isNull(ProfessorT.endTerm)),
            isNull(ProfessorT.deletedAt),
          ),
        )
        .where(isNull(Professor.deletedAt))
        .as("professor");
      const club = await tx
        .selectDistinct({
          id: Club.id,
          clubNameKr: Club.name_kr,
          clubNameEn: Club.name_en,
          professor: {
            name: professor.name,
            email: professor.email,
            professorEnumId: professor.professorEnumId,
          },
        })
        .from(Club)
        .innerJoin(
          ClubT,
          and(
            eq(Club.id, ClubT.clubId),
            eq(ClubT.semesterId, semesterId),
            isNull(ClubT.deletedAt),
            inArray(ClubT.clubStatusEnumId, clubStatusEnumIds),
          ),
        )
        .leftJoin(professor, eq(professor.id, ClubT.professorId))
        .where(and(inArray(Club.id, delegate), isNull(Club.deletedAt)));
      return club;
    });
    console.log(result);
    return result;
  }

  async findEligibleClubsForRegistration(
    studentId: number,
    semesterId: number,
  ) {
    // 주어진 semesterId를 기준으로 최근 2학기와 3학기를 계산
    const recentTwoSemesters = [semesterId - 1, semesterId];
    const { length } = recentTwoSemesters;
    const recentThreeSemesters = [semesterId - 2, semesterId - 1, semesterId];

    const result = await this.db.transaction(async tx => {
      const cur = getKSTDate();
      const delegate = tx
        .select({
          clubId: ClubDelegateD.clubId,
        })
        .from(ClubDelegateD)
        .where(
          and(
            eq(ClubDelegateD.studentId, studentId),
            lte(ClubDelegateD.startTerm, cur),
            or(gte(ClubDelegateD.endTerm, cur), isNull(ClubDelegateD.endTerm)),
            isNull(ClubDelegateD.deletedAt),
          ),
        );
      // 최근 2학기 동안 가동아리 상태를 유지한 클럽을 조회
      const provisionalClubs = tx
        .select({
          id: Club.id,
        })
        .from(Club)
        .innerJoin(ClubT, eq(Club.id, ClubT.clubId))
        .where(
          and(
            eq(ClubT.clubStatusEnumId, ClubTypeEnum.Provisional), // 가동아리
            inArray(ClubT.semesterId, recentTwoSemesters), // recentTwoSemesters에 포함된 학기 동안
            inArray(Club.id, delegate),
            isNull(ClubT.deletedAt),
          ),
        )
        .groupBy(Club.id)
        .having(sql`COUNT(DISTINCT ${ClubT.semesterId}) = ${length}`);
      // 최근 3학기 중 하나라도 정동아리 상태인 클럽을 조회
      const regularClubs = tx
        .select({
          id: Club.id,
        })
        .from(Club)
        .innerJoin(ClubT, eq(Club.id, ClubT.clubId))
        .where(
          and(
            eq(ClubT.clubStatusEnumId, ClubTypeEnum.Regular), // 정동아리
            inArray(ClubT.semesterId, recentThreeSemesters), // recentThreeSemesters에 포함된 학기 동안
            inArray(Club.id, delegate),
            isNull(ClubT.deletedAt),
          ),
        )
        .groupBy(Club.id);

      const professor = tx
        .select({
          id: Professor.id,
          name: Professor.name,
          email: Professor.email,
          professorEnumId: ProfessorT.professorEnum,
        })
        .from(Professor)
        .innerJoin(
          ProfessorT,
          and(
            eq(Professor.id, ProfessorT.professorId),
            lte(ProfessorT.startTerm, cur),
            or(gt(ProfessorT.endTerm, cur), isNull(ProfessorT.endTerm)),
            isNull(ProfessorT.deletedAt),
          ),
        )
        .where(isNull(Professor.deletedAt))
        .as("professor");

      const sq = union(provisionalClubs, regularClubs);
      const response = await tx
        .selectDistinct({
          id: Club.id,
          clubNameKr: Club.name_kr,
          clubNameEn: Club.name_en,
          professor: {
            name: professor.name,
            email: professor.email,
            professorEnumId: professor.professorEnumId,
          },
        })
        .from(Club)
        .innerJoin(
          ClubT,
          and(
            eq(Club.id, ClubT.clubId),
            inArray(ClubT.clubId, sq),
            lte(ClubT.startTerm, cur),
            isNull(ClubT.deletedAt),
            or(isNull(ClubT.endTerm), gt(ClubT.endTerm, cur)),
          ),
        )
        .leftJoin(professor, eq(professor.id, ClubT.professorId))
        .where(isNull(Club.deletedAt));
      return response;
    });
    return result;
  }
}
