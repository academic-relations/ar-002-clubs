import { HttpStatusCode } from "axios";
import { z } from "zod";

/**
 * @version v0.1
 * @description 로그인을 시도합니다
 */

const url = () => `/auth/sign-in/callback`;
const method = "GET";

const requestParam = z.object({});

const requestQuery = z.object({
  state: z.string(),
  code: z.string(),
});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({}),
};

const responseErrorMap = {};

const apiAut004 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiAut004RequestParam = z.infer<typeof apiAut004.requestParam>;
type ApiAut004RequestQuery = z.infer<typeof apiAut004.requestQuery>;
type ApiAut004RequestBody = z.infer<typeof apiAut004.requestBody>;
type ApiAut004ResponseOk = z.infer<(typeof apiAut004.responseBodyMap)[200]>;

export default apiAut004;

export type {
  ApiAut004RequestParam,
  ApiAut004RequestQuery,
  ApiAut004RequestBody,
  ApiAut004ResponseOk,
};
