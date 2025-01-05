import { HttpStatusCode } from "axios";
import { z } from "zod";

import {
  FixtureClassEnum,
  FixtureEvidenceEnum,
  TransportationEnum,
} from "@sparcs-clubs/interface/common/enum/funding.enum";

/**
 * @version v0.1
 * @description 지원금 신청의 항목을 수정합니다.
 */

const url = (id: number) => `/student/fundings/funding/${id}`;
const method = "PUT";

const requestParam = z.object({
  id: z.coerce.number().int().min(1),
});

const requestQuery = z.object({});

const requestPreBody = z.object({
  clubId: z.coerce.number().int().min(1),
  purposeId: z.coerce.number().int().min(1).optional(),
  name: z.string().max(255).min(1),
  expenditureDate: z.coerce.date(),
  expenditureAmount: z.coerce.number().int().min(1),

  tradeEvidenceFiles: z.array(
    z.object({
      fileId: z.string().max(128).min(1),
    }),
  ),
  tradeDetailFiles: z.array(
    z.object({
      fileId: z.string().max(128).min(1),
    }),
  ),
  tradeDetailExplanation: z.string().min(1),

  isClubSupplies: z.coerce.boolean(),
  clubSuppliesName: z.string().max(255).optional(),
  clubSuppliesEvidenceEnumId: z.nativeEnum(FixtureEvidenceEnum).optional(),
  clubSuppliesClassEnumId: z.nativeEnum(FixtureClassEnum).optional(),
  clubSuppliesPurpose: z.string().optional(),
  clubSuppliesImageFiles: z.array(
    z.object({
      fileId: z.string().max(128).min(1),
    }),
  ),
  clubSuppliesSoftwareEvidence: z.string().optional(),
  clubSuppliesSoftwareEvidenceFiles: z.array(
    z.object({
      fileId: z.string().max(128).min(1),
    }),
  ),
  numberOfClubSupplies: z.coerce.number().int().min(1).optional(),
  priceOfClubSupplies: z.coerce.number().int().min(1).optional(),

  isFixture: z.coerce.boolean(),
  fixtureName: z.string().max(255).optional(),
  fixtureEvidenceEnumId: z.nativeEnum(FixtureEvidenceEnum).optional(),
  fixtureClassEnumId: z.nativeEnum(FixtureClassEnum).optional(),
  fixturePurpose: z.string().optional(),
  fixtureImageFiles: z.array(
    z.object({
      fileId: z.string().max(128).min(1),
    }),
  ),
  fixtureSoftwareEvidence: z.string().optional(),
  fixtureSoftwareEvidenceFiles: z.array(
    z.object({
      fileId: z.string().max(128).min(1),
    }),
  ),
  numberOfFixture: z.coerce.number().int().min(1).optional(),
  priceOfFixture: z.coerce.number().int().min(1).optional(),

  isTransportation: z.coerce.boolean(),
  transportationEnumId: z.nativeEnum(TransportationEnum).optional(),
  origin: z.string().max(255).optional(),
  destination: z.string().max(255).optional(),
  purposeOfTransportation: z.string().optional(),
  placeValidity: z.string().optional(),
  transportationPassengers: z.array(
    z.object({
      studentId: z.coerce.number().int().min(1),
    }),
  ),

  isNonCorporateTransaction: z.coerce.boolean(),
  traderName: z.string().max(255).optional(),
  traderAccountNumber: z.string().max(255).optional(),
  wasteExplanation: z.string().optional(),

  isFoodExpense: z.coerce.boolean(),
  isLaborContract: z.coerce.boolean(),
  isExternalEventParticipationFee: z.coerce.boolean(),
  isPublication: z.coerce.boolean(),
  isProfitMakingActivity: z.coerce.boolean(),
  isJointExpense: z.coerce.boolean(),
  isEtcExpense: z.coerce.boolean(),

  foodExpenseExplanation: z.string().optional(),
  laborContractExplanation: z.string().optional(),
  externalEventParticipationFeeExplanation: z.string().optional(),
  publicationExplanation: z.string().optional(),
  profitMakingActivityExplanation: z.string().optional(),
  jointExpenseExplanation: z.string().optional(),
  etcExpenseExplanation: z.string().optional(),

  foodExpenseFiles: z.array(
    z.object({
      fileId: z.string().max(128).min(1),
    }),
  ),
  laborContractFiles: z.array(
    z.object({
      fileId: z.string().max(128).min(1),
    }),
  ),
  externalEventParticipationFeeFiles: z.array(
    z.object({
      fileId: z.string().max(128).min(1),
    }),
  ),
  publicationFiles: z.array(
    z.object({
      fileId: z.string().max(128).min(1),
    }),
  ),
  profitMakingActivityFiles: z.array(
    z.object({
      fileId: z.string().max(128).min(1),
    }),
  ),
  jointExpenseFiles: z.array(
    z.object({
      fileId: z.string().max(128).min(1),
    }),
  ),
  etcExpenseFiles: z.array(
    z.object({
      fileId: z.string().max(128).min(1),
    }),
  ),
});

const requestBody = requestPreBody.superRefine((data, ctx) => {
  if (data.purposeId === undefined) {
    if (
      !data.clubSuppliesName ||
      !data.clubSuppliesEvidenceEnumId ||
      !data.clubSuppliesClassEnumId ||
      !data.numberOfClubSupplies ||
      !data.priceOfClubSupplies
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "clubSupplies is required",
      });
    }

    if (data.clubSuppliesClassEnumId === FixtureClassEnum.Software) {
      if (!data.clubSuppliesSoftwareEvidence) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "clubSuppliesSoftwareEvidence is required",
        });
      }
    } else if (!data.clubSuppliesPurpose) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "clubSuppliesPurpose is required",
      });
    }
  }

  if (data.isFixture) {
    if (
      !data.fixtureName ||
      !data.fixtureEvidenceEnumId ||
      !data.fixtureClassEnumId ||
      !data.numberOfFixture ||
      !data.priceOfFixture
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "fixture is required",
      });
    }
    if (data.fixtureClassEnumId === FixtureClassEnum.Software) {
      if (!data.fixtureSoftwareEvidence) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "fixtureSoftwareEvidence is required",
        });
      }
    } else if (!data.fixturePurpose) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "fixturePurpose is required",
      });
    }
  }

  if (data.isTransportation) {
    if (
      !data.transportationEnumId ||
      !data.origin ||
      !data.destination ||
      !data.purposeOfTransportation
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "transportation is required",
      });
    }
    if (
      data.transportationEnumId === TransportationEnum.CallVan ||
      data.transportationEnumId === TransportationEnum.Cargo ||
      data.transportationEnumId === TransportationEnum.Airplane ||
      data.transportationEnumId === TransportationEnum.Ship ||
      data.transportationEnumId === TransportationEnum.Others
    ) {
      if (!data.placeValidity) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "placeValidity is required",
        });
      }
    }
  }

  if (data.isNonCorporateTransaction) {
    if (
      !data.traderName ||
      !data.traderAccountNumber ||
      !data.wasteExplanation
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "nonCorporateTransaction is required",
      });
    }
  }

  if (data.isFoodExpense) {
    if (!data.foodExpenseExplanation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "foodExpenseExplanation is required",
      });
    }
  }

  if (data.isLaborContract) {
    if (!data.laborContractExplanation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "laborContractExplanation is required",
      });
    }
  }

  if (data.isExternalEventParticipationFee) {
    if (!data.externalEventParticipationFeeExplanation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "externalEventParticipationFeeExplanation is required",
      });
    }
  }

  if (data.isPublication) {
    if (!data.publicationExplanation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "publicationExplanation is required",
      });
    }
  }

  if (data.isProfitMakingActivity) {
    if (!data.profitMakingActivityExplanation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "profitMakingActivityExplanation is required",
      });
    }
  }

  if (data.isJointExpense) {
    if (!data.jointExpenseExplanation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "jointExpenseExplanation is required",
      });
    }
  }

  if (data.isEtcExpense) {
    if (!data.etcExpenseExplanation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "etcExpenseExplanation is required",
      });
    }
  }
});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({}),
};

const responseErrorMap = {};

const apiFnd003 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiFnd003RequestParam = z.infer<typeof apiFnd003.requestParam>;
type ApiFnd003RequestQuery = z.infer<typeof apiFnd003.requestQuery>;
type ApiFnd003RequestBody = z.infer<typeof apiFnd003.requestBody>;
type ApiFnd003ResponseOk = z.infer<(typeof apiFnd003.responseBodyMap)[200]>;

export default apiFnd003;

export type {
  ApiFnd003RequestParam,
  ApiFnd003RequestQuery,
  ApiFnd003RequestBody,
  ApiFnd003ResponseOk,
};
