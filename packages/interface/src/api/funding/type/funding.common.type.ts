import { z } from "zod";

import {
  zActivityD,
  zActivitySummary,
} from "@sparcs-clubs/interface/api/activity/type/activity.type";
import { zClub } from "@sparcs-clubs/interface/api/club/type/club.type";
import { zFileSummary } from "@sparcs-clubs/interface/api/file/type/file.type";
import { zStudentSummary } from "@sparcs-clubs/interface/api/user/type/user.type";
import {
  FixtureClassEnum,
  FixtureEvidenceEnum,
  FundingStatusEnum,
  TransportationEnum,
} from "@sparcs-clubs/interface/common/enum/funding.enum";
import zId from "@sparcs-clubs/interface/common/type/id.type";

export const zClubSupplies = z.object({
  name: z.string().max(255).optional(),
  evidenceEnum: z.nativeEnum(FixtureEvidenceEnum).optional(),
  classEnum: z.nativeEnum(FixtureClassEnum).optional(),
  purpose: z.string().optional(),
  imageFiles: z.array(zFileSummary.pick({ id: true })),
  softwareEvidence: z.string().optional(),
  softwareEvidenceFiles: z.array(zFileSummary.pick({ id: true })),
  number: z.coerce.number().int().min(1).optional(),
  price: z.coerce.number().int().min(1).optional(),
});

export const zFixture = z.object({
  name: z.string().max(255).optional(),
  evidenceEnum: z.nativeEnum(FixtureEvidenceEnum).optional(),
  classEnum: z.nativeEnum(FixtureClassEnum).optional(),
  purpose: z.string().optional(),
  imageFiles: z.array(zFileSummary.pick({ id: true })),
  softwareEvidence: z.string().optional(),
  softwareEvidenceFiles: z.array(zFileSummary.pick({ id: true })),
  number: z.coerce.number().int().min(1).optional(),
  price: z.coerce.number().int().min(1).optional(),
});

export const zTransportation = z.object({
  enum: z.nativeEnum(TransportationEnum).optional(),
  origin: z.string().max(255).optional(),
  destination: z.string().max(255).optional(),
  purpose: z.string().optional(),
  passengers: z.array(zStudentSummary.pick({ id: true })),
});

export const zNonCorporateTransaction = z.object({
  traderName: z.string().max(255).optional(),
  traderAccountNumber: z.string().max(255).optional(),
  wasteExplanation: z.string().optional(),
  files: z.array(zFileSummary.pick({ id: true })),
});

export const zMinorExpense = z.object({
  explanation: z.string().max(255).optional(),
  files: z.array(zFileSummary.pick({ id: true })),
});

export const zFunding = z.object({
  id: zId,
  club: zClub.pick({ id: true }),
  activityD: zActivityD.pick({ id: true }),
  fundingStatusEnum: z.nativeEnum(FundingStatusEnum),
  purposeActivity: zActivitySummary.pick({ id: true }).optional(),
  name: z.string().max(255).min(1),
  expenditureDate: z.coerce.date(),
  expenditureAmount: z.coerce.number().int().min(0),
  approvedAmount: z.coerce.number().int().min(0).optional(),
  tradeEvidenceFiles: z.array(zFileSummary.pick({ id: true })),
  tradeDetailFiles: z.array(zFileSummary.pick({ id: true })),
  tradeDetailExplanation: z.string(),

  clubSupplies: zClubSupplies.optional(),

  isFixture: z.coerce.boolean(),
  fixture: zFixture.optional(),

  isTransportation: z.coerce.boolean(),
  transportation: zTransportation.optional(),

  isNonCorporateTransaction: z.coerce.boolean(),
  nonCorporateTransaction: zNonCorporateTransaction.optional(),

  isFoodExpense: z.coerce.boolean(),
  foodExpense: zMinorExpense.optional(),

  isLaborContract: z.coerce.boolean(),
  laborContract: zMinorExpense.optional(),

  isExternalEventParticipationFee: z.coerce.boolean(),
  externalEventParticipationFee: zMinorExpense.optional(),

  isPublication: z.coerce.boolean(),
  publication: zMinorExpense.optional(),

  isProfitMakingActivity: z.coerce.boolean(),
  profitMakingActivity: zMinorExpense.optional(),

  isJointExpense: z.coerce.boolean(),
  jointExpense: zMinorExpense.optional(),

  isEtcExpense: z.coerce.boolean(),
  etcExpense: zMinorExpense.optional(),

  editedAt: z.coerce.date(),
  commentedAt: z.coerce.date().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().optional(),
});
