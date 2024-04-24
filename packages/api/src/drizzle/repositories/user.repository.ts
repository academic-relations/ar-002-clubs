import { Injectable, Inject } from "@nestjs/common";
import { MySql2Database } from "drizzle-orm/mysql2";
import { eq } from "drizzle-orm";
import { DrizzleAsyncProvider } from "../drizzle.provider";
import { Student, User } from "../schema";

@Injectable()
export class UserRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

  async create(studentId: number) {
    const user = await this.db
      .select()
      .from(Student)
      .where(eq(Student.id, studentId))
      .leftJoin(User, eq(User.id, Student.userId));
    return user;
  }
}
