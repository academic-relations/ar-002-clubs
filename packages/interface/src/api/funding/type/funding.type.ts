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
  softwareEvidence: z.string().optional(),
  softwareEvidenceFiles: z.array(zFileSummary),
  number: z.coerce.number().int().min(1).optional(),
  price: z.coerce.number().int().min(1).optional(),
});

export const zFixture = z.object({
  name: z.string().max(255).optional(),
  evidenceEnumId: z.nativeEnum(FixtureEvidenceEnum).optional(),
  classEnumId: z.nativeEnum(FixtureClassEnum).optional(),
  purpose: z.string().optional(),
  imageFiles: z.array(zFileSummary),
  softwareEvidence: z.string().optional(),
  softwareEvidenceFiles: z.array(zFileSummary),
  number: z.coerce.number().int().min(1).optional(),
  price: z.coerce.number().int().min(1).optional(),
});

export const zTransportation = z.object({
  enumId: z.nativeEnum(TransportationEnum).optional(),
  origin: z.string().max(255).optional(),
  destination: z.string().max(255).optional(),
  purpose: z.string().optional(),
  placeValidity: z.string().optional(),
  passengers: z.array(zStudentSummary),
});

export const zNonCorporateTransaction = z.object({
  traderName: z.string().max(255).optional(),
  traderAccountNumber: z.string().max(255).optional(),
  wasteExplanation: z.string().optional(),
});

const zMinorExpense = z.object({
  explanation: z.string().max(255).optional(),
  files: z.array(zFileSummary),
});

const zFundingBase = z.object({
  id: z.coerce.number().int().min(1).optional(),
  clubId: z.coerce.number().int().min(1),
  semesterId: z.coerce.number().int().min(1),
  fundingOrderStatusEnumId: z.coerce.number().int().min(1),
  purposeId: z.coerce.number().int().min(1).optional(),
  name: z.string().max(255).min(1),
  expenditureDate: z.coerce.date(),
  expenditureAmount: z.coerce.number().int().min(0),
  approvedAmount: z.coerce.number().int().min(0).optional(),
  tradeEvidenceFiles: z.array(zFileSummary),
  tradeDetailFiles: z.array(zFileSummary),
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
});

export const zFunding = zFundingBase.superRefine((data, ctx) => {
  if (data.purposeId === undefined) {
    if (
      !data.clubSupplies ||
      !data.clubSupplies.name ||
      !data.clubSupplies.evidenceEnumId ||
      !data.clubSupplies.classEnumId ||
      !data.clubSupplies.number ||
      !data.clubSupplies.price
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "clubSupplies is required",
      });
    }

    if (data.clubSupplies?.classEnumId === FixtureClassEnum.Software) {
      if (!data.clubSupplies?.softwareEvidence) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "clubSuppliesSoftwareEvidence is required",
        });
      }
    } else if (!data.clubSupplies?.purpose) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "clubSuppliesPurpose is required",
      });
    }
  }

  if (data.isFixture) {
    if (
      !data.fixture ||
      !data.fixture.name ||
      !data.fixture.evidenceEnumId ||
      !data.fixture.classEnumId ||
      !data.fixture.number ||
      !data.fixture.price
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "fixture is required",
      });
    }
    if (data.fixture?.classEnumId === FixtureClassEnum.Software) {
      if (!data.fixture?.softwareEvidence) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "fixtureSoftwareEvidence is required",
        });
      }
    } else if (!data.fixture?.purpose) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "fixturePurpose is required",
      });
    }
  }

  if (data.isTransportation) {
    if (
      !data.transportation ||
      !data.transportation.enumId ||
      !data.transportation.origin ||
      !data.transportation.destination ||
      !data.transportation.purpose
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "transportation is required",
      });
    }
    if (
      data.transportation?.enumId === TransportationEnum.CallVan ||
      data.transportation?.enumId === TransportationEnum.Cargo ||
      data.transportation?.enumId === TransportationEnum.Airplane ||
      data.transportation?.enumId === TransportationEnum.Ship ||
      data.transportation?.enumId === TransportationEnum.Others
    ) {
      if (!data.transportation?.placeValidity) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "transportationPlaceValidity is required",
        });
      }
    }
  }

  if (data.isNonCorporateTransaction) {
    if (
      !data.nonCorporateTransaction ||
      !data.nonCorporateTransaction.traderName ||
      !data.nonCorporateTransaction.traderAccountNumber ||
      !data.nonCorporateTransaction.wasteExplanation
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "nonCorporateTransaction is required",
      });
    }
  }

  if (data.isFoodExpense) {
    if (!data.foodExpense?.explanation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "foodExpenseExplanation is required",
      });
    }
  }

  if (data.isLaborContract) {
    if (!data.laborContract?.explanation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "laborContractExplanation is required",
      });
    }
  }

  if (data.isExternalEventParticipationFee) {
    if (!data.externalEventParticipationFee?.explanation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "externalEventParticipationFeeExplanation is required",
      });
    }
  }

  if (data.isPublication) {
    if (!data.publication?.explanation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "publicationExplanation is required",
      });
    }
  }

  if (data.isProfitMakingActivity) {
    if (!data.profitMakingActivity?.explanation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "profitMakingActivityExplanation is required",
      });
    }
  }

  if (data.isJointExpense) {
    if (!data.jointExpense?.explanation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "jointExpenseExplanation is required",
      });
    }
  }

  if (data.isEtcExpense) {
    if (!data.etcExpense?.explanation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "etcExpenseExplanation is required",
      });
    }
  }
});

export const zFundingSummary = z.object({
  id: z.coerce.number().int().min(1),
  fundingOrderStatusEnumId: z.coerce.number().int().min(1),
  activityName: z.string(),
  name: z.string(),
  expenditureAmount: z.coerce.number().int().min(1),
  approvedAmount: z.coerce.number().int().min(1),
  purposeId: z.coerce.number().int().min(1),
});

export type IClubSupplies = z.infer<typeof zClubSupplies>;
export type IFixture = z.infer<typeof zFixture>;
export type ITransportation = z.infer<typeof zTransportation>;
export type IMinorExpense = z.infer<typeof zMinorExpense>;
export type INonCorporateTransaction = z.infer<typeof zNonCorporateTransaction>;

export type IFunding = z.infer<typeof zFunding>;
export type IFundingSummary = z.infer<typeof zFundingSummary>;
