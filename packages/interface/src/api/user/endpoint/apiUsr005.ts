import { HttpStatusCode } from "axios";
import { z } from "zod";

/**
 * @version v0.1
 * @description 유저의 개인정보 제공 및 활용동의를 조회합니다.
 */

const url = () => `/user/privacy-policy/status`;
const method = "GET";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    status: z.object({
      isAgree: z.coerce.boolean(),
      updatedAt: z.coerce.date().optional(),
    }),
  }),
};

const responseErrorMap = {};

const apiUsr005 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiUsr005RequestParam = z.infer<typeof apiUsr005.requestParam>;
type ApiUsr005RequestQuery = z.infer<typeof apiUsr005.requestQuery>;
type ApiUsr005RequestBody = z.infer<typeof apiUsr005.requestBody>;
type ApiUsr005ResponseOk = z.infer<(typeof apiUsr005.responseBodyMap)[200]>;

export default apiUsr005;

export type {
  ApiUsr005RequestParam,
  ApiUsr005RequestQuery,
  ApiUsr005RequestBody,
  ApiUsr005ResponseOk,
};
