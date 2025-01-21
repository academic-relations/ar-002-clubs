import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zFundingResponse } from "./type/funding.type";

/**
 * @version v0.1
 * @description 집행부원이 코멘트를 위해 지원금 신청의 항목을 조회합니다.
 */

// TODO: 변경 필요

const url = (id: number) => `/executive/fundings/funding/${id}`;
const method = "GET";
export const ApiFnd013RequestUrl = "/executive/fundings/funding/:id";

const requestParam = z.object({
  id: z.coerce.number().int().min(1),
});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: zFundingResponse,
};

const responseErrorMap = {};

const apiFnd013 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiFnd013RequestParam = z.infer<typeof apiFnd013.requestParam>;
type ApiFnd013RequestQuery = z.infer<typeof apiFnd013.requestQuery>;
type ApiFnd013RequestBody = z.infer<typeof apiFnd013.requestBody>;
type ApiFnd013ResponseOk = z.infer<(typeof apiFnd013.responseBodyMap)[200]>;

export default apiFnd013;

export type {
  ApiFnd013RequestParam,
  ApiFnd013RequestQuery,
  ApiFnd013RequestBody,
  ApiFnd013ResponseOk,
};
