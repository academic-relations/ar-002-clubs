import { IActivitySummary } from "@sparcs-clubs/interface/api/activity/type/activity.type";
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
  tradeEvidenceFiles: { id: string }[];
  tradeDetailFiles: { id: string }[];
  clubSuppliesImageFiles?: Array<{
    id: string;
  }>;
  clubSuppliesSoftwareEvidenceFiles?: Array<{
    id: string;
  }>;
  fixtureImageFiles?: Array<{ id: string }>;
  fixtureSoftwareEvidenceFiles?: Array<{
    id: string;
  }>;
  foodExpenseFiles?: Array<{ id: string }>;
  laborContractFiles?: Array<{ id: string }>;
  externalEventParticipationFeeFiles?: Array<{
    id: string;
  }>;
  publicationFiles?: Array<{ id: string }>;
  profitMakingActivityFiles?: Array<{
    id: string;
  }>;
  jointExpenseFiles?: Array<{ id: string }>;
  etcExpenseFiles?: Array<{ id: string }>;
  transportationPassengers?: Array<{
    id: number;
  }>;
};

export class MFunding implements IFunding {
  id: number;

  clubId: number;

  semesterId: number;

  fundingOrderStatusEnumId: number;

  purposeActivity?: Pick<IActivitySummary, "id">;

  name: string;

  expenditureDate: Date;

  expenditureAmount: number;

  approvedAmount?: number;

  tradeEvidenceFiles: { id: string }[];

  tradeDetailFiles: { id: string }[];

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

  constructor(data: MFunding) {
    Object.assign(this, data);
  }

  static fromDBResult(result: FundingDBResult) {
    return new MFunding({
      id: result.fundingOrder.id,
      clubId: result.fundingOrder.clubId,
      name: result.fundingOrder.name,
      semesterId: result.fundingOrder.semesterId,
      fundingOrderStatusEnumId: result.fundingOrder.fundingOrderStatusEnumId,
      purposeActivity: {
        id: result.fundingOrder.purposeId,
      },
      expenditureDate: result.fundingOrder.expenditureDate,
      expenditureAmount: result.fundingOrder.expenditureAmount,
      approvedAmount: result.fundingOrder.approvedAmount,
      tradeEvidenceFiles: result.tradeEvidenceFiles.map(file => ({
        id: file.id,
      })),
      tradeDetailFiles: result.tradeDetailFiles.map(file => ({
        id: file.id,
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
      clubSupplies: result.fundingOrder.purposeId
        ? undefined
        : {
            name: result.fundingOrder.clubSuppliesName,
            evidenceEnumId: result.fundingOrder.clubSuppliesEvidenceEnumId,
            classEnumId: result.fundingOrder.clubSuppliesClassEnumId,
            purpose: result.fundingOrder.clubSuppliesPurpose,
            softwareEvidence: result.fundingOrder.clubSuppliesSoftwareEvidence,
            number: result.fundingOrder.numberOfClubSupplies,
            price: result.fundingOrder.priceOfClubSupplies,
            imageFiles: result.clubSuppliesImageFiles.map(file => ({
              id: file.id,
            })),
            softwareEvidenceFiles: result.clubSuppliesSoftwareEvidenceFiles.map(
              file => ({
                id: file.id,
              }),
            ),
          },
      fixture: result.fundingOrder.isFixture
        ? {
            name: result.fundingOrder.fixtureName,
            purpose: result.fundingOrder.fixturePurpose,
            evidenceEnumId: result.fundingOrder.fixtureEvidenceEnumId,
            classEnumId: result.fundingOrder.fixtureClassEnumId,
            softwareEvidence: result.fundingOrder.fixtureSoftwareEvidence,
            number: result.fundingOrder.numberOfFixture,
            price: result.fundingOrder.priceOfFixture,
            imageFiles: result.fixtureImageFiles.map(file => ({
              id: file.id,
            })),
            softwareEvidenceFiles: result.fixtureSoftwareEvidenceFiles.map(
              file => ({
                id: file.id,
              }),
            ),
          }
        : undefined,
      transportation: result.fundingOrder.isTransportation
        ? {
            enumId: result.fundingOrder.transportationEnumId,
            origin: result.fundingOrder.origin,
            destination: result.fundingOrder.destination,
            purpose: result.fundingOrder.purposeOfTransportation,
            placeValidity: result.fundingOrder.placeValidity,
            passengers: result.transportationPassengers.map(passenger => ({
              id: passenger.id,
            })),
          }
        : undefined,
      nonCorporateTransaction: result.fundingOrder.isNonCorporateTransaction
        ? {
            traderName: result.fundingOrder.traderName,
            traderAccountNumber: result.fundingOrder.traderAccountNumber,
            wasteExplanation: result.fundingOrder.wasteExplanation,
          }
        : undefined,
      foodExpense: result.fundingOrder.isFoodExpense
        ? {
            explanation: result.fundingOrder.foodExpenseExplanation,
            files: result.foodExpenseFiles.map(file => ({
              id: file.id,
            })),
          }
        : undefined,
      laborContract: result.fundingOrder.isLaborContract
        ? {
            explanation: result.fundingOrder.laborContractExplanation,
            files: result.laborContractFiles.map(file => ({
              id: file.id,
            })),
          }
        : undefined,
      externalEventParticipationFee: result.fundingOrder
        .isExternalEventParticipationFee
        ? {
            explanation:
              result.fundingOrder.externalEventParticipationFeeExplanation,
            files: result.externalEventParticipationFeeFiles.map(file => ({
              id: file.id,
            })),
          }
        : undefined,
      publication: result.fundingOrder.isPublication
        ? {
            explanation: result.fundingOrder.publicationExplanation,
            files: result.publicationFiles.map(file => ({
              id: file.id,
            })),
          }
        : undefined,
      profitMakingActivity: result.fundingOrder.isProfitMakingActivity
        ? {
            explanation: result.fundingOrder.profitMakingActivityExplanation,
            files: result.profitMakingActivityFiles.map(file => ({
              id: file.id,
            })),
          }
        : undefined,
      jointExpense: result.fundingOrder.isJointExpense
        ? {
            explanation: result.fundingOrder.jointExpenseExplanation,
            files: result.jointExpenseFiles.map(file => ({
              id: file.id,
            })),
          }
        : undefined,
      etcExpense: result.fundingOrder.isEtcExpense
        ? {
            explanation: result.fundingOrder.etcExpenseExplanation,
            files: result.etcExpenseFiles.map(file => ({
              id: file.id,
            })),
          }
        : undefined,
    });
  }
}
