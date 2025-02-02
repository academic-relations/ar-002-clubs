import { FundingDeadlineEnum } from "@sparcs-clubs/interface/common/enum/funding.enum";

export const fundingDeadlineEnumToString = (deadline?: FundingDeadlineEnum) => {
  switch (deadline) {
    case FundingDeadlineEnum.Writing:
      return "신청";
    case FundingDeadlineEnum.Revision:
      return "수정";
    case FundingDeadlineEnum.Review:
      return "검토";
    default:
      return "예외";
  }
};
