import { HttpStatusCode } from "axios";
import { z } from "zod";

/**
 * @version v0.1
 * @description 유저의 개인정보 제공 및 활용동의를 기록합니다.
 */

const url = () => `/user/privacy-policy/agree`;
const method = "POST";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Created]: z.object({}),
};

const responseErrorMap = {};

const apiUsr004 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiUsr004RequestParam = z.infer<typeof apiUsr004.requestParam>;
type ApiUsr004RequestQuery = z.infer<typeof apiUsr004.requestQuery>;
type ApiUsr004RequestBody = z.infer<typeof apiUsr004.requestBody>;
type ApiUsr004ResponseCreated = z.infer<
  (typeof apiUsr004.responseBodyMap)[201]
>;

export default apiUsr004;

export type {
  ApiUsr004RequestParam,
  ApiUsr004RequestQuery,
  ApiUsr004RequestBody,
  ApiUsr004ResponseCreated,
};
