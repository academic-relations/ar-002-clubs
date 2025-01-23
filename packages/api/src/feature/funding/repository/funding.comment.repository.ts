import { Inject, Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";

import { DrizzleAsyncProvider } from "@sparcs-clubs/api/drizzle/drizzle.provider";
import { FundingFeedback } from "@sparcs-clubs/api/drizzle/schema/funding.schema";
import { MFundingComment } from "@sparcs-clubs/api/feature/funding/model/funding.comment";

@Injectable()
export default class FundingCommentRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

  async fetchAll(fundingId: number): Promise<MFundingComment[]> {
    const result = await this.db
      .select()
      .from(FundingFeedback)
      .where(eq(FundingFeedback.fundingId, fundingId));

    return result.map(row =>
      MFundingComment.fromDBResult({
        id: row.id,
        fundingId: row.fundingId,
        chargedExecutiveId: row.chargedExecutiveId,
        content: row.feedback,
        createdAt: row.createdAt,
      }),
    );
  }
}
