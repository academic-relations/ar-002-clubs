import { Injectable, Inject } from "@nestjs/common";
import { MySql2Database } from "drizzle-orm/mysql2";
import { eq } from "drizzle-orm";
import { Student, User } from "src/drizzle/schema/user.schema";
import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";

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

  async findUserNameById(userId: number) {
    const userName = await this.db
      .select({ name: User.name })
      .from(User)
      .where(eq(User.id, userId));
    return userName;
  }
}
