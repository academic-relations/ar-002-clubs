import { HttpStatusCode } from "axios";
import { z } from "zod";

import {
  FixtureClassEnum,
  FixtureEvidenceEnum,
  FundingOrderStatusEnum,
  TransportationEnum,
} from "@sparcs-clubs/interface/common/enum/funding.enum";

/**
 * @version v0.1
 * @description 지원금 신청의 항목을 조회합니다.
 */

const url = (id: number) => `/student/fundings/funding/${id}`;
const method = "GET";

const requestParam = z.object({
  id: z.coerce.number().int().min(1),
});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    clubID: z.coerce.number().int().min(1),
    purposeId: z.coerce.number().int().min(0),
    name: z.coerce.string().max(255),
    expenditureDate: z.coerce.date(),
    expenditureAmount: z.coerce.number().int().min(1),
    FundingOrderStatusEnumId: z.nativeEnum(FundingOrderStatusEnum),
    feedback: z.coerce.string(),
    tradeEvidenceFiles: z.array(
      z.object({
        uid: z.coerce.string().max(255),
        link: z.coerce.string(),
      }),
    ),
    tradeDetailFiles: z.array(
      z.object({
        uid: z.coerce.string().max(255),
        link: z.coerce.string(),
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
        link: z.coerce.string(),
      }),
    ),
    clubSuppliesSoftwareEvidence: z.coerce.string().optional(),
    clubSuppliesSoftwareEvidenceFiles: z.array(
      z.object({
        uid: z.coerce.string().max(255),
        link: z.coerce.string(),
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
        link: z.coerce.string(),
      }),
    ),
    fixtureSoftwareEvidence: z.coerce.string().optional(),
    fixtureSoftwareEvidenceFiles: z.array(
      z.object({
        uid: z.coerce.string().max(255),
        link: z.coerce.string(),
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
        name: z.coerce.string(),
      }),
    ),

    isNonCorporateTransaction: z.coerce.boolean(),
    traderName: z.coerce.string().max(255),
    traderAccountNumber: z.coerce.string().max(255),
    wasteExplanation: z.coerce.string(),

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
        link: z.coerce.string(),
      }),
    ),
    laborContractFiles: z.array(
      z.object({
        uid: z.coerce.string().max(255),
        link: z.coerce.string(),
      }),
    ),
    externalEventParticipationFeeFiles: z.array(
      z.object({
        uid: z.coerce.string().max(255),
        link: z.coerce.string(),
      }),
    ),
    publicationFiles: z.array(
      z.object({
        uid: z.coerce.string().max(255),
        link: z.coerce.string(),
      }),
    ),
    profitMakingActivityFiles: z.array(
      z.object({
        uid: z.coerce.string().max(255),
        link: z.coerce.string(),
      }),
    ),
    jointExpenseFiles: z.array(
      z.object({
        uid: z.coerce.string().max(255),
        link: z.coerce.string(),
      }),
    ),
    etcExpenseFiles: z.array(
      z.object({
        uid: z.coerce.string().max(255),
        link: z.coerce.string(),
      }),
    ),
  }),
};

const responseErrorMap = {};

const apiFnd002 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiFnd002RequestParam = z.infer<typeof apiFnd002.requestParam>;
type ApiFnd002RequestQuery = z.infer<typeof apiFnd002.requestQuery>;
type ApiFnd002RequestBody = z.infer<typeof apiFnd002.requestBody>;
type ApiFnd002ResponseCreated = z.infer<
  (typeof apiFnd002.responseBodyMap)[200]
>;

export default apiFnd002;

export type {
  ApiFnd002RequestParam,
  ApiFnd002RequestQuery,
  ApiFnd002RequestBody,
  ApiFnd002ResponseCreated,
};
