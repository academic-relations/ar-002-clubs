import { Injectable, Inject } from "@nestjs/common";
import { UserRepository } from "@sparcs-clubs/api/common/repository/user.repository";
import { MySql2Database } from "drizzle-orm/mysql2";
import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";

@Injectable()
export class AuthRepository {
  constructor(
    @Inject(DrizzleAsyncProvider) private db: MySql2Database,
    private readonly userRepository: UserRepository,
  ) {}

  async findRolesById(userId: number) {
    this.userRepository.findById(userId);
    const roles = ["student", "executive"];
    return roles;
  }
}
