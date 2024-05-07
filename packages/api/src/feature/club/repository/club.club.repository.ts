import { Injectable, Inject } from "@nestjs/common";
import { MySql2Database } from "drizzle-orm/mysql2";
import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";
import { Club, ClubT } from "src/drizzle/schema/club.schema";
import { Division } from "src/drizzle/schema/division.schema";
import { eq } from "drizzle-orm";

const takeUniqueOrThrow = <T>(values: T[]): T => {
  if (values.length !== 1)
    throw new Error("Found non unique or inexistent value");
  return values[0];
};

@Injectable()
export class ClubRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

  async findClubDetailsById(clubId: number) {
    const clubInfo = await this.db
      .select({
        id: Club.id,
        name: Club.name,
        type: ClubT.clubStatusEnumId,
        characteristic: ClubT.characteristicKr,
        advisor: ClubT.advisor,
        description: Club.description,
        foundingYear: Club.foundingYear,
      })
      .from(Club)
      .leftJoin(ClubT, eq(ClubT.id, Club.id))
      .where(eq(Club.id, clubId))
      .limit(1)
      .then(takeUniqueOrThrow);

    // TODO 아래 내용은 division Repository 로 옮겨야 함.
    const divisionName = await this.db
      .select({ divisionName: Division.name })
      .from(Club)
      .leftJoin(Division, eq(Division.id, Club.divisionId))
      .then(takeUniqueOrThrow); // club 이 여러 division 에도 속할 수 있는지?

    return { clubInfo, divisionName };
  }
}
