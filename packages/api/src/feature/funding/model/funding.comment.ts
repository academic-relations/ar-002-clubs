import { IFundingComment } from "@sparcs-clubs/interface/api/funding/type/funding.type";

export type FundingCommentDBResult = {
  id: number;
  fundingId: number;
  chargedExecutiveId: number;
  content: string;
  createdAt: Date;
};

export class MFundingComment implements IFundingComment {
  id: number;

  fundingId: number;

  chargedExecutive: {
    id: number;
  };

  content: string;

  createdAt: Date;

  constructor(data: IFundingComment) {
    Object.assign(this, data);
  }

  static fromDBResult(result: FundingCommentDBResult) {
    return new MFundingComment({
      id: result.id,
      fundingId: result.fundingId,
      chargedExecutive: {
        id: result.chargedExecutiveId,
      },
      content: result.content,
      createdAt: result.createdAt,
    });
  }
}
