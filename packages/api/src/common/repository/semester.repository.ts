import { Inject, Injectable } from "@nestjs/common";
import { and, between, isNull, sql } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";

import { DrizzleAsyncProvider } from "@sparcs-clubs/api/drizzle/drizzle.provider";
import { SemesterD } from "@sparcs-clubs/api/drizzle/schema/club.schema";

import { takeUnique } from "../util/util";

@Injectable()
export class SemesterRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

  async findSemesterBetweenstartTermAndendTerm(): Promise<{
    id: number;
    name: string;
    createdAt: Date;
    deletedAt: Date;
    year: number;
    startTerm: Date;
    endTerm: Date;
  }> {
    const result = await this.db
      .select()
      .from(SemesterD)
      .where(
        and(
          between(sql`NOW()`, SemesterD.startTerm, SemesterD.endTerm),
          isNull(SemesterD.deletedAt),
        ),
      )
      .then(takeUnique);
    return result;
  }
}
