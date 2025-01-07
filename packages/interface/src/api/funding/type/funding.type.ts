import { z } from "zod";

import { zFileSummary } from "@sparcs-clubs/interface/api/file/type/file.type";
import { zStudentSummary } from "@sparcs-clubs/interface/api/user/type/user.type";
import {
  FixtureClassEnum,
  FixtureEvidenceEnum,
  TransportationEnum,
} from "@sparcs-clubs/interface/common/enum/funding.enum";

export const zClubSupplies = z.object({
  name: z.string().max(255).optional(),
  evidenceEnumId: z.nativeEnum(FixtureEvidenceEnum).optional(),
  classEnumId: z.nativeEnum(FixtureClassEnum).optional(),
  purpose: z.string().optional(),
  imageFiles: z.array(zFileSummary),
});

export const zFixture = z.object({
  fixtureName: z.string().max(255).optional(),
  fixtureEvidenceEnumId: z.nativeEnum(FixtureEvidenceEnum).optional(),
  fixtureClassEnumId: z.nativeEnum(FixtureClassEnum).optional(),
  fixturePurpose: z.string().optional(),
  fixtureImageFiles: z.array(zFileSummary),
  fixtureSoftwareEvidence: z.string().optional(),
  fixtureSoftwareEvidenceFiles: z.array(zFileSummary),
  numberOfFixture: z.coerce.number().int().min(1).optional(),
  priceOfFixture: z.coerce.number().int().min(1).optional(),
});

export const zTransportation = z.object({
  transportationEnumId: z.nativeEnum(TransportationEnum).optional(),
  origin: z.string().max(255).optional(),
  destination: z.string().max(255).optional(),
  purposeOfTransportation: z.string().optional(),
  placeValidity: z.string().optional(),
  transportationPassengers: z.array(zStudentSummary),
});

export const zNonCorporateTransaction = z.object({
  traderName: z.string().max(255).optional(),
  traderAccountNumber: z.string().max(255).optional(),
  wasteExplanation: z.string().optional(),
});

export const zFoodExpense = z.object({
  foodExpenseExplanation: z.string().max(255).optional(),
  foodExpenseFiles: z.array(zFileSummary),
});

export const zLaborContract = z.object({
  laborContractExplanation: z.string().max(255).optional(),
  laborContractFiles: z.array(zFileSummary),
});

export const zExternalEventParticipationFee = z.object({
  externalEventParticipationFeeExplanation: z.string().max(255).optional(),
  externalEventParticipationFeeFiles: z.array(zFileSummary),
});

export const zPublication = z.object({
  publicationExplanation: z.string().max(255).optional(),
  publicationFiles: z.array(zFileSummary),
});

export const zProfitMakingActivity = z.object({
  profitMakingActivityExplanation: z.string().max(255).optional(),
  profitMakingActivityFiles: z.array(zFileSummary),
});

export const zJointExpense = z.object({
  jointExpenseExplanation: z.string().max(255).optional(),
  jointExpenseFiles: z.array(zFileSummary),
});

export const zEtcExpense = z.object({
  etcExpenseExplanation: z.string().max(255).optional(),
  etcExpenseFiles: z.array(zFileSummary),
});

export const zFunding = z.object({
  id: z.coerce.number().int().min(1).optional(),
  clubId: z.coerce.number().int().min(1),
  purposeId: z.coerce.number().int().min(1),
  name: z.string().max(255).min(1),
  expenditureDate: z.coerce.date(),
  expenditureAmount: z.coerce.number().int().min(0),
  approvedAmount: z.coerce.number().int().min(0).optional(),
  tradeEvidenceFiles: z.array(zFileSummary),
  tradeDetailFiles: z.array(zFileSummary),
  tradeDetailExplanation: z.string(),

  isClubSupplies: z.coerce.boolean(),
  clubSupplies: zClubSupplies.optional(),

  isFixture: z.coerce.boolean(),
  fixture: zFixture.optional(),

  isTransportation: z.coerce.boolean(),
  transportation: zTransportation.optional(),

  isNonCorporateTransaction: z.coerce.boolean(),
  nonCorporateTransaction: zNonCorporateTransaction.optional(),

  isFoodExpense: z.coerce.boolean(),
  foodExpense: zFoodExpense.optional(),

  isLaborContract: z.coerce.boolean(),
  laborContract: zLaborContract.optional(),

  isExternalEventParticipationFee: z.coerce.boolean(),
  externalEventParticipationFee: zExternalEventParticipationFee.optional(),

  isPublication: z.coerce.boolean(),
  publication: zPublication.optional(),

  isProfitMakingActivity: z.coerce.boolean(),
  profitMakingActivity: zProfitMakingActivity.optional(),

  isJointExpense: z.coerce.boolean(),
  jointExpense: zJointExpense.optional(),

  isEtcExpense: z.coerce.boolean(),
  etcExpense: zEtcExpense.optional(),
});

export const zFundingSummary = z.object({
  id: z.coerce.number().int().min(1),
  fundingOrderStatusEnumId: z.coerce.number().int().min(1),
  activityName: z.string(),
  name: z.string(),
  expenditureAmount: z.coerce.number().int().min(1),
  approvedAmount: z.coerce.number().int().min(1),
});

export type IFunding = z.infer<typeof zFunding>;
export type IFundingSummary = z.infer<typeof zFundingSummary>;
