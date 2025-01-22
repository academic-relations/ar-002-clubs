import { z } from "zod";

import { zActivitySummary } from "@sparcs-clubs/interface/api/activity/type/activity.type";
import { zFileSummary } from "@sparcs-clubs/interface/api/file/type/file.type";
import {
  zExecutiveSummary,
  zStudentSummary,
} from "@sparcs-clubs/interface/api/user/type/user.type";
import {
  FixtureClassEnum,
  FixtureEvidenceEnum,
  TransportationEnum,
} from "@sparcs-clubs/interface/common/enum/funding.enum";

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
});

export const zMinorExpense = z.object({
  explanation: z.string().max(255).optional(),
  files: z.array(zFileSummary.pick({ id: true })),
});

const zFunding = z.object({
  id: z.coerce.number().int().min(1),
  clubId: z.coerce.number().int().min(1),
  semesterId: z.coerce.number().int().min(1),
  fundingStatusEnum: z.coerce.number().int().min(1),
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

const zFundingExtra = zFunding.pick({
  semesterId: true,
  fundingStatusEnum: true,
  approvedAmount: true,
});

const zFundingRequestBase = zFunding.omit({
  id: true,
  semesterId: true,
  fundingStatusEnum: true,
  approvedAmount: true,
  editedAt: true,
  commentedAt: true,
  createdAt: true,
  updatedAt: true,
  deletedAt: true,
});

export const zFundingRequest = zFundingRequestBase.superRefine((data, ctx) => {
  if (data.purposeActivity === undefined) {
    if (
      !data.clubSupplies ||
      !data.clubSupplies.name ||
      !data.clubSupplies.evidenceEnum ||
      !data.clubSupplies.classEnum ||
      !data.clubSupplies.number ||
      !data.clubSupplies.price
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "clubSupplies is required",
      });
    }

    if (data.clubSupplies?.classEnum === FixtureClassEnum.Software) {
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
      !data.fixture.evidenceEnum ||
      !data.fixture.classEnum ||
      !data.fixture.number ||
      !data.fixture.price
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "fixture is required",
      });
    }
    if (data.fixture?.classEnum === FixtureClassEnum.Software) {
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
      !data.transportation.enum ||
      !data.transportation.origin ||
      !data.transportation.destination ||
      !data.transportation.purpose
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "transportation is required",
      });
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

export const zFundingComment = z.object({
  id: z.coerce.number().int().min(1),
  fundingId: z.coerce.number().int().min(1),
  chargedExecutive: zExecutiveSummary.pick({ id: true }),
  content: z.string(),
  createdAt: z.coerce.date(),
});

export const zFundingCommentResponse = zFundingComment.extend({
  chargedExecutive: zExecutiveSummary,
});

export const zFundingResponse = zFunding.extend({
  id: z.coerce.number().int().min(1),
  tradeEvidenceFiles: z.array(zFileSummary),
  tradeDetailFiles: z.array(zFileSummary),
  purposeActivity: zActivitySummary.optional(),
  clubSupplies: zClubSupplies
    .extend({
      imageFiles: z.array(zFileSummary),
      softwareEvidenceFiles: z.array(zFileSummary),
    })
    .optional(),
  fixture: zFixture
    .extend({
      imageFiles: z.array(zFileSummary),
      softwareEvidenceFiles: z.array(zFileSummary),
    })
    .optional(),
  transportation: zTransportation
    .extend({
      passengers: z.array(zStudentSummary),
    })
    .optional(),
  nonCorporateTransaction: zNonCorporateTransaction
    .extend({
      files: z.array(zFileSummary),
    })
    .optional(),
  foodExpense: zMinorExpense
    .extend({
      files: z.array(zFileSummary),
    })
    .optional(),
  laborContract: zMinorExpense
    .extend({
      files: z.array(zFileSummary),
    })
    .optional(),
  externalEventParticipationFee: zMinorExpense
    .extend({
      files: z.array(zFileSummary),
    })
    .optional(),
  publication: zMinorExpense
    .extend({
      files: z.array(zFileSummary),
    })
    .optional(),
  profitMakingActivity: zMinorExpense
    .extend({
      files: z.array(zFileSummary),
    })
    .optional(),
  jointExpense: zMinorExpense
    .extend({
      files: z.array(zFileSummary),
    })
    .optional(),
  etcExpense: zMinorExpense
    .extend({
      files: z.array(zFileSummary),
    })
    .optional(),
  comments: z.array(zFundingCommentResponse),
});

export const zFundingSummary = zFunding.pick({
  id: true,
  fundingStatusEnum: true,
  name: true,
  expenditureAmount: true,
  approvedAmount: true,
  purposeActivity: true,
});

export const zFundingResponseSummary = zFundingResponse.pick({
  id: true,
  fundingStatusEnum: true,
  name: true,
  expenditureAmount: true,
  approvedAmount: true,
  purposeActivity: true,
});

export type IClubSupplies = z.infer<typeof zClubSupplies>;
export type IFixture = z.infer<typeof zFixture>;
export type ITransportation = z.infer<typeof zTransportation>;
export type IMinorExpense = z.infer<typeof zMinorExpense>;
export type INonCorporateTransaction = z.infer<typeof zNonCorporateTransaction>;

export type IFunding = z.infer<typeof zFunding>;
export type IFundingRequest = z.infer<typeof zFundingRequest>;
export type IFundingSummary = z.infer<typeof zFundingSummary>;
export type IFundingResponse = z.infer<typeof zFundingResponse>;
export type IFundingResponseSummary = z.infer<typeof zFundingResponseSummary>;
export type IFundingExtra = z.infer<typeof zFundingExtra>;
export type IFundingComment = z.infer<typeof zFundingComment>;
export type IFundingCommentResponse = z.infer<typeof zFundingCommentResponse>;
