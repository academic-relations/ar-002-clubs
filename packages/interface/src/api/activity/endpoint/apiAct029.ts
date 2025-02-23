import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zActivity, zActivityResponse } from "../type/activity.type";

/*
 * @version v0.1
 * @description 신규등록 가등록기간 활동보고서의 각 항목을 조회합니다.
 * 의결기구에서 조회될 것을 고려하여, 접근 권한에 제한을 두지 않습니다. (Student 이기만 하면 됩니다)
 * 기간에 제한을 두지 않습니다.
 */

const url = (activityId: number) =>
  `/student/activities/activity/${activityId}/provisional`;
export const ApiAct029RequestUrl =
  "/student/activities/activity/:activityId/provisional";
const method = "GET";

const requestParam = z.object({
  activityId: zActivity.pick({ id: true }).shape.id,
});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: zActivityResponse.omit({
    chargedExecutive: true,
    commentedExecutive: true,
  }),
};

const responseErrorMap = {};

const apiAct029 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiAct029RequestParam = z.infer<typeof apiAct029.requestParam>;
type ApiAct029RequestQuery = z.infer<typeof apiAct029.requestQuery>;
type ApiAct029RequestBody = z.infer<typeof apiAct029.requestBody>;
type ApiAct029ResponseOk = z.infer<(typeof apiAct029.responseBodyMap)[200]>;

export default apiAct029;

export type {
  ApiAct029RequestParam,
  ApiAct029RequestQuery,
  ApiAct029RequestBody,
  ApiAct029ResponseOk,
};
