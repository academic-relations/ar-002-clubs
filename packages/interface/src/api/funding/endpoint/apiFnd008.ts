import { HttpStatusCode } from "axios";
import { z } from "zod";

import {
  zClubSummary,
  zClubSummaryResponse,
} from "@sparcs-clubs/interface/api/club/type/club.type";
import { zExecutiveSummary } from "@sparcs-clubs/interface/api/user/type/user.type";

/**
 * @version v0.1
 * @description 집행부원을 위한 동아리별 지원금 내역을 조회합니다.
 */

// TODO: 변경 필요

const url = () => `/executive/fundings`;
const method = "GET";
export const ApiFnd008RequestUrl = "/executive/fundings";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    totalCount: z.number().min(0),
    appliedCount: z.number().min(0),
    approvedCount: z.number().min(0),
    partialCount: z.number().min(0),
    rejectedCount: z.number().min(0),
    committeeCount: z.number().min(0),
    clubs: zClubSummaryResponse
      .extend({
        appliedCount: z.number().min(0),
        approvedCount: z.number().min(0),
        partialCount: z.number().min(0),
        rejectedCount: z.number().min(0),
        committeeCount: z.number().min(0),
        chargedExecutive: zExecutiveSummary.nullable(),
      })
      .array(),
    executives: zExecutiveSummary
      .extend({
        appliedCount: z.number().min(0),
        approvedCount: z.number().min(0),
        partialCount: z.number().min(0),
        rejectedCount: z.number().min(0),
        committeeCount: z.number().min(0),
        chargedClubs: zClubSummary.array(),
      })
      .array(),
  }),
};

const responseErrorMap = {};

const apiFnd008 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiFnd008RequestParam = z.infer<typeof apiFnd008.requestParam>;
type ApiFnd008RequestQuery = z.infer<typeof apiFnd008.requestQuery>;
type ApiFnd008RequestBody = z.infer<typeof apiFnd008.requestBody>;
type ApiFnd008ResponseOk = z.infer<(typeof apiFnd008.responseBodyMap)[200]>;

export default apiFnd008;

export type {
  ApiFnd008RequestParam,
  ApiFnd008RequestQuery,
  ApiFnd008RequestBody,
  ApiFnd008ResponseOk,
};
