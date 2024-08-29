import { HttpStatusCode } from "axios";
import { z } from "zod";

/**
 * @version v0.1
 * @description
 */

const url = () => `/auth/sign-out`;
const method = "POST";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Created]: z.object({}),
};

const responseErrorMap = {};

const apiAut003 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiAut003RequestParam = z.infer<typeof apiAut003.requestParam>;
type ApiAut003RequestQuery = z.infer<typeof apiAut003.requestQuery>;
type ApiAut003RequestBody = z.infer<typeof apiAut003.requestBody>;
type ApiAut003ResponseOk = z.infer<(typeof apiAut003.responseBodyMap)[201]>;

export default apiAut003;

export type {
  ApiAut003RequestParam,
  ApiAut003RequestQuery,
  ApiAut003RequestBody,
  ApiAut003ResponseOk,
};
