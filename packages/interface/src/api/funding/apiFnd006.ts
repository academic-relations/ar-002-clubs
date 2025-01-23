import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zFundingResponseSummary } from "./type/funding.type";

/**
 * @version v0.1
 * @description 특정 학기의 지원금 신청을 조회합니다.
 */

const url = (activityDId: number) =>
  `/student/fundings/activity-durations/activity-duration/${activityDId}`;
const method = "GET";

const requestParam = z.object({
  activityDId: z.coerce.number().int().min(1),
});

const requestQuery = z.object({
  clubId: z.coerce.number().int().min(1),
});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    fundings: z.array(zFundingResponseSummary),
  }),
};

const responseErrorMap = {};

const apiFnd006 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiFnd006RequestParam = z.infer<typeof apiFnd006.requestParam>;
type ApiFnd006RequestQuery = z.infer<typeof apiFnd006.requestQuery>;
type ApiFnd006RequestBody = z.infer<typeof apiFnd006.requestBody>;
type ApiFnd006ResponseOk = z.infer<(typeof apiFnd006.responseBodyMap)[200]>;

export default apiFnd006;

export type {
  ApiFnd006RequestBody,
  ApiFnd006RequestParam,
  ApiFnd006RequestQuery,
  ApiFnd006ResponseOk,
};
