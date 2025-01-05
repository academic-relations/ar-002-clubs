export type FundingDBResult = {
  fundingOrder: {
    id: number;
    clubId: number;
    purposeId?: number;
    semesterId?: number;
    fundingOrderStatusEnumId?: number;
    name: string;
    expenditureDate: Date;
    expenditureAmount: number;
    approvedAmount?: number;
    createdAt?: Date;
    deletedAt?: Date;
    isFixture: boolean;
    isTransportation: boolean;
    isFoodExpense: boolean;
    isLaborContract: boolean;
    isExternalEventParticipationFee: boolean;
    isPublication: boolean;
    isProfitMakingActivity: boolean;
    isJointExpense: boolean;
    isEtcExpense: boolean;
    isClubSupplies: boolean;
    isNonCorporateTransaction: boolean;
    tradeDetailExplanation: string;
  };
  fundingOrderFeedback?: {
    feedback?: string;
  };
  tradeEvidenceFiles: Array<{ fileId: string }>;
  tradeDetailFiles: Array<{ fileId: string }>;
  clubSuppliesImageFiles?: Array<{ fileId: string }>;
  clubSuppliesSoftwareEvidenceFiles?: Array<{ fileId: string }>;
  fixtureImageFiles?: Array<{ fileId: string }>;
  fixtureSoftwareEvidenceFiles?: Array<{ fileId: string }>;
  foodExpenseFiles?: Array<{ fileId: string }>;
  laborContractFiles?: Array<{ fileId: string }>;
  externalEventParticipationFeeFiles?: Array<{ fileId: string }>;
  publicationFiles?: Array<{ fileId: string }>;
  profitMakingActivityFiles?: Array<{ fileId: string }>;
  jointExpenseFiles?: Array<{ fileId: string }>;
  etcExpenseFiles?: Array<{ fileId: string }>;
  transportationPassengers?: Array<{ studentId: number }>;
};

export class FundingResponseDto {
  id?: number;

  clubId: number;

  purposeId?: number;

  semesterId?: number;

  fundingOrderStatusEnumId?: number;

  name: string;

  expenditureDate: Date;

  expenditureAmount: number;

  approvedAmount?: number;

  feedback?: string;

  createdAt?: Date;

  deletedAt?: Date;

  // Trade related
  tradeDetailExplanation: string;

  tradeEvidenceFiles: Array<{ fileId: string }>;

  tradeDetailFiles: Array<{ fileId: string }>;

  // Fixture related
  isFixture: boolean;

  fixtureName?: string;

  fixtureEvidenceEnumId?: number;

  fixtureClassEnumId?: number;

  fixturePurpose?: string;

  fixtureSoftwareEvidence?: string;

  fixtureImageFiles?: Array<{ fileId: string }>;

  fixtureSoftwareEvidenceFiles?: Array<{ fileId: string }>;

  numberOfFixture?: number;

  priceOfFixture?: number;

  // Transportation related
  isTransportation: boolean;

  transportationEnumId?: number;

  origin?: string;

  destination?: string;

  purposeOfTransportation?: string;

  placeValidity?: string;

  transportationPassengers?: Array<{ studentNumber: string }>;

  // Food expense related
  isFoodExpense: boolean;

  foodExpenseExplanation?: string;

  foodExpenseFiles?: Array<{ fileId: string }>;

  // Club supplies related
  isClubSupplies: boolean;

  clubSuppliesName?: string;

  clubSuppliesEvidenceEnumId?: number;

  clubSuppliesClassEnumId?: number;

  clubSuppliesPurpose?: string;

  clubSuppliesSoftwareEvidence?: string;

  clubSuppliesImageFiles?: Array<{ fileId: string }>;

  clubSuppliesSoftwareEvidenceFiles?: Array<{ fileId: string }>;

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

  laborContractFiles?: Array<{ fileId: string }>;

  // External event participation fee related
  isExternalEventParticipationFee: boolean;

  externalEventParticipationFeeExplanation?: string;

  externalEventParticipationFeeFiles?: Array<{ fileId: string }>;

  // Publication related
  isPublication: boolean;

  publicationExplanation?: string;

  publicationFiles?: Array<{ fileId: string }>;

  // Profit making activity related
  isProfitMakingActivity: boolean;

  profitMakingActivityExplanation?: string;

  profitMakingActivityFiles?: Array<{ fileId: string }>;

  // Joint expense related
  isJointExpense: boolean;

  jointExpenseExplanation?: string;

  jointExpenseFiles?: Array<{ fileId: string }>;

  // Etc expense related
  isEtcExpense: boolean;

  etcExpenseExplanation?: string;

  etcExpenseFiles?: Array<{ fileId: string }>;

  static fromDBResult(data: FundingDBResult): FundingResponseDto {
    const { fundingOrder, fundingOrderFeedback, ...files } = data;

    return {
      id: fundingOrder.id,
      clubId: fundingOrder.clubId,
      purposeId: fundingOrder.purposeId,
      semesterId: fundingOrder.semesterId,
      fundingOrderStatusEnumId: fundingOrder.fundingOrderStatusEnumId,
      name: fundingOrder.name,
      expenditureDate: fundingOrder.expenditureDate,
      expenditureAmount: fundingOrder.expenditureAmount,
      approvedAmount: fundingOrder.approvedAmount,
      feedback: fundingOrderFeedback?.feedback,
      createdAt: fundingOrder.createdAt,
      deletedAt: fundingOrder.deletedAt,
      tradeDetailExplanation: fundingOrder.tradeDetailExplanation,
      tradeEvidenceFiles:
        files.tradeEvidenceFiles?.map(f => ({ fileId: f.fileId })) ?? [],
      tradeDetailFiles:
        files.tradeDetailFiles?.map(f => ({ fileId: f.fileId })) ?? [],

      // boolean flags
      isFixture: fundingOrder.isFixture,
      isTransportation: fundingOrder.isTransportation,
      isFoodExpense: fundingOrder.isFoodExpense,
      isLaborContract: fundingOrder.isLaborContract,
      isExternalEventParticipationFee:
        fundingOrder.isExternalEventParticipationFee,
      isPublication: fundingOrder.isPublication,
      isProfitMakingActivity: fundingOrder.isProfitMakingActivity,
      isJointExpense: fundingOrder.isJointExpense,
      isEtcExpense: fundingOrder.isEtcExpense,
      isClubSupplies: fundingOrder.isClubSupplies,
      isNonCorporateTransaction: fundingOrder.isNonCorporateTransaction,

      // files
      clubSuppliesImageFiles:
        files.clubSuppliesImageFiles?.map(f => ({ fileId: f.fileId })) ?? [],
      clubSuppliesSoftwareEvidenceFiles:
        files.clubSuppliesSoftwareEvidenceFiles?.map(f => ({
          fileId: f.fileId,
        })) ?? [],
      fixtureImageFiles:
        files.fixtureImageFiles?.map(f => ({ fileId: f.fileId })) ?? [],
      fixtureSoftwareEvidenceFiles:
        files.fixtureSoftwareEvidenceFiles?.map(f => ({
          fileId: f.fileId,
        })) ?? [],
      foodExpenseFiles:
        files.foodExpenseFiles?.map(f => ({ fileId: f.fileId })) ?? [],
      laborContractFiles:
        files.laborContractFiles?.map(f => ({ fileId: f.fileId })) ?? [],
      externalEventParticipationFeeFiles:
        files.externalEventParticipationFeeFiles?.map(f => ({
          fileId: f.fileId,
        })) ?? [],
      publicationFiles:
        files.publicationFiles?.map(f => ({ fileId: f.fileId })) ?? [],
      profitMakingActivityFiles:
        files.profitMakingActivityFiles?.map(f => ({
          fileId: f.fileId,
        })) ?? [],
      jointExpenseFiles:
        files.jointExpenseFiles?.map(f => ({ fileId: f.fileId })) ?? [],
      etcExpenseFiles:
        files.etcExpenseFiles?.map(f => ({ fileId: f.fileId })) ?? [],
      transportationPassengers:
        files.transportationPassengers?.map(p => ({
          studentNumber: p.studentId.toString(),
        })) ?? [],
    };
  }
}
