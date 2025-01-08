import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zFundingRequest } from "./type/funding.type";

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

const requestBody = zFundingRequest;

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
