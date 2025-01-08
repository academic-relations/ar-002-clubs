import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zFundingRequest } from "./type/funding.type";

/**
 * @version v0.1
 * @description 지원금 신청의 항목을 추가합니다.
 */

const url = () => `/student/fundings/funding`;
const method = "POST";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = zFundingRequest;

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
