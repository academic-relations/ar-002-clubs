import { Inject, Injectable } from "@nestjs/common";
import { and, eq, isNull } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";

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

  async selectStudentIdByStudentTId(studentTId: number) {
    const result = await this.db
      .select({ studentId: StudentT.studentId })
      .from(StudentT)
      .where(and(eq(StudentT.id, studentTId), isNull(StudentT.deletedAt)));

    return result;
  }
}
