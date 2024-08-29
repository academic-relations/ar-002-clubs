import { HttpStatusCode } from "axios";
import { z } from "zod";

import { ActivityTypeEnum } from "@sparcs-clubs/interface/common/enum/activity.enum";

/**
 * @version v0.1
 * @description 활동보고서의 활동을 조회합니다
 * 집행부원으로 로그인되어 있어야 합니다.
 * 활동보고서 작성 기간에 관계없이 조회 가능합니다.
 */

const url = (activityId: number) =>
  `/executive/activities/activity/${activityId}`;
const method = "GET";

const requestParam = z.object({
  activityId: z.coerce.number().int().min(1),
});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    clubId: z.coerce.number().int().min(1),
    originalName: z.string().max(255),
    name: z.string().max(255),
    activityTypeEnumId: z.nativeEnum(ActivityTypeEnum),
    durations: z.array(
      z.object({
        startTerm: z.coerce.date(),
        endTerm: z.coerce.date(),
      }),
    ),
    location: z.string().max(255),
    purpose: z.string(),
    detail: z.string(),
    evidence: z.string(),
    evidenceFiles: z.array(
      z.object({
        uuid: z.string().max(255),
      }),
    ),
    participants: z.array(
      z.object({
        studentId: z.coerce.number().int().min(1),
      }),
    ),
  }),
};

const responseErrorMap = {};

const apiAct014 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiAct014RequestParam = z.infer<typeof apiAct014.requestParam>;
type ApiAct014RequestQuery = z.infer<typeof apiAct014.requestQuery>;
type ApiAct014RequestBody = z.infer<typeof apiAct014.requestBody>;
type ApiAct014ResponseOk = z.infer<(typeof apiAct014.responseBodyMap)[200]>;

export default apiAct014;

export type {
  ApiAct014RequestParam,
  ApiAct014RequestQuery,
  ApiAct014RequestBody,
  ApiAct014ResponseOk,
};