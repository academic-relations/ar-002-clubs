import { HttpStatusCode } from "axios";
import { z } from "zod";

import apiAct002 from "./apiAct002";

/**
 * @version v0.1
 * @description 활동보고서의 활동을 조회합니다
 * 교수로 로그인되어 있어야 합니다.
 * 활동보고서 작성 기간에 관계없이 조회 가능합니다.
 */

const url = (activityId: number) =>
  `/professor/activities/activity/${activityId}`;
const method = "GET";

const requestParam = z.object({
  activityId: z.coerce.number().int().min(1),
});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: apiAct002.responseBodyMap[HttpStatusCode.Ok],
};

const responseErrorMap = {};

const apiAct015 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiAct015RequestParam = z.infer<typeof apiAct015.requestParam>;
type ApiAct015RequestQuery = z.infer<typeof apiAct015.requestQuery>;
type ApiAct015RequestBody = z.infer<typeof apiAct015.requestBody>;
type ApiAct015ResponseOk = z.infer<(typeof apiAct015.responseBodyMap)[200]>;

export default apiAct015;

export type {
  ApiAct015RequestParam,
  ApiAct015RequestQuery,
  ApiAct015RequestBody,
  ApiAct015ResponseOk,
};
