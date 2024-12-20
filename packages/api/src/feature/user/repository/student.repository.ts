import { Inject, Injectable } from "@nestjs/common";
import { StudentStatusEnum } from "@sparcs-clubs/interface/common/enum/user.enum";
import { and, count, eq, gte, isNull, lte, or } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";

import { getKSTDate, takeUnique } from "@sparcs-clubs/api/common/util/util";
import { DrizzleAsyncProvider } from "@sparcs-clubs/api/drizzle/drizzle.provider";
import {
  Student,
  StudentT,
} from "@sparcs-clubs/api/drizzle/schema/user.schema";

@Injectable()
export class StudentRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

  async selectStudentById(id: number) {
    const result = await this.db
      .select()
      .from(Student)
      .where(and(eq(Student.id, id), isNull(Student.deletedAt)));

    return result;
  }

  async isNotgraduateStudent(
    studentId: number,
    semesterId: number,
  ): Promise<boolean> {
    const leaveOfAbsence = StudentStatusEnum.LeaveOfAbsence;
    const attending = StudentStatusEnum.Attending;
    const { isAvailable } = await this.db
      .select({ isAvailable: count(StudentT.id) })
      .from(StudentT)
      .where(
        and(
          eq(StudentT.semesterId, semesterId),
          eq(StudentT.studentId, studentId),
          or(
            eq(StudentT.studentStatusEnum, attending),
            eq(StudentT.studentStatusEnum, leaveOfAbsence),
          ),
        ),
      )
      .then(takeUnique);
    if (isAvailable !== 0) {
      return true;
    }
    return false;
  }

  async selectStudentIdByStudentTId(studentTId: number) {
    const result = await this.db
      .select({ studentId: StudentT.studentId })
      .from(StudentT)
      .where(and(eq(StudentT.id, studentTId), isNull(StudentT.deletedAt)));

    return result;
  }

  async getStudentPhoneNumber(id: number) {
    const crt = getKSTDate();
    const result = await this.db
      .select({ phoneNumber: Student.phoneNumber })
      .from(Student)
      .where(eq(Student.userId, id))
      .leftJoin(
        StudentT,
        and(
          eq(StudentT.studentId, Student.id),
          or(gte(StudentT.endTerm, crt), isNull(StudentT.endTerm)),
          lte(StudentT.startTerm, crt),
          isNull(StudentT.deletedAt),
        ),
      )
      .then(takeUnique);
    return result;
  }

  async updateStudentPhoneNumber(id: number, phoneNumber: string) {
    const isUpdateSucceed = await this.db.transaction(async tx => {
      const [result] = await tx
        .update(Student)
        .set({ phoneNumber })
        .where(and(eq(Student.id, id), isNull(Student.deletedAt)));
      if (result.affectedRows === 0) {
        tx.rollback();
        return false;
      }
      return true;
    });
    return isUpdateSucceed;
  }
}
