import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zActivitySummary } from "../activity/type/activity.type";
import { zClub } from "../club/type/club.type";

/**
 * @version v0.1
 * @description 현재 학기의 지원금 신청을 조회합니다.
 */

const url = () => "/student/fundings/activities";
const method = "GET";
export const ApiFnd007RequestUrl = "/student/fundings/activities";

const requestParam = z.object({});

const requestQuery = z.object({
  clubId: zClub.pick({ id: true }).shape.id, // TODO: clubId: zPickElement(zClub, "id"),
});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    activities: z.array(zActivitySummary),
  }),
};

const responseErrorMap = {};

const apiFnd007 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiFnd007RequestParam = z.infer<typeof apiFnd007.requestParam>;
type ApiFnd007RequestQuery = z.infer<typeof apiFnd007.requestQuery>;
type ApiFnd007RequestBody = z.infer<typeof apiFnd007.requestBody>;
type ApiFnd007ResponseOk = z.infer<(typeof apiFnd007.responseBodyMap)[200]>;

export default apiFnd007;

export type {
  ApiFnd007RequestBody,
  ApiFnd007RequestParam,
  ApiFnd007RequestQuery,
  ApiFnd007ResponseOk,
};
