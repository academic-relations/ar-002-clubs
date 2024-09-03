import { HttpStatusCode } from "axios";
import { z } from "zod";

import apiAct011 from "./apiAct011";

/**
 * @version v0.1
 * @description 집행부용 신규등록 활동 리스트
 */

const url = () => `/executive/provisional/activities`;
const method = "GET";

const requestParam = z.object({});

const requestQuery = z.object({ clubId: z.coerce.number().int().min(1) });

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: apiAct011.responseBodyMap[HttpStatusCode.Ok],
};

const responseErrorMap = {};

const apiAct012 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiAct012RequestParam = z.infer<typeof apiAct012.requestParam>;
type ApiAct012RequestQuery = z.infer<typeof apiAct012.requestQuery>;
type ApiAct012RequestBody = z.infer<typeof apiAct012.requestBody>;
type ApiAct012ResponseOk = z.infer<(typeof apiAct012.responseBodyMap)[200]>;

export default apiAct012;

export type {
  ApiAct012RequestParam,
  ApiAct012RequestQuery,
  ApiAct012RequestBody,
  ApiAct012ResponseOk,
};
