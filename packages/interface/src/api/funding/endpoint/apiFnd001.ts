import { HttpStatusCode } from "axios";
import { z } from "zod";

import {
  FixtureClassEnum,
  FixtureEvidenceEnum,
  TransportationEnum,
} from "@sparcs-clubs/interface/common/enum/funding.enum";

/**
 * @version v0.1
 * @description 지원금 신청의 항목을 추가합니다.
 */

const url = () => `/student/fundings/funding`;
const method = "POST";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestPreBody = z.object({
  clubId: z.coerce.number().int().min(1),
  purposeId: z.coerce.number().int().min(1).optional(),
  name: z.coerce.string().max(255),
  expenditureDate: z.coerce.date(),
  expenditureAmount: z.coerce.number().int().min(1),

  tradeEvidenceFiles: z.array(
    z.object({
      uid: z.coerce.string().max(255),
    }),
  ),
  tradeDetailFiles: z.array(
    z.object({
      uid: z.coerce.string().max(255),
    }),
  ),
  tradeDetailExplanation: z.coerce.string(),

  clubSuppliesName: z.coerce.string().max(255).optional(),
  clubSuppliesEvidenceEnumId: z.nativeEnum(FixtureEvidenceEnum).optional(),
  clubSuppliesClassEnumId: z.nativeEnum(FixtureClassEnum).optional(),
  clubSuppliesPurpose: z.coerce.string().optional(),
  clubSuppliesImageFiles: z.array(
    z.object({
      uid: z.coerce.string().max(255),
    }),
  ),
  clubSuppliesSoftwareEvidence: z.coerce.string().optional(),
  clubSuppliesSoftwareEvidenceFiles: z.array(
    z.object({
      uid: z.coerce.string().max(255),
    }),
  ),
  numberOfClubSupplies: z.coerce.number().int().min(1).optional(),
  priceOfClubSupplies: z.coerce.number().int().min(1).optional(),

  isFixture: z.coerce.boolean(),
  fixtureName: z.coerce.string().max(255).optional(),
  fixtureEvidenceEnumId: z.nativeEnum(FixtureEvidenceEnum).optional(),
  fixtureClassEnumId: z.nativeEnum(FixtureClassEnum).optional(),
  fixturePurpose: z.coerce.string().optional(),
  fixtureImageFiles: z.array(
    z.object({
      uid: z.coerce.string().max(255),
    }),
  ),
  fixtureSoftwareEvidence: z.coerce.string().optional(),
  fixtureSoftwareEvidenceFiles: z.array(
    z.object({
      uid: z.coerce.string().max(255),
    }),
  ),
  numberOfFixture: z.coerce.number().int().min(1).optional(),
  priceOfFixture: z.coerce.number().int().min(1).optional(),

  isTransportation: z.coerce.boolean(),
  transportationEnumId: z.nativeEnum(TransportationEnum).optional(),
  origin: z.coerce.string().max(255).optional(),
  destination: z.coerce.string().max(255).optional(),
  purposeOfTransportation: z.coerce.string().optional(),
  cargoList: z.coerce.string().optional(),
  placeValidity: z.coerce.string().optional(),
  transportationPassengers: z.array(
    z.object({
      studentNumber: z.coerce.string(),
    }),
  ),

  isNonCorporateTransaction: z.coerce.boolean(),
  traderName: z.coerce.string().max(255).optional(),
  traderAccountNumber: z.coerce.string().max(255).optional(),
  wasteExplanation: z.coerce.string().optional(),

  isFoodExpense: z.coerce.boolean(),
  isLaborContract: z.coerce.boolean(),
  isExternalEventParticipationFee: z.coerce.boolean(),
  isPublication: z.coerce.boolean(),
  isProfitMakingActivity: z.coerce.boolean(),
  isJointExpense: z.coerce.boolean(),
  isEtcExpense: z.coerce.boolean(),

  foodExpenseExplanation: z.coerce.string().optional(),
  laborContractExplanation: z.coerce.string().optional(),
  externalEventParticipationFeeExplanation: z.coerce.string().optional(),
  publicationExplanation: z.coerce.string().optional(),
  profitMakingActivityExplanation: z.coerce.string().optional(),
  jointExpenseExplanation: z.coerce.string().optional(),
  etcExpenseExplanation: z.coerce.string().optional(),

  foodExpenseFiles: z.array(
    z.object({
      uid: z.coerce.string().max(255),
    }),
  ),
  laborContractFiles: z.array(
    z.object({
      uid: z.coerce.string().max(255),
    }),
  ),
  externalEventParticipationFeeFiles: z.array(
    z.object({
      uid: z.coerce.string().max(255),
    }),
  ),
  publicationFiles: z.array(
    z.object({
      uid: z.coerce.string().max(255),
    }),
  ),
  profitMakingActivityFiles: z.array(
    z.object({
      uid: z.coerce.string().max(255),
    }),
  ),
  jointExpenseFiles: z.array(
    z.object({
      uid: z.coerce.string().max(255),
    }),
  ),
  etcExpenseFiles: z.array(
    z.object({
      uid: z.coerce.string().max(255),
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
      data.transportationEnumId === TransportationEnum.Others
    ) {
      if (!data.cargoList) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "cargoList is required",
        });
      }
    }
    if (
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
  [HttpStatusCode.Created]: z.object({}),
};

const responseErrorMap = {};

const apiFnd001 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiFnd001RequestParam = z.infer<typeof apiFnd001.requestParam>;
type ApiFnd001RequestQuery = z.infer<typeof apiFnd001.requestQuery>;
type ApiFnd001RequestBody = z.infer<typeof apiFnd001.requestBody>;
type ApiFnd001ResponseCreated = z.infer<
  (typeof apiFnd001.responseBodyMap)[201]
>;

export default apiFnd001;

export type {
  ApiFnd001RequestParam,
  ApiFnd001RequestQuery,
  ApiFnd001RequestBody,
  ApiFnd001ResponseCreated,
};

// funding superRefine test
const fndTest = () => {
  console.log(
    requestBody.parse({
      clubId: 10,
      purposeId: 1,
      name: "New Funding Application",
      expenditureDate: "2024-09-01",
      expenditureAmount: 5000,
      tradeEvidenceFiles: [
        {
          uid: "file-123",
        },
      ],
      tradeDetailFiles: [
        {
          uid: "file-124",
        },
      ],
      tradeDetailExplanation: "Details about the transaction.",

      clubSuppliesImageFiles: [
        {
          uid: "file-125",
        },
      ],
      clubSuppliesSoftwareEvidenceFiles: [],

      isFixture: true,
      fixtureImageFiles: [
        {
          uid: "file-126",
        },
      ],
      fixtureSoftwareEvidenceFiles: [],

      isTransportation: true,
      transportationEnumId: 6,

      transportationPassengers: [
        {
          studentNumber: "S100023",
        },
      ],
      isNonCorporateTransaction: false,
      isFoodExpense: true,
      foodExpenseFiles: [
        {
          uid: "file-127",
        },
      ],
      isLaborContract: false,
      isExternalEventParticipationFee: false,
      isPublication: false,
      isProfitMakingActivity: false,
      isJointExpense: false,
      isEtcExpense: false,
      laborContractFiles: [],
      externalEventParticipationFeeFiles: [],
      publicationFiles: [],
      profitMakingActivityFiles: [],
      jointExpenseFiles: [],
      etcExpenseFiles: [],
    }),
  );
};

export { fndTest };
