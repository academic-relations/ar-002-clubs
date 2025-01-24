import { Inject, Injectable } from "@nestjs/common";
import { IFundingCommentRequestCreate } from "@sparcs-clubs/interface/api/funding/type/funding.type";
import { eq, ExtractTablesWithRelations } from "drizzle-orm";
import { MySqlTransaction } from "drizzle-orm/mysql-core";
import {
  MySql2Database,
  MySql2PreparedQueryHKT,
  MySql2QueryResultHKT,
} from "drizzle-orm/mysql2";

import {
  DrizzleAsyncProvider,
  DrizzleTransaction,
} from "@sparcs-clubs/api/drizzle/drizzle.provider";
import { FundingFeedback } from "@sparcs-clubs/api/drizzle/schema/funding.schema";
import { MFundingComment } from "@sparcs-clubs/api/feature/funding/model/funding.comment.model";

@Injectable()
export default class FundingCommentRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

  async fetchAll(fundingId: number): Promise<MFundingComment[]> {
    const result = await this.db
      .select()
      .from(FundingFeedback)
      .where(eq(FundingFeedback.fundingId, fundingId));

    return result.map(row => MFundingComment.fromDBResult(row));
  }

  async fetch(
    id: number,
    transaction?: MySqlTransaction<
      MySql2QueryResultHKT,
      MySql2PreparedQueryHKT,
      Record<string, never>,
      ExtractTablesWithRelations<Record<string, never>>
    >,
  ): Promise<MFundingComment> {
    const db = transaction || this.db;

    const result = await db
      .select()
      .from(FundingFeedback)
      .where(eq(FundingFeedback.id, id));

    if (result.length === 0) {
      throw new Error(`Not found: FundingComment with id: ${id}`);
    }
    return MFundingComment.fromDBResult(result[0]);
  }

  async insert(
    param: IFundingCommentRequestCreate,
    transaction?: DrizzleTransaction,
  ): Promise<MFundingComment> {
    const db = transaction || this.db;

    const [comment] = await db
      .insert(FundingFeedback)
      .values({
        ...param,
        fundingId: param.funding.id,
        chargedExecutiveId: param.chargedExecutive.id,
        feedback: param.content,
        createdAt: new Date(),
      })
      .execute();

    const newId = Number(comment.insertId);

    return this.fetch(newId, transaction);
  }
}
