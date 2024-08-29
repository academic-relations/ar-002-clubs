import { HttpStatusCode } from "axios";
import { z } from "zod";

import apiAct011 from "./apiAct011";

/**
 * @version v0.1
 * @description 교수용 신규등록 활동 리스트
 */

const url = () => `/professor/provisional/activities`;
const method = "GET";

const requestParam = z.object({});

const requestQuery = z.object({ clubId: z.coerce.number().int().min(1) });

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: apiAct011.responseBodyMap[HttpStatusCode.Ok],
};

const responseErrorMap = {};

const apiAct013 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiAct013RequestParam = z.infer<typeof apiAct013.requestParam>;
type ApiAct013RequestQuery = z.infer<typeof apiAct013.requestQuery>;
type ApiAct013RequestBody = z.infer<typeof apiAct013.requestBody>;
type ApiAct013ResponseOk = z.infer<(typeof apiAct013.responseBodyMap)[200]>;

export default apiAct013;

export type {
  ApiAct013RequestParam,
  ApiAct013RequestQuery,
  ApiAct013RequestBody,
  ApiAct013ResponseOk,
};
