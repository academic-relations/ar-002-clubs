import { ApiFnd002ResponseOk } from "@sparcs-clubs/interface/api/funding/endpoint/apiFnd002";
import {
  FixtureClassEnum,
  FixtureEvidenceEnum,
  FundingOrderStatusEnum,
  TransportationEnum,
} from "@sparcs-clubs/interface/common/enum/funding.enum";

const mockFundingDetail: ApiFnd002ResponseOk = {
  clubId: 1,
  purposeId: 0,
  name: "M1 맥북 Pro 16 inch",
  expenditureDate: new Date(),
  expenditureAmount: 2500000,
  FundingOrderStatusEnumId: FundingOrderStatusEnum.Applied,
  feedback: "피드백",
  tradeEvidenceFiles: [
    { uid: "trade1", link: "https://example.com/trade1.pdf" },
  ],
  tradeDetailFiles: [
    { uid: "detail1", link: "https://example.com/detail1.pdf" },
  ],
  tradeDetailExplanation: "이벤트를 위한 거래에 대한 세부 정보입니다.",

  clubSuppliesName: "맥북",
  clubSuppliesEvidenceEnumId: FixtureEvidenceEnum.Purchase,
  clubSuppliesClassEnumId: FixtureClassEnum.Electronics,
  clubSuppliesPurpose: "물품 사용 목적을 포함한 어떠한 머시꺵이",
  clubSuppliesImageFiles: [
    { uid: "supplies1", link: "https://example.com/supplies1.jpg" },
  ],
  clubSuppliesSoftwareEvidence: "N/A",
  clubSuppliesSoftwareEvidenceFiles: [],
  numberOfClubSupplies: 50,
  priceOfClubSupplies: 200,

  isFixture: true,
  fixtureName: "A4 종이",
  fixtureEvidenceEnumId: FixtureEvidenceEnum.Management,
  fixtureClassEnumId: FixtureClassEnum.Others,
  fixturePurpose: "비품 사용 목적을 포함한 어떠한 머시꺵이",
  fixtureImageFiles: [
    { uid: "fixture1", link: "https://example.com/fixture1.jpg" },
  ],
  fixtureSoftwareEvidence: "N/A",
  fixtureSoftwareEvidenceFiles: [],
  numberOfFixture: 2,
  priceOfFixture: 300,

  isTransportation: true,
  transportationEnumId: TransportationEnum.Airplane,
  origin: "서울역",
  destination: "대전역",
  purposeOfTransportation: "해커톤 장소 사전답사",
  placeValidity: "",
  transportationPassengers: [
    { studentNumber: "20200000", name: "이도라" },
    { studentNumber: "20200000", name: "이도라" },
    { studentNumber: "20200000", name: "이도라" },
    { studentNumber: "20200000", name: "이도라" },
  ],

  isNonCorporateTransaction: true,
  traderName: "이도라",
  traderAccountNumber: "123456789",
  wasteExplanation: "낭비아님소명",

  isFoodExpense: true,
  isLaborContract: true,
  isExternalEventParticipationFee: true,
  isPublication: true,
  isProfitMakingActivity: true,
  isJointExpense: true,
  isEtcExpense: true,

  foodExpenseExplanation: "어떠한 설명",
  laborContractExplanation: "어떠한 설명",
  externalEventParticipationFeeExplanation: "어떠한 설명",
  publicationExplanation: "어떠한 설명",
  profitMakingActivityExplanation: "어떠한 설명",
  jointExpenseExplanation: "어떠한 설명",
  etcExpenseExplanation: "어떠한 설명",

  foodExpenseFiles: [{ uid: "food1", link: "https://example.com/food1.pdf" }],
  laborContractFiles: [
    { uid: "labor1", link: "https://example.com/labor1.pdf" },
  ],
  externalEventParticipationFeeFiles: [
    { uid: "event1", link: "https://example.com/event1.pdf" },
  ],
  publicationFiles: [{ uid: "pub1", link: "https://example.com/pub1.pdf" }],
  profitMakingActivityFiles: [
    { uid: "profit1", link: "https://example.com/profit1.pdf" },
  ],
  jointExpenseFiles: [
    { uid: "joint1", link: "https://example.com/joint1.pdf" },
  ],
  etcExpenseFiles: [{ uid: "etc1", link: "https://example.com/etc1.pdf" }],
};

export default mockFundingDetail;
