import { Inject, Injectable } from "@nestjs/common";
import { and, eq, gte, isNull, lte, or } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";

import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";
import {
  Department,
  Student,
  StudentT,
  User,
} from "src/drizzle/schema/user.schema";

@Injectable()
export class UserRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

  async findStudentById(studentId: number) {
    const crt = new Date();
    const user = await this.db
      .select({
        name: Student.name,
        email: Student.email,
        department: Department.name,
        studentNumber: Student.number,
        phoneNumber: Student.phoneNumber,
      })
      .from(Student)
      .where(eq(Student.id, studentId))
      .leftJoin(
        StudentT,
        and(
          eq(StudentT.studentId, Student.id),
          lte(StudentT.startTerm, crt),
          or(gte(StudentT.endTerm, crt), isNull(StudentT.endTerm)),
        ),
      )
      .leftJoin(Department, eq(Department.id, StudentT.department));
    return user;
  }

  async create(studentId: number) {
    const user = await this.db
      .select()
      .from(Student)
      .where(eq(Student.id, studentId))
      .leftJoin(User, eq(User.id, Student.userId));
    return user;
  }

  async findUserNameById(userId: number) {
    const userName = await this.db
      .select({ name: User.name })
      .from(User)
      .where(eq(User.id, userId));
    return userName;
  }
}
