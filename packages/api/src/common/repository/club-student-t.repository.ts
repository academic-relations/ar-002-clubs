import { Injectable, Inject } from "@nestjs/common";
import { MySql2Database } from "drizzle-orm/mysql2";
import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";
import { ClubStudentT } from "src/drizzle/schema/club.schema";
import { and, count, eq } from "drizzle-orm";
import { Student } from "@sparcs-clubs/api/drizzle/schema/user.schema";
import { takeUnique } from "../util/util";

@Injectable()
export class ClubStudentTRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

  async findTotalMemberCnt(
    clubId: number,
  ): Promise<{ totalMemberCnt: number }> {
    const totalMemberCnt = await this.db
      .select({ totalMemberCnt: count() })
      .from(ClubStudentT)
      .where(eq(ClubStudentT.clubId, clubId)) // TODO 현재는 모든 club 회원 수를 반환. 여기 현재 semester만 필터링하는 것도 추가해야 함.
      .then(takeUnique);

    return totalMemberCnt;
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
}
