export class FundingResponseDto {
  id?: number;

  clubId: number;

  purposeId?: number;

  semesterId?: number;

  fundingOrderStatusEnumId: number;

  name: string;

  expenditureDate: Date;

  expenditureAmount: number;

  approvedAmount?: number;

  feedback?: string;

  createdAt?: Date;

  deletedAt?: Date;

  // Trade related
  tradeDetailExplanation: string;

  tradeEvidenceFiles: Array<{ fileId: string; name: string; link: string }>;

  tradeDetailFiles: Array<{ fileId: string; name: string; link: string }>;

  // Fixture related
  isFixture: boolean;

  fixtureName?: string;

  fixtureEvidenceEnumId?: number;

  fixtureClassEnumId?: number;

  fixturePurpose?: string;

  fixtureSoftwareEvidence?: string;

  fixtureImageFiles?: Array<{ fileId: string; name: string; link: string }>;

  fixtureSoftwareEvidenceFiles?: Array<{
    fileId: string;
    name: string;
    link: string;
  }>;

  numberOfFixture?: number;

  priceOfFixture?: number;

  // Transportation related
  isTransportation: boolean;

  transportationEnumId?: number;

  origin?: string;

  destination?: string;

  purposeOfTransportation?: string;

  placeValidity?: string;

  transportationPassengers?: Array<{
    name: string;
    studentNumber: string;
    studentId: number;
  }>;

  // Food expense related
  isFoodExpense: boolean;

  foodExpenseExplanation?: string;

  foodExpenseFiles?: Array<{ fileId: string; name: string; link: string }>;

  // Club supplies related
  isClubSupplies: boolean;

  clubSuppliesName?: string;

  clubSuppliesEvidenceEnumId?: number;

  clubSuppliesClassEnumId?: number;

  clubSuppliesPurpose?: string;

  clubSuppliesSoftwareEvidence?: string;

  clubSuppliesImageFiles?: Array<{
    fileId: string;
    name: string;
    link: string;
  }>;

  clubSuppliesSoftwareEvidenceFiles?: Array<{
    fileId: string;
    name: string;
    link: string;
  }>;

  numberOfClubSupplies?: number;

  priceOfClubSupplies?: number;

  // Non-corporate transaction related
  isNonCorporateTransaction: boolean;

  traderName?: string;

  traderAccountNumber?: string;

  wasteExplanation?: string;

  // Labor contract related
  isLaborContract: boolean;

  laborContractExplanation?: string;

  laborContractFiles?: Array<{ fileId: string; name: string; link: string }>;

  // External event participation fee related
  isExternalEventParticipationFee: boolean;

  externalEventParticipationFeeExplanation?: string;

  externalEventParticipationFeeFiles?: Array<{
    fileId: string;
    name: string;
    link: string;
  }>;

  // Publication related
  isPublication: boolean;

  publicationExplanation?: string;

  publicationFiles?: Array<{ fileId: string; name: string; link: string }>;

  // Profit making activity related
  isProfitMakingActivity: boolean;

  profitMakingActivityExplanation?: string;

  profitMakingActivityFiles?: Array<{
    fileId: string;
    name: string;
    link: string;
  }>;

  // Joint expense related
  isJointExpense: boolean;

  jointExpenseExplanation?: string;

  jointExpenseFiles?: Array<{ fileId: string; name: string; link: string }>;

  // Etc expense related
  isEtcExpense: boolean;

  etcExpenseExplanation?: string;

  etcExpenseFiles?: Array<{ fileId: string; name: string; link: string }>;
}
