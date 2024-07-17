import { ApiFnd002ResponseOk } from "@sparcs-clubs/interface/api/funding/endpoint/apiFnd002";
import { FundingOrderStatusEnum } from "@sparcs-clubs/interface/common/enum/funding.enum";

const mockFundingDetail: ApiFnd002ResponseOk = {
  clubId: 1,
  purposeId: 1,
  name: "M1 맥북 Pro 16 inch",
  expenditureDate: new Date(),
  expenditureAmount: 2500000,

  tradeEvidenceFiles: [],
  tradeDetailFiles: [],
  tradeDetailExplanation: "string",

  FundingOrderStatusEnumId: FundingOrderStatusEnum.Applied,
  feedback: "",

  isFixture: false,
  fixtureImageFiles: [],
  fixtureSoftwareEvidenceFiles: [],
  isTransportation: false,
  transportationPassengers: [],

  isNonCorporateTransaction: true,
  traderName: "거래자명",
  traderAccountNumber: "000000000",
  wasteExplanation: "낭비 아니라는 소명",

  isFoodExpense: false,
  isLaborContract: false,
  isExternalEventParticipationFee: false,
  isPublication: false,
  isProfitMakingActivity: false,
  isJointExpense: false,
  isEtcExpense: false,

  foodExpenseFiles: [],
  laborContractFiles: [],
  externalEventParticipationFeeFiles: [],
  publicationFiles: [],
  profitMakingActivityFiles: [],
  jointExpenseFiles: [],
  etcExpenseFiles: [],
  clubSuppliesImageFiles: [],
  clubSuppliesSoftwareEvidenceFiles: [],
};

export default mockFundingDetail;
