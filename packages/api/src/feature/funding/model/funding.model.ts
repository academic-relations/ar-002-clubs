import { FundingFixture } from "./funding-fixture.model";
import { FundingClubSupplies } from "./funding.club-supplies.model";
import { FundingEtcExpense } from "./funding.etc-expense.model";
import { FundingExternalEventParticipationFee } from "./funding.external-event-participation-fee.model";
import { FundingFoodExpense } from "./funding.food-expense.model";
import { FundingJointExpense } from "./funding.joint-expense.model";
import { FundingLaborContract } from "./funding.labor-contract.model";
import { FundingNonCorporateTransaction } from "./funding.non-corporate-transaction.model";
import { FundingProfitMakingActivity } from "./funding.profit-making-activity.model";
import { FundingPublication } from "./funding.publication.model";
import { FundingResponseDto } from "./funding.response-dto.model";
import { FundingTransportation } from "./funding.transportation.model";

export class Funding {
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

  // Club supplies related
  isClubSupplies: boolean;

  clubSupplies?: FundingClubSupplies;

  // Fixture related
  isFixture: boolean;

  fixture?: FundingFixture;

  // Transportation related
  isTransportation: boolean;

  transportation?: FundingTransportation;

  // Non-corporate transaction related
  isNonCorporateTransaction: boolean;

  nonCorporateTransaction?: FundingNonCorporateTransaction;

  // Food expense related
  isFoodExpense: boolean;

  foodExpense?: FundingFoodExpense;

  // Labor contract related
  isLaborContract: boolean;

  laborContract?: FundingLaborContract;

  // External event participation fee related
  isExternalEventParticipationFee: boolean;

  externalEventParticipationFee?: FundingExternalEventParticipationFee;

  // Publication related
  isPublication: boolean;

  publication?: FundingPublication;

  // Profit making activity related
  isProfitMakingActivity: boolean;

  profitMakingActivity?: FundingProfitMakingActivity;

  // Joint expense related
  isJointExpense: boolean;

  jointExpense?: FundingJointExpense;

  // Etc expense related
  isEtcExpense: boolean;

  etcExpense?: FundingEtcExpense;

  constructor(data: FundingResponseDto) {
    Object.assign(this, {
      id: data.id,
      clubId: data.clubId,
      purposeId: data.purposeId,
      semesterId: data.semesterId,
      fundingOrderStatusEnumId: data.fundingOrderStatusEnumId,
      name: data.name,
      expenditureDate: data.expenditureDate,
      expenditureAmount: data.expenditureAmount,
      approvedAmount: data.approvedAmount,
      feedback: data.feedback,
      createdAt: data.createdAt,
      deletedAt: data.deletedAt,
      tradeDetailExplanation: data.tradeDetailExplanation,
      tradeEvidenceFiles: data.tradeEvidenceFiles,
      tradeDetailFiles: data.tradeDetailFiles,
      isClubSupplies: data.isClubSupplies,
      isFixture: data.isFixture,
      isTransportation: data.isTransportation,
      isNonCorporateTransaction: data.isNonCorporateTransaction,
      isFoodExpense: data.isFoodExpense,
      isLaborContract: data.isLaborContract,
      isExternalEventParticipationFee: data.isExternalEventParticipationFee,
      isPublication: data.isPublication,
      isProfitMakingActivity: data.isProfitMakingActivity,
      isJointExpense: data.isJointExpense,
      isEtcExpense: data.isEtcExpense,
    });

    if (data.isClubSupplies) {
      this.clubSupplies = new FundingClubSupplies(data);
    }

    if (data.isFixture) {
      this.fixture = new FundingFixture(data);
    }

    if (data.isTransportation) {
      this.transportation = new FundingTransportation(data);
    }

    if (data.isNonCorporateTransaction) {
      this.nonCorporateTransaction = new FundingNonCorporateTransaction(data);
    }

    if (data.isFoodExpense) {
      this.foodExpense = new FundingFoodExpense(data);
    }

    if (data.isLaborContract) {
      this.laborContract = new FundingLaborContract(data);
    }

    if (data.isExternalEventParticipationFee) {
      this.externalEventParticipationFee =
        new FundingExternalEventParticipationFee(data);
    }

    if (data.isPublication) {
      this.publication = new FundingPublication(data);
    }

    if (data.isProfitMakingActivity) {
      this.profitMakingActivity = new FundingProfitMakingActivity(data);
    }

    if (data.isJointExpense) {
      this.jointExpense = new FundingJointExpense(data);
    }

    if (data.isEtcExpense) {
      this.etcExpense = new FundingEtcExpense(data);
    }
  }
}
