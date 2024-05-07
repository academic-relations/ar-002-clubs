import { Injectable, Inject } from "@nestjs/common";
import { MySql2Database } from "drizzle-orm/mysql2";
import { eq } from "drizzle-orm";
import { Student, User } from "src/drizzle/schema/user.schema";
import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";
import {
  UserDto,
  UserProfileCreateInput,
  UserProfileUpdateInput,
} from "src/common/dto/user.dto";

@Injectable()
export class UserRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

  async findById(userId: number): Promise<UserDto | null> {
    const user = await this.db
      .select()
      .from(User)
      .where(eq(User.id, userId))
      .leftJoin(Student, eq(User.id, Student.userId));
    return user ? this.mapToUserDto(user[0]) : null;
  }

  async findBySid(sid: string): Promise<UserDto | null> {
    const user = await this.db
      .select()
      .from(User)
      .where(eq(User.sid, sid))
      .leftJoin(Student, eq(User.id, Student.userId));
    return user[0] ? this.mapToUserDto(user[0]) : null;
  }

  // TODO: 임시 로직이므로 실제 정보를 받아오도록 수정 필요
  async findAllProfileInfoBySid(sid: string): Promise<UserDto | null> {
    const user = await this.db
      .select()
      .from(User)
      .where(eq(User.sid, sid))
      .leftJoin(Student, eq(User.id, Student.userId));
    return user[0] ? this.mapToUserDto(user[0]) : null;
  }

  async createUser(user: UserProfileCreateInput): Promise<UserDto> {
    await this.db.insert(User).values(user);
    return this.findBySid(user.sid) as Promise<UserDto>;
  }

  async updateUser(
    userId: number,
    user: UserProfileUpdateInput,
  ): Promise<UserDto> {
    await this.db.update(User).set(user).where(eq(User.id, userId));
    return this.findBySid(user.sid) as Promise<UserDto>;
  }

  // TODO: 임시 로직이므로 실제 학번 정보를 받아서 입력하도록수정 필요
  private mapToUserDto(dbRecord): UserDto {
    const { user } = dbRecord;
    return {
      id: user.id,
      sid: user.sid,
      email: user.email,
      name: user.name,
      phoneNumber: user.phoneNumber,
      refreshToken: user.refreshToken,
      // 이 부분에 대한 수정 필요
      role: "student",
      studentId: 1,
      studentNumber: 20210227,
    };
  }
}
