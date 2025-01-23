import { IFundingComment } from "@sparcs-clubs/interface/api/funding/type/funding.type";
import { FundingStatusEnum } from "@sparcs-clubs/interface/common/enum/funding.enum";

export type FundingCommentDBResult = {
  id: number;
  fundingId: number;
  chargedExecutiveId: number;
  fundingStatusEnum: FundingStatusEnum;
  approvedAmount: number;
  content: string;
  createdAt: Date;
};

export class MFundingComment implements IFundingComment {
  id: number;

  funding: { id: number };

  chargedExecutive: {
    id: number;
  };

  content: string;

  fundingStatusEnum: FundingStatusEnum;

  approvedAmount: number;

  createdAt: Date;

  constructor(data: IFundingComment) {
    Object.assign(this, data);
  }

  static fromDBResult(result: FundingCommentDBResult) {
    return new MFundingComment({
      id: result.id,
      funding: { id: result.fundingId },
      chargedExecutive: {
        id: result.chargedExecutiveId,
      },
      fundingStatusEnum: result.fundingStatusEnum,
      approvedAmount: result.approvedAmount,
      content: result.content,
      createdAt: result.createdAt,
    });
  }
}
