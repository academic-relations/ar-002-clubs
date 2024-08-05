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
  fundingOrderStatusEnumId: FundingOrderStatusEnum.Applied,
  feedback: "피드백",
  tradeEvidenceFiles: [
    {
      id: "trade1",
      link: "https://example.com/trade1.pdf",
      name: "trade1.pdf",
    },
  ],
  tradeDetailFiles: [
    {
      id: "detail1",
      link: "https://example.com/detail1.pdf",
      name: "detail1.pdf",
    },
  ],
  tradeDetailExplanation: "이벤트를 위한 거래에 대한 세부 정보입니다.",

  clubSuppliesName: "맥북",
  clubSuppliesEvidenceEnumId: FixtureEvidenceEnum.Purchase,
  clubSuppliesClassEnumId: FixtureClassEnum.Electronics,
  clubSuppliesPurpose: "물품 사용 목적을 포함한 어떠한 머시꺵이",
  clubSuppliesImageFiles: [
    {
      id: "supplies1",
      link: "https://example.com/supplies1.jpg",
      name: "supplies1.jpg",
    },
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
    {
      id: "fixture1",
      link: "https://example.com/fixture1.jpg",
      name: "fixture1.jpg",
    },
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

  foodExpenseFiles: [
    { id: "food1", link: "https://example.com/food1.pdf", name: "food1.pdf" },
  ],
  laborContractFiles: [
    {
      id: "labor1",
      link: "https://example.com/labor1.pdf",
      name: "labor1.pdf",
    },
  ],
  externalEventParticipationFeeFiles: [
    {
      id: "event1",
      link: "https://example.com/event1.pdf",
      name: "event1.pdf",
    },
  ],
  publicationFiles: [
    { id: "pub1", link: "https://example.com/pub1.pdf", name: "pub1.pdf" },
  ],
  profitMakingActivityFiles: [
    {
      id: "profit1",
      link: "https://example.com/profit1.pdf",
      name: "profit1.pdf",
    },
  ],
  jointExpenseFiles: [
    {
      id: "joint1",
      link: "https://example.com/joint1.pdf",
      name: "joint1.pdf",
    },
  ],
  etcExpenseFiles: [
    { id: "etc1", link: "https://example.com/etc1.pdf", name: "etc1.pdf" },
  ],
};

export default mockFundingDetail;
