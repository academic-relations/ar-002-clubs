import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zExecutiveSummary } from "@sparcs-clubs/interface/api/user/type/user.type";

import { zFundingSummaryResponse } from "../type/funding.type";

/**
 * @version v0.1
 * @description 집행부원이 코멘트를 위해 지원금 신청의 항목을 조회합니다.
 */

// TODO: 변경 필요

const url = (id: number) => `/executive/fundings/funding/${id}`;
const method = "GET";
export const ApiFnd010RequestUrl = "/executive/fundings/funding/:id";

const requestParam = z.object({
  id: z.coerce.number().int().min(1),
});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    totalCount: z.number().min(0),
    applyCount: z.number().min(0),
    approvedCount: z.number().min(0),
    partialCount: z.number().min(0),
    rejectedCount: z.number().min(0),
    committeeCount: z.number().min(0),
    fundings: zFundingSummaryResponse
      .extend({
        chargedExecutive: zExecutiveSummary.nullable(),
        commentedExecutive: zExecutiveSummary.nullable(),
      })
      .array(),
  }),
};

const responseErrorMap = {};

const apiFnd010 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiFnd010RequestParam = z.infer<typeof apiFnd010.requestParam>;
type ApiFnd010RequestQuery = z.infer<typeof apiFnd010.requestQuery>;
type ApiFnd010RequestBody = z.infer<typeof apiFnd010.requestBody>;
type ApiFnd010ResponseOk = z.infer<(typeof apiFnd010.responseBodyMap)[200]>;

export default apiFnd010;

export type {
  ApiFnd010RequestParam,
  ApiFnd010RequestQuery,
  ApiFnd010RequestBody,
  ApiFnd010ResponseOk,
};
