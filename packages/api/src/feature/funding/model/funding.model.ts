import { IFileSummary } from "@sparcs-clubs/interface/api/file/type/file.type";
import {
  IClubSupplies,
  IFixture,
  IFunding,
  IMinorExpense,
  INonCorporateTransaction,
  ITransportation,
} from "@sparcs-clubs/interface/api/funding/type/funding.type";

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
    isNonCorporateTransaction: boolean;
    clubSuppliesName: string;
    clubSuppliesEvidenceEnumId: number;
    clubSuppliesClassEnumId: number;
    clubSuppliesPurpose: string;
    clubSuppliesSoftwareEvidence: string;
    numberOfClubSupplies: number;
    priceOfClubSupplies: number;
    fixtureName: string;
    fixtureEvidenceEnumId: number;
    fixtureClassEnumId: number;
    fixturePurpose: string;
    fixtureSoftwareEvidence: string;
    numberOfFixture: number;
    priceOfFixture: number;
    tradeDetailExplanation: string;
    traderName: string;
    traderAccountNumber: string;
    wasteExplanation: string;
    foodExpenseExplanation: string;
    laborContractExplanation: string;
    externalEventParticipationFeeExplanation: string;
    publicationExplanation: string;
    profitMakingActivityExplanation: string;
    jointExpenseExplanation: string;
    etcExpenseExplanation: string;
    transportationEnumId: number;
    origin: string;
    destination: string;
    purposeOfTransportation: string;
    placeValidity: string;
  };
  fundingOrderFeedback?: {
    feedback?: string;
  };
  tradeEvidenceFiles: IFileSummary[];
  tradeDetailFiles: IFileSummary[];
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

export class Funding implements IFunding {
  id?: number;

  clubId: number;

  semesterId: number;

  fundingOrderStatusEnumId: number;

  purposeId?: number;

  name: string;

  expenditureDate: Date;

  expenditureAmount: number;

  approvedAmount?: number;

  tradeEvidenceFiles: IFileSummary[];

  tradeDetailFiles: IFileSummary[];

  tradeDetailExplanation: string;

  clubSupplies?: IClubSupplies;

  isFixture: boolean;

  fixture?: IFixture;

  isTransportation: boolean;

  transportation?: ITransportation;

  isNonCorporateTransaction: boolean;

  nonCorporateTransaction?: INonCorporateTransaction;

  isFoodExpense: boolean;

  foodExpense?: IMinorExpense;

  isLaborContract: boolean;

  laborContract?: IMinorExpense;

  isExternalEventParticipationFee: boolean;

  externalEventParticipationFee?: IMinorExpense;

  isPublication: boolean;

  publication?: IMinorExpense;

  isProfitMakingActivity: boolean;

  profitMakingActivity?: IMinorExpense;

  isJointExpense: boolean;

  jointExpense?: IMinorExpense;

  isEtcExpense: boolean;

  etcExpense?: IMinorExpense;

  constructor(data: Funding) {
    Object.assign(this, data);
  }

  static fromDBResult(result: FundingDBResult) {
    return new Funding({
      id: result.fundingOrder.id,
      clubId: result.fundingOrder.clubId,
      name: result.fundingOrder.name,
      semesterId: result.fundingOrder.semesterId,
      fundingOrderStatusEnumId: result.fundingOrder.fundingOrderStatusEnumId,
      purposeId: result.fundingOrder.purposeId,
      expenditureDate: result.fundingOrder.expenditureDate,
      expenditureAmount: result.fundingOrder.expenditureAmount,
      approvedAmount: result.fundingOrder.approvedAmount,
      tradeEvidenceFiles: result.tradeEvidenceFiles.map(file => ({
        id: file.id,
        name: file.name ?? undefined,
        url: file.url ?? undefined,
      })),
      tradeDetailFiles: result.tradeDetailFiles.map(file => ({
        id: file.id,
        name: file.name ?? undefined,
        url: file.url ?? undefined,
      })),
      tradeDetailExplanation: result.fundingOrder.tradeDetailExplanation,
      isFixture: result.fundingOrder.isFixture,
      isTransportation: result.fundingOrder.isTransportation,
      isNonCorporateTransaction: result.fundingOrder.isNonCorporateTransaction,
      isFoodExpense: result.fundingOrder.isFoodExpense,
      isLaborContract: result.fundingOrder.isLaborContract,
      isExternalEventParticipationFee:
        result.fundingOrder.isExternalEventParticipationFee,
      isPublication: result.fundingOrder.isPublication,
      isProfitMakingActivity: result.fundingOrder.isProfitMakingActivity,
      isJointExpense: result.fundingOrder.isJointExpense,
      isEtcExpense: result.fundingOrder.isEtcExpense,
      clubSupplies: {
        name: result.fundingOrder.clubSuppliesName,
        evidenceEnumId: result.fundingOrder.clubSuppliesEvidenceEnumId,
        classEnumId: result.fundingOrder.clubSuppliesClassEnumId,
        purpose: result.fundingOrder.clubSuppliesPurpose,
        softwareEvidence: result.fundingOrder.clubSuppliesSoftwareEvidence,
        number: result.fundingOrder.numberOfClubSupplies,
        price: result.fundingOrder.priceOfClubSupplies,
        imageFiles: result.clubSuppliesImageFiles.map(file => ({
          id: file.fileId,
          name: file.name ?? undefined,
          url: file.link ?? undefined,
        })),
        softwareEvidenceFiles: result.clubSuppliesSoftwareEvidenceFiles.map(
          file => ({
            id: file.fileId,
            name: file.name ?? undefined,
            url: file.link ?? undefined,
          }),
        ),
      },
      fixture: {
        name: result.fundingOrder.fixtureName,
        purpose: result.fundingOrder.fixturePurpose,
        evidenceEnumId: result.fundingOrder.fixtureEvidenceEnumId,
        classEnumId: result.fundingOrder.fixtureClassEnumId,
        softwareEvidence: result.fundingOrder.fixtureSoftwareEvidence,
        number: result.fundingOrder.numberOfFixture,
        price: result.fundingOrder.priceOfFixture,
        imageFiles: result.fixtureImageFiles.map(file => ({
          id: file.fileId,
          name: file.name ?? undefined,
          url: file.link ?? undefined,
        })),
        softwareEvidenceFiles: result.fixtureSoftwareEvidenceFiles.map(
          file => ({
            id: file.fileId,
            name: file.name ?? undefined,
            url: file.link ?? undefined,
          }),
        ),
      },
      transportation: {
        enumId: result.fundingOrder.transportationEnumId,
        origin: result.fundingOrder.origin,
        destination: result.fundingOrder.destination,
        purpose: result.fundingOrder.purposeOfTransportation,
        placeValidity: result.fundingOrder.placeValidity,
        passengers: result.transportationPassengers.map(passenger => ({
          id: passenger.studentId,
        })),
      },
      nonCorporateTransaction: {
        traderName: result.fundingOrder.traderName,
        traderAccountNumber: result.fundingOrder.traderAccountNumber,
        wasteExplanation: result.fundingOrder.wasteExplanation,
      },
      foodExpense: {
        explanation: result.fundingOrder.foodExpenseExplanation,
        files: result.foodExpenseFiles.map(file => ({
          id: file.fileId,
          name: file.name ?? undefined,
          url: file.link ?? undefined,
        })),
      },
      laborContract: {
        explanation: result.fundingOrder.laborContractExplanation,
        files: result.laborContractFiles.map(file => ({
          id: file.fileId,
          name: file.name ?? undefined,
          url: file.link ?? undefined,
        })),
      },
      externalEventParticipationFee: {
        explanation:
          result.fundingOrder.externalEventParticipationFeeExplanation,
        files: result.externalEventParticipationFeeFiles.map(file => ({
          id: file.fileId,
          name: file.name ?? undefined,
          url: file.link ?? undefined,
        })),
      },
      publication: {
        explanation: result.fundingOrder.publicationExplanation,
        files: result.publicationFiles.map(file => ({
          id: file.fileId,
          name: file.name ?? undefined,
          url: file.link ?? undefined,
        })),
      },
      profitMakingActivity: {
        explanation: result.fundingOrder.profitMakingActivityExplanation,
        files: result.profitMakingActivityFiles.map(file => ({
          id: file.fileId,
          name: file.name ?? undefined,
          url: file.link ?? undefined,
        })),
      },
      jointExpense: {
        explanation: result.fundingOrder.jointExpenseExplanation,
        files: result.jointExpenseFiles.map(file => ({
          id: file.fileId,
          name: file.name ?? undefined,
          url: file.link ?? undefined,
        })),
      },
      etcExpense: {
        explanation: result.fundingOrder.etcExpenseExplanation,
        files: result.etcExpenseFiles.map(file => ({
          id: file.fileId,
          name: file.name ?? undefined,
          url: file.link ?? undefined,
        })),
      },
    });
  }
}
