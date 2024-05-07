import { Injectable, Inject } from "@nestjs/common";
import { MySql2Database } from "drizzle-orm/mysql2";
import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";
import { ClubRepresentativeD } from "src/drizzle/schema/club.schema";
import { eq, and, desc } from "drizzle-orm";
import { User } from "src/drizzle/schema/user.schema";

const takeUniqueOrThrow = <T>(values: T[]): T => {
  if (values.length !== 1)
    throw new Error("Found non unique or inexistent value");
  return values[0];
};

@Injectable()
export class ClubRepresentativeDRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

  // 가장 최근 대표자의 이름을 가져오기
  async findRepresentativeNameByClubId(
    clubId: number,
  ): Promise<{ name: string }> {
    const representative = await this.db
      .select({ name: User.name })
      .from(ClubRepresentativeD)
      .leftJoin(User, eq(User.id, ClubRepresentativeD.studentId))
      .where(
        and(
          eq(ClubRepresentativeD.clubId, clubId),
          eq(ClubRepresentativeD.clubRepresentativeEnum, 1),
        ),
      )
      .orderBy(desc(ClubRepresentativeD.createdAt))
      .limit(1)
      .then(takeUniqueOrThrow);

    return representative; // 또는 then 을 지우고 representativeName[0]
  }
}
