import {
  FixtureClassEnum,
  FixtureEvidenceEnum,
  FundingOrderStatusEnum,
  TransportationEnum,
} from "@sparcs-clubs/interface/common/enum/funding.enum";

import { FileDetail } from "@sparcs-clubs/web/common/components/File/attachment";

import { Participant } from "@sparcs-clubs/web/types/participant";

export interface FundingInterface {
  // TODO: files 관련 추가
  purposeId?: string;
  name?: string;
  // TODO: date, amount 컴포넌트 추가되면 date, number로 변경
  expenditureDate?: string;
  expenditureAmount?: string;
  tradeDetailExplanation?: string;

  clubSuppliesName?: string;
  clubSuppliesEvidenceEnumId?: string;
  clubSuppliesClassEnumId?: string;
  clubSuppliesPurpose?: string;
  clubSuppliesSoftwareEvidence?: string;
  // unitInput 추가되면 number로 변경
  numberOfClubSupplies?: string;
  priceOfClubSupplies?: string;

  isFixture: boolean;
  fixtureName?: string;
  fixtureEvidenceEnumId?: string;
  fixtureClassEnumId?: string;
  fixturePurpose?: string;
  fixtureSoftwareEvidence?: string;
  // unitInput 추가되면 number로 변경
  numberOfFixture?: string;
  priceOfFixture?: string;

  isTransportation: boolean;
  transportationEnumId?: string;
  origin?: string;
  destination?: string;
  purposeOfTransportation?: string;
  placeValidity?: string;
  transportationPassengers: Participant[];

  isNonCorporateTransaction: boolean;
  traderName?: string;
  traderAccountNumber?: string;
  wasteExplanation?: string;

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

export interface PastFundingData {
  id: number;
  activityName: string;
  name: string;
  expenditureAmount: number;
  approvedAmount?: number;
}

export interface NewFundingData extends PastFundingData {
  fundingOrderStatusEnumId: FundingOrderStatusEnum;
}

export interface FundingInfo {
  purposeId?: number;
  name: string;
  expenditureDate: Date;
  expenditureAmount: number;
}

export interface BasicEvidence {
  tradeEvidenceFiles: FileDetail[];
  tradeDetailFiles: FileDetail[];
  tradeDetailExplanation: string;
}

export interface AddEvidence {
  // 동아리 용품 증빙
  clubSuppliesName?: string;
  clubSuppliesEvidenceEnumId?: FixtureEvidenceEnum;
  clubSuppliesClassEnumId?: FixtureClassEnum;
  clubSuppliesPurpose?: string;
  clubSuppliesImageFiles: FileDetail[];
  clubSuppliesSoftwareEvidence?: string;
  clubSuppliesSoftwareEvidenceFiles: FileDetail[];
  numberOfClubSupplies?: number;
  priceOfClubSupplies?: number;
  // 비품 증빙
  isFixture: boolean;
  fixtureName?: string;
  fixtureEvidenceEnumId?: FixtureEvidenceEnum;
  fixtureClassEnumId?: FixtureClassEnum;
  fixturePurpose?: string;
  fixtureImageFiles: FileDetail[];
  fixtureSoftwareEvidence?: string;
  fixtureSoftwareEvidenceFiles: FileDetail[];
  numberOfFixture?: number;
  priceOfFixture?: number;
  // 교통비 증빙
  isTransportation: boolean;
  transportationEnumId?: TransportationEnum;
  origin?: string;
  destination?: string;
  purposeOfTransportation?: string;
  placeValidity?: string;
  transportationPassengers: Participant[];
  // 비법인 거래 증빙
  isNonCorporateTransaction: boolean;
  traderName?: string;
  traderAccountNumber?: string;
  wasteExplanation?: string;
  // 식비, 근로 계약, 외부 행사 참가비, 발간물, 수익 사업, 공동 경비, 기타 증빙
  isFoodExpense: boolean;
  isLaborContract: boolean;
  isExternalEventParticipationFee: boolean;
  isPublication: boolean;
  isProfitMakingActivity: boolean;
  isJointExpense: boolean;
  isEtcExpense: boolean;

  foodExpenseExplanation?: string;
  laborContractExplanation?: string;
  externalEventParticipationFeeExplanation?: string;
  publicationExplanation?: string;
  profitMakingActivityExplanation?: string;
  jointExpenseExplanation?: string;
  etcExpenseExplanation?: string;

  foodExpenseFiles: FileDetail[];
  laborContractFiles: FileDetail[];
  externalEventParticipationFeeFiles: FileDetail[];
  publicationFiles: FileDetail[];
  profitMakingActivityFiles: FileDetail[];
  jointExpenseFiles: FileDetail[];
  etcExpenseFiles: FileDetail[];
}

export type FundingFormData = FundingInfo & BasicEvidence & AddEvidence;

export const isActivityReportUnverifiable = (purposeId: number) =>
  purposeId === 0;
