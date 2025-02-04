import { Injectable } from "@nestjs/common";

import { IFundingCommentRequest } from "@sparcs-clubs/interface/api/funding/type/funding.comment.type";
import { eq } from "drizzle-orm";

import { BaseRepository } from "@sparcs-clubs/api/common/repository/base.repository";
import { DrizzleTransaction } from "@sparcs-clubs/api/drizzle/drizzle.provider";
import { FundingFeedback } from "@sparcs-clubs/api/drizzle/schema/funding.schema";
import {
  FundingCommentDbResult,
  MFundingComment,
} from "@sparcs-clubs/api/feature/funding/model/funding.comment.model";

@Injectable()
export default class FundingCommentRepository extends BaseRepository<
  MFundingComment,
  IFundingCommentRequest,
  FundingCommentDbResult,
  typeof FundingFeedback
> {
  constructor() {
    super(FundingFeedback, MFundingComment);
  }

  async fetchAllTx(
    tx: DrizzleTransaction,
    ids: number[],
  ): Promise<MFundingComment[]>;
  async fetchAllTx(
    tx: DrizzleTransaction,
    fundingId: number,
  ): Promise<MFundingComment[]>;
  async fetchAllTx(
    tx: DrizzleTransaction,
    arg1: number | number[],
  ): Promise<MFundingComment[]> {
    if (Array.isArray(arg1)) {
      return super.fetchAllTx(tx, arg1);
    }

    const result = await tx
      .select()
      .from(FundingFeedback)
      .where(eq(FundingFeedback.fundingId, arg1));

    return result.map(row => MFundingComment.from(row));
  }

  async fetchAll(fundingId: number): Promise<MFundingComment[]>;
  async fetchAll(ids: number[]): Promise<MFundingComment[]>;
  async fetchAll(arg1: number | number[]): Promise<MFundingComment[]> {
    if (Array.isArray(arg1)) {
      return super.fetchAll(arg1);
    }

    return this.withTransaction(async tx => this.fetchAllTx(tx, arg1));
  }

  async insertTx(
    tx: DrizzleTransaction,
    param: IFundingCommentRequest,
  ): Promise<MFundingComment> {
    const comment = {
      ...param,
      fundingId: param.funding.id,
      chargedExecutiveId: param.chargedExecutive.id,
      feedback: param.content,
    };
    return super.insertTx(tx, comment);
  }
}
