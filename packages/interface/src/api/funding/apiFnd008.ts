import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zActivityBase } from "../activity/type/activity.type";
import { zStudentSummary } from "../user/type/user.type";

/**
 * @version v0.1
 * @description 선택된 학기 활동보고서의 참여 인원을 불러옵니다.
 */

const url = () => "/student/fundings/activities/participants";
const method = "GET";
export const ApiFnd008RequestUrl = "/student/fundings/activities/participants";

const requestParam = z.object({});

const requestQuery = z.object({
  activityId: zActivityBase.pick({ id: true }).shape.id, // TODO: clubId: zPickElement(zClub, "id"),
});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    participants: z.array(zStudentSummary),
  }),
};

const responseErrorMap = {};

const apiFnd008 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiFnd008RequestParam = z.infer<typeof apiFnd008.requestParam>;
type ApiFnd008RequestQuery = z.infer<typeof apiFnd008.requestQuery>;
type ApiFnd008RequestBody = z.infer<typeof apiFnd008.requestBody>;
type ApiFnd008ResponseOk = z.infer<(typeof apiFnd008.responseBodyMap)[200]>;

export default apiFnd008;

export type {
  ApiFnd008RequestBody,
  ApiFnd008RequestParam,
  ApiFnd008RequestQuery,
  ApiFnd008ResponseOk,
};
