import { HttpStatusCode } from "axios";
import { z } from "zod";

/**
 * @version v0.1
 * @description 로그인을 시도합니다
 */

const url = () => `/auth/sign-in`;
const method = "GET";

const requestParam = z.object({});

const requestQuery = z.object({
  next: z.string().optional(),
});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({}),
};

const responseErrorMap = {};

const apiAut001 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiAut001RequestParam = z.infer<typeof apiAut001.requestParam>;
type ApiAut001RequestQuery = z.infer<typeof apiAut001.requestQuery>;
type ApiAut001RequestBody = z.infer<typeof apiAut001.requestBody>;
type ApiAut001ResponseOk = z.infer<(typeof apiAut001.responseBodyMap)[200]>;

export default apiAut001;

export type {
  ApiAut001RequestParam,
  ApiAut001RequestQuery,
  ApiAut001RequestBody,
  ApiAut001ResponseOk,
};
