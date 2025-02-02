import { z } from "zod";

import { zActivitySummary } from "@sparcs-clubs/interface/api/activity/type/activity.type";
import { zFileSummary } from "@sparcs-clubs/interface/api/file/type/file.type";
import { zStudentSummary } from "@sparcs-clubs/interface/api/user/type/user.type";
import { FixtureClassEnum } from "@sparcs-clubs/interface/common/enum/funding.enum";
import zId from "@sparcs-clubs/interface/common/type/id.type";

import { zFundingCommentResponse } from "./funding.comment.type";
import {
  zClubSupplies,
  zFixture,
  zFunding,
  zMinorExpense,
  zNonCorporateTransaction,
  zTransportation,
} from "./funding.common.type";

const zFundingExtra = zFunding.pick({
  activityD: true,
  fundingStatusEnum: true,
  approvedAmount: true,
});

const zFundingRequestBase = zFunding.omit({
  id: true,
  activityD: true,
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

export const zFundingResponse = zFunding.extend({
  id: zId,
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
