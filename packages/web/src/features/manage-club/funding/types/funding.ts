export interface FundingInterface {
  // TODO: files 관련 추가
  purposeId?: string;
  name?: string;
  // TODO: date, amount 컴포넌트 추가되면 date, number로 변경
  expenditureDate?: string;
  expenditureAmount?: string;
  tradeDetailExplanation?: string;

  clubSupplies?: {
    clubSuppliesName?: string;
    clubSuppliesEvidenceEnumId?: string;
    clubSuppliesClassEnumId?: string;
    clubSuppliesPurpose?: string;
    clubSuppliesSoftwareEvidence?: string;
    numberOfClubSupplies?: number;
    priceOfClubSupplies?: number;
  };

  isFixture: boolean;
  fixture?: {
    fixtureName?: string;
    fixtureEvidenceEnumId?: string;
    fixtureClassEnumId?: string;
    fixturePurpose?: string;
    fixtureSoftwareEvidence?: string;
    numberOfFixture?: number;
    priceOfFixture?: number;
  };

  isTransportation: boolean;
  transportation?: {
    transportationEnumId?: string;
    origin?: string;
    destination?: string;
    purposeOfTransportation?: string;
    cargoList?: string;
    placeValidity?: string;
    transportationPassengers?: string[];
  };

  isNonCorporateTransaction: boolean;
  nonCorporateTransaction?: {
    traderName?: string;
    traderAccountNumber?: string;
    wasteExplanation?: string;
  };

  isFoodExpense: boolean;
  foodExpenseExplanation?: string;

  isLaborContract: boolean;
  laborContractExplanation?: string;

  isExternalEventParticipationFee: boolean;
  externalEventParticipationFeeExplanation?: string;

  isPublication: boolean;
  publicationExplanation?: string;

  isProfitMakingActivity: boolean;
  profitMakingActivityExplanation?: string;

  isJointExpense: boolean;
  jointExpenseExplanation?: string;

  isEtcExpense: boolean;
  etcExpenseExplanation?: string;
}
