import { Injectable, Inject } from "@nestjs/common";
import { MySql2Database } from "drizzle-orm/mysql2";
import { eq } from "drizzle-orm";
import { Student, User } from "src/drizzle/schema/user.schema";
import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";
import {
  UserTokenDto,
  UserProfileCreateInput,
  UserProfileUpdateInput,
} from "src/common/dto/user.dto";

@Injectable()
export class UserRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

  async findById(userId: number): Promise<UserTokenDto | null> {
    const user = await this.db
      .select()
      .from(User)
      .where(eq(User.id, userId))
      .leftJoin(Student, eq(User.id, Student.userId));
    return user ? this.mapToProfileDto(user[0]) : null;
  }

  async findBySid(sid: string): Promise<UserTokenDto | null> {
    const user = await this.db
      .select()
      .from(User)
      .where(eq(User.sid, sid))
      .leftJoin(Student, eq(User.id, Student.userId));
    return user[0] ? this.mapToProfileDto(user[0]) : null;
  }

  async createUser(user: UserProfileCreateInput): Promise<UserTokenDto> {
    await this.db.insert(User).values(user);
    return this.findBySid(user.sid) as Promise<UserTokenDto>;
  }

  async updateUser(
    userId: number,
    user: UserProfileUpdateInput,
  ): Promise<UserTokenDto> {
    await this.db.update(User).set(user).where(eq(User.id, userId));
    return this.findBySid(user.sid) as Promise<UserTokenDto>;
  }

  private mapToProfileDto(dbRecord): UserTokenDto {
    const { user } = dbRecord;
    return {
      id: user.id,
      sid: user.sid,
      email: user.email,
      name: user.name,
      refreshToken: user.refreshToken,
    };
  }
}
