import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";

import { DrizzleAsyncProvider } from "@sparcs-clubs/api/drizzle/drizzle.provider";
import { Student } from "@sparcs-clubs/api/drizzle/schema/user.schema";

@Injectable()
export class StudentRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

  async findStudentById(studentId: number) {
    const student = await this.db
      .select()
      .from(Student)
      .where(eq(Student.id, studentId));
    if (student.length !== 1) {
      throw new HttpException("Student Doesn't exist", HttpStatus.NOT_FOUND);
    }
    return student[0];
  }
}
