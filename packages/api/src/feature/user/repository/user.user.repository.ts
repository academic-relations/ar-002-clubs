import { Injectable, Inject } from "@nestjs/common";
import { MySql2Database } from "drizzle-orm/mysql2";
import { eq } from "drizzle-orm";
import { User } from "src/drizzle/schema/user.schema";
import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";

@Injectable()
export class UserRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

  async findUserNameById(userId: number) {
    const userName = await this.db
      .select({ name: User.name })
      .from(User)
      .where(eq(User.id, userId));
    return userName;
  }
}
