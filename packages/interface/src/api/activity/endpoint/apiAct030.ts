import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zActivityDuration } from "../type/activity.duration.type";

/*
 * @version v0.1
 * @description 신규등록 가등록기간 활동보고서를 작성하기 위해, 해당 동아리의 가등록 기간 활동보고서 작성이 가능한 기간을 조회합니다.
 * 동아리 대표자 및 대의원만 접근이 가능합니다.
 * 프로필을 이용하여 자동으로 동아리 대표자 및 대의원 여부를 판단합니다.
 * 기간에 제한을 두지 않습니다.
 * 중복된 activityDuration 은 제거합니다.
 */

const url = () =>
  `/student/activities/activity/provisional/available-durations`;
export const ApiAct030RequestUrl =
  "/student/activities/activity/provisional/available-durations";
const method = "GET";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    activityDurations: z.array(zActivityDuration),
  }),
};

const responseErrorMap = {};

const apiAct030 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiAct030RequestParam = z.infer<typeof apiAct030.requestParam>;
type ApiAct030RequestQuery = z.infer<typeof apiAct030.requestQuery>;
type ApiAct030RequestBody = z.infer<typeof apiAct030.requestBody>;
type ApiAct030ResponseOk = z.infer<(typeof apiAct030.responseBodyMap)[200]>;

export default apiAct030;

export type {
  ApiAct030RequestParam,
  ApiAct030RequestQuery,
  ApiAct030RequestBody,
  ApiAct030ResponseOk,
};
