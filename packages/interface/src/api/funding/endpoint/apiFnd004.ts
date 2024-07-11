import { HttpStatusCode } from "axios";
import { z } from "zod";

/**
 * @version v0.1
 * @description 지원금 신청의 항목을 삭제합니다.
 */

const url = (id: number) => `/student/fundings/funding/${id}`;
const method = "DELETE";

const requestParam = z.object({
  id: z.coerce.number().int().min(1),
});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({}),
};

const responseErrorMap = {};

const apiFnd004 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiFnd004RequestParam = z.infer<typeof apiFnd004.requestParam>;
type ApiFnd004RequestQuery = z.infer<typeof apiFnd004.requestQuery>;
type ApiFnd004RequestBody = z.infer<typeof apiFnd004.requestBody>;
type ApiFnd004ResponseOk = z.infer<(typeof apiFnd004.responseBodyMap)[200]>;

export default apiFnd004;

export type {
  ApiFnd004RequestParam,
  ApiFnd004RequestQuery,
  ApiFnd004RequestBody,
  ApiFnd004ResponseOk,
};
