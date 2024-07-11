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

const requestBody = z.object({
  clubID: z.coerce.number().int().min(1),
  purposeId: z.coerce.number().int().min(0),
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
type ApiFnd003ResponseCreated = z.infer<
  (typeof apiFnd003.responseBodyMap)[200]
>;

export default apiFnd003;

export type {
  ApiFnd003RequestParam,
  ApiFnd003RequestQuery,
  ApiFnd003RequestBody,
  ApiFnd003ResponseCreated,
};
