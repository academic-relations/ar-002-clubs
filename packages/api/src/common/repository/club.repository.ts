import { Injectable, Inject } from "@nestjs/common";
import { MySql2Database } from "drizzle-orm/mysql2";
import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";
import { Club, ClubT } from "src/drizzle/schema/club.schema";
import { Division } from "src/drizzle/schema/division.schema";
import { eq } from "drizzle-orm";
import { takeUnique } from "@sparcs-clubs/api/common/util/util";

@Injectable()
export class ClubRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

  async findClubDetail(clubId: number) {
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
      .then(takeUnique);

    const divisionName = await this.db
      .select({ name: Division.name })
      .from(Club)
      .leftJoin(Division, eq(Division.id, Club.divisionId))
      .then(takeUnique);
    return { ...clubInfo, divisionName };
  }
}
