import { Inject, Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";

import { IFundingCommentRequestCreate } from "@sparcs-clubs/interface/api/funding/type/funding.type";

import {
  DrizzleAsyncProvider,
  DrizzleTransaction,
} from "@sparcs-clubs/api/drizzle/drizzle.provider";
import { FundingFeedback } from "@sparcs-clubs/api/drizzle/schema/funding.schema";
import { MFundingComment } from "@sparcs-clubs/api/feature/funding/model/funding.comment.model";

@Injectable()
export default class FundingCommentRepository {
  constructor(@Inject(DrizzleAsyncProvider) private db: MySql2Database) {}

  // WARD: Transaction
  async withTransaction<T>(
    callback: (tx: DrizzleTransaction) => Promise<T>,
  ): Promise<T> {
    return this.db.transaction(callback);
  }

  async fetchAll(fundingId: number): Promise<MFundingComment[]> {
    return this.db.transaction(async tx => this.fetchAllTx(tx, fundingId));
  }

  async fetchAllTx(
    tx: DrizzleTransaction,
    fundingId: number,
  ): Promise<MFundingComment[]> {
    const result = await tx
      .select()
      .from(FundingFeedback)
      .where(eq(FundingFeedback.fundingId, fundingId));

    return result.map(row => MFundingComment.fromDBResult(row));
  }

  async fetch(id: number): Promise<MFundingComment> {
    return this.db.transaction(async tx => this.fetchTx(tx, id));
  }

  async fetchTx(tx: DrizzleTransaction, id: number): Promise<MFundingComment> {
    const result = await tx
      .select()
      .from(FundingFeedback)
      .where(eq(FundingFeedback.id, id));

    if (result.length === 0) {
      throw new Error(`Not found: FundingComment with id: ${id}`);
    }
    return MFundingComment.fromDBResult(result[0]);
  }

  async insert(param: IFundingCommentRequestCreate): Promise<MFundingComment> {
    return this.db.transaction(async tx => this.insertTx(tx, param));
  }

  async insertTx(
    tx: DrizzleTransaction,
    param: IFundingCommentRequestCreate,
  ): Promise<MFundingComment> {
    const [comment] = await tx
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

    return this.fetchTx(tx, newId);
  }
}
