import { Inject, Injectable } from "@nestjs/common";
import { and, count, desc, eq, gte, isNull, lte, or } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";

import { takeUnique } from "@sparcs-clubs/api/common/util/util";
import { DrizzleAsyncProvider } from "@sparcs-clubs/api/drizzle/drizzle.provider";

import { Student } from "@sparcs-clubs/api/drizzle/schema/user.schema";
import { Club, ClubStudentT, SemesterD } from "src/drizzle/schema/club.schema";

@Injectable()
export default class ClubStudentTRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

  async findByClubIdAndSemesterId(clubId: number, semesterId: number) {
    const result = await this.db
      .select()
      .from(ClubStudentT)
      .where(
        and(
          eq(ClubStudentT.clubId, clubId),
          eq(ClubStudentT.semesterId, semesterId),
          isNull(ClubStudentT.deletedAt),
        ),
      );

    return result;
  }

  // 아래는 common 폴더에 있던 club.club-student-t.repository.ts를 그대로 옮겨온 메소드들입니다.
  async findTotalMemberCnt(
    clubId: number,
    semesterId?: number,
  ): Promise<number> {
    const today = new Date();

    const totalMemberCnt = await this.db
      .select({ totalMemberCnt: count() })
      .from(ClubStudentT)
      .where(
        and(
          eq(ClubStudentT.clubId, clubId),
          semesterId
            ? eq(ClubStudentT.semesterId, semesterId)
            : and(
                lte(ClubStudentT.startTerm, today),
                or(
                  gte(ClubStudentT.endTerm, today),
                  eq(ClubStudentT.endTerm, null),
                ),
              ),
        ),
      )
      .then(result => result[0].totalMemberCnt);
    return totalMemberCnt;
  }

  async findStudentSemester(studentId: number) {
    return this.db
      .select({
        id: SemesterD.id,
        name: SemesterD.name,
        year: SemesterD.year,
        startTerm: SemesterD.startTerm,
        endTerm: SemesterD.endTerm,
        clubs: { id: ClubStudentT.clubId },
      })
      .from(ClubStudentT)
      .leftJoin(SemesterD, eq(SemesterD.id, ClubStudentT.semesterId))
      .where(eq(ClubStudentT.studentId, studentId))
      .orderBy(desc(SemesterD.id))
      .then(result =>
        result.map(row => ({
          id: row.id,
          name: `${row.year} ${row.name}`,
          startTerm: row.startTerm,
          endTerm: row.endTerm,
          clubs: [{ id: row.clubs.id }],
        })),
      );
  }

  async findClubStudentByClubIdAndStudentId(
    clubId: number,
    studentId: number,
  ): Promise<{
    club_student_id: number;
    student_id: number;
    club_id: number;
    name: string;
    phoneNumber: string;
    email: string;
  }> {
    const student = await this.db
      .select({
        club_student_id: ClubStudentT.id,
        student_id: Student.id,
        club_id: ClubStudentT.clubId,
        name: Student.name,
        phoneNumber: Student.phoneNumber,
        email: Student.email,
      })
      .from(ClubStudentT)
      .leftJoin(Student, eq(Student.id, studentId))
      .where(
        and(
          eq(ClubStudentT.clubId, clubId),
          eq(ClubStudentT.studentId, studentId),
        ),
      )
      .then(takeUnique);
    // Todo: 현재 학기에 활동 중인지 필터링 해야함.
    return student;
  }

  async getClubsByStudentId(studentId: number) {
    const today = new Date();
    const clubs = await this.db
      .select({
        id: ClubStudentT.clubId,
        name: Club.name,
      })
      .from(ClubStudentT)
      .leftJoin(Club, eq(Club.id, ClubStudentT.clubId))
      .where(
        and(
          eq(ClubStudentT.studentId, studentId),
          lte(ClubStudentT.startTerm, today),
          or(gte(ClubStudentT.endTerm, today), eq(ClubStudentT.endTerm, null)),
        ),
      );
    return clubs;
  }
}
