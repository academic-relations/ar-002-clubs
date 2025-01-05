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
  tradeEvidenceFiles: Array<{ fileId: string; name?: string; link?: string }>;
  tradeDetailFiles: Array<{ fileId: string; name?: string; link?: string }>;
  clubSuppliesImageFiles?: Array<{
    fileId: string;
    name?: string;
    link?: string;
  }>;
  clubSuppliesSoftwareEvidenceFiles?: Array<{
    fileId: string;
    name?: string;
    link?: string;
  }>;
  fixtureImageFiles?: Array<{ fileId: string; name?: string; link?: string }>;
  fixtureSoftwareEvidenceFiles?: Array<{
    fileId: string;
    name?: string;
    link?: string;
  }>;
  foodExpenseFiles?: Array<{ fileId: string; name?: string; link?: string }>;
  laborContractFiles?: Array<{ fileId: string; name?: string; link?: string }>;
  externalEventParticipationFeeFiles?: Array<{
    fileId: string;
    name?: string;
    link?: string;
  }>;
  publicationFiles?: Array<{ fileId: string; name?: string; link?: string }>;
  profitMakingActivityFiles?: Array<{
    fileId: string;
    name?: string;
    link?: string;
  }>;
  jointExpenseFiles?: Array<{ fileId: string; name?: string; link?: string }>;
  etcExpenseFiles?: Array<{ fileId: string; name?: string; link?: string }>;
  transportationPassengers?: Array<{
    studentId: number;
  }>;
};

export class FundingDto {
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

  tradeEvidenceFiles: Array<{ fileId: string; name?: string; link?: string }>;

  tradeDetailFiles: Array<{ fileId: string; name?: string; link?: string }>;

  // Fixture related
  isFixture: boolean;

  fixtureName?: string;

  fixtureEvidenceEnumId?: number;

  fixtureClassEnumId?: number;

  fixturePurpose?: string;

  fixtureSoftwareEvidence?: string;

  fixtureImageFiles?: Array<{ fileId: string; name?: string; link?: string }>;

  fixtureSoftwareEvidenceFiles?: Array<{
    fileId: string;
    name?: string;
    link?: string;
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
    studentId: number;
  }>;

  // Food expense related
  isFoodExpense: boolean;

  foodExpenseExplanation?: string;

  foodExpenseFiles?: Array<{ fileId: string; name?: string; link?: string }>;

  // Club supplies related
  isClubSupplies: boolean;

  clubSuppliesName?: string;

  clubSuppliesEvidenceEnumId?: number;

  clubSuppliesClassEnumId?: number;

  clubSuppliesPurpose?: string;

  clubSuppliesSoftwareEvidence?: string;

  clubSuppliesImageFiles?: Array<{
    fileId: string;
    name?: string;
    link?: string;
  }>;

  clubSuppliesSoftwareEvidenceFiles?: Array<{
    fileId: string;
    name?: string;
    link?: string;
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

  laborContractFiles?: Array<{ fileId: string; name?: string; link?: string }>;

  // External event participation fee related
  isExternalEventParticipationFee: boolean;

  externalEventParticipationFeeExplanation?: string;

  externalEventParticipationFeeFiles?: Array<{
    fileId: string;
    name?: string;
    link?: string;
  }>;

  // Publication related
  isPublication: boolean;

  publicationExplanation?: string;

  publicationFiles?: Array<{ fileId: string; name?: string; link?: string }>;

  // Profit making activity related
  isProfitMakingActivity: boolean;

  profitMakingActivityExplanation?: string;

  profitMakingActivityFiles?: Array<{
    fileId: string;
    name?: string;
    link?: string;
  }>;

  // Joint expense related
  isJointExpense: boolean;

  jointExpenseExplanation?: string;

  jointExpenseFiles?: Array<{ fileId: string; name?: string; link?: string }>;

  // Etc expense related
  isEtcExpense: boolean;

  etcExpenseExplanation?: string;

  etcExpenseFiles?: Array<{ fileId: string; name?: string; link?: string }>;

  static fromDBResult(data: FundingDBResult): FundingDto {
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
        files.tradeEvidenceFiles?.map(f => ({
          fileId: f.fileId,
          name: f.name,
          link: f.link,
        })) ?? [],
      tradeDetailFiles:
        files.tradeDetailFiles?.map(f => ({
          fileId: f.fileId,
          name: f.name,
          link: f.link,
        })) ?? [],

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
        files.clubSuppliesImageFiles?.map(f => ({
          fileId: f.fileId,
          name: f.name,
          link: f.link,
        })) ?? [],
      clubSuppliesSoftwareEvidenceFiles:
        files.clubSuppliesSoftwareEvidenceFiles?.map(f => ({
          fileId: f.fileId,
          name: f.name,
          link: f.link,
        })) ?? [],
      fixtureImageFiles:
        files.fixtureImageFiles?.map(f => ({
          fileId: f.fileId,
          name: f.name,
          link: f.link,
        })) ?? [],
      fixtureSoftwareEvidenceFiles:
        files.fixtureSoftwareEvidenceFiles?.map(f => ({
          fileId: f.fileId,
          name: f.name,
          link: f.link,
        })) ?? [],
      foodExpenseFiles:
        files.foodExpenseFiles?.map(f => ({
          fileId: f.fileId,
          name: f.name,
          link: f.link,
        })) ?? [],
      laborContractFiles:
        files.laborContractFiles?.map(f => ({
          fileId: f.fileId,
          name: f.name,
          link: f.link,
        })) ?? [],
      externalEventParticipationFeeFiles:
        files.externalEventParticipationFeeFiles?.map(f => ({
          fileId: f.fileId,
          name: f.name,
          link: f.link,
        })) ?? [],
      publicationFiles:
        files.publicationFiles?.map(f => ({
          fileId: f.fileId,
          name: f.name,
          link: f.link,
        })) ?? [],
      profitMakingActivityFiles:
        files.profitMakingActivityFiles?.map(f => ({
          fileId: f.fileId,
          name: f.name,
          link: f.link,
        })) ?? [],
      jointExpenseFiles:
        files.jointExpenseFiles?.map(f => ({
          fileId: f.fileId,
          name: f.name,
          link: f.link,
        })) ?? [],
      etcExpenseFiles:
        files.etcExpenseFiles?.map(f => ({
          fileId: f.fileId,
          name: f.name,
          link: f.link,
        })) ?? [],
      transportationPassengers:
        files.transportationPassengers?.map(p => ({
          studentId: p.studentId,
        })) ?? [],
    };
  }
}
