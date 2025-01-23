import { IFundingDeadline } from "@sparcs-clubs/interface/api/funding/type/funding.deadline.type";
import { FundingDeadlineEnum } from "@sparcs-clubs/interface/common/enum/funding.enum";

export class MFundingDeadline implements IFundingDeadline {
  id: number;

  deadlineEnum: FundingDeadlineEnum;

  startDate: Date;

  endDate: Date;

  createdAt: Date;

  deletedAt: Date | null;

  constructor(data: IFundingDeadline) {
    Object.assign(this, data);
  }
}
