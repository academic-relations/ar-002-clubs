import { Injectable, Inject } from "@nestjs/common";
import { MySql2Database } from "drizzle-orm/mysql2";
import { DrizzleAsyncProvider } from "src/drizzle/drizzle.provider";
import { eq, and, lte, gte, or, isNull } from "drizzle-orm";
import { DivisionPermanentClubD } from "@sparcs-clubs/api/drizzle/schema/division.schema";

@Injectable()
export class DivisionPermanentClubDRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

  async findPermenantClub(
    clubId: number,
    startTerm: Date,
    endTerm: Date,
  ): Promise<boolean> {
    return this.db
      .select({ id: DivisionPermanentClubD.id })
      .from(DivisionPermanentClubD)
      .where(
        and(
          eq(DivisionPermanentClubD.clubId, clubId),
          lte(DivisionPermanentClubD.startTerm, startTerm),
          or(
            gte(DivisionPermanentClubD.endTerm, endTerm),
            isNull(DivisionPermanentClubD.endTerm),
          ),
        ),
      )
      .then(result => result.length > 0);
  }
}