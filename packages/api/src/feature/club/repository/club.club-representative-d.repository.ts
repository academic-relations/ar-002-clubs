import { Injectable, Inject } from "@nestjs/common";
import { MySql2Database } from "drizzle-orm/mysql2";
import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";
import { ClubRepresentativeD } from "src/drizzle/schema/club.schema";
import { User } from "src/drizzle/schema/user.schema";
import { eq, and, lte, gte, or, isNull } from "drizzle-orm";
import { getKSTDate, takeUnique } from "src/common/util/util";

@Injectable()
export class ClubRepresentativeDRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

  // 가장 최근 대표자의 이름을 가져오기
  async findRepresentativeName(
    clubId: number,
    startTerm?: Date,
    endTerm?: Date,
  ): Promise<{ name: string }> {
    const currentDate = getKSTDate();

    const representative = await this.db
      .select({ name: User.name })
      .from(ClubRepresentativeD)
      .leftJoin(User, eq(User.id, ClubRepresentativeD.studentId))
      .where(
        and(
          eq(ClubRepresentativeD.clubId, clubId),
          eq(ClubRepresentativeD.clubRepresentativeEnum, 1),
          lte(ClubRepresentativeD.startTerm, startTerm || currentDate),
          or(
            gte(ClubRepresentativeD.endTerm, endTerm || currentDate),
            isNull(ClubRepresentativeD.endTerm),
          ),
        ),
      )
      .orderBy(ClubRepresentativeD.endTerm)
      .limit(1)
      .then(takeUnique);

    return representative;
  }
}
