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
  feedback: "Please review the attached receipts and documents.",
  tradeEvidenceFiles: [
    { uid: "trade1", link: "https://example.com/trade1.pdf" },
  ],
  tradeDetailFiles: [
    { uid: "detail1", link: "https://example.com/detail1.pdf" },
  ],
  tradeDetailExplanation: "Details regarding the trades done for event.",

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
  origin: "Campus",
  destination: "Conference Center",
  purposeOfTransportation: "Attend conference",
  cargoList: "Equipment, Supplies",
  placeValidity: "Confirmed reservation",
  transportationPassengers: [
    { studentNumber: "1001", name: "John Doe" },
    { studentNumber: "1002", name: "Jane Doe" },
  ],

  isNonCorporateTransaction: true,
  traderName: "Independent Trader Joe",
  traderAccountNumber: "123456789",
  wasteExplanation: "Miscellaneous expenses not categorized elsewhere",

  isFoodExpense: true,
  isLaborContract: true,
  isExternalEventParticipationFee: true,
  isPublication: true,
  isProfitMakingActivity: true,
  isJointExpense: true,
  isEtcExpense: true,

  foodExpenseExplanation: "Catering for the event",
  laborContractExplanation: "Temporary staff for the event setup",
  externalEventParticipationFeeExplanation:
    "Fee for participating in the external tech fest",
  publicationExplanation:
    "Printing materials for the club's promotional activities",
  profitMakingActivityExplanation: "Sales from club merchandise",
  jointExpenseExplanation:
    "Joint funding with another club for a combined event",
  etcExpenseExplanation: "Other minor expenses",

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
