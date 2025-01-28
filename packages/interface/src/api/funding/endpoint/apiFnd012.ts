import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zFundingResponse } from "../type/funding.type";

/**
 * @version v0.1
 * @description 집행부원이 코멘트를 위해 지원금 신청의 항목을 조회합니다.
 */

// TODO: 변경 필요

const url = (id: number) => `/executive/fundings/funding/${id}`;
const method = "GET";
export const ApiFnd012RequestUrl = "/executive/fundings/funding/:id";

const requestParam = z.object({
  id: z.coerce.number().int().min(1),
});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: zFundingResponse,
};

const responseErrorMap = {};

const apiFnd012 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiFnd012RequestParam = z.infer<typeof apiFnd012.requestParam>;
type ApiFnd012RequestQuery = z.infer<typeof apiFnd012.requestQuery>;
type ApiFnd012RequestBody = z.infer<typeof apiFnd012.requestBody>;
type ApiFnd012ResponseOk = z.infer<(typeof apiFnd012.responseBodyMap)[200]>;

export default apiFnd012;

export type {
  ApiFnd012RequestParam,
  ApiFnd012RequestQuery,
  ApiFnd012RequestBody,
  ApiFnd012ResponseOk,
};
