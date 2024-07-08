import { HttpStatusCode } from "axios";
import { z } from "zod";

import {
  ActivityStatusEnum,
  ActivityTypeEnum,
} from "@sparcs-clubs/interface/common/enum/activity.enum";

/**
 * @version v0.1
 * @description 현재 학기의 활동보고서를 조회합니다.
 */

const url = () => `/student/activities`;
const method = "GET";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  clubId: z.coerce.number().int().min(1),
});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z
    .object({
      id: z.coerce.number().int().min(1),
      activityStatusEnumId: z.nativeEnum(ActivityStatusEnum),
      name: z.string().max(255),
      activityTypeEnumId: z.nativeEnum(ActivityTypeEnum),
      startTerm: z.coerce.date(),
      endTerm: z.coerce.date(),
    })
    .array(),
};

const responseErrorMap = {};

const apiAct005 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiAct005RequestParam = z.infer<typeof apiAct005.requestParam>;
type ApiAct005RequestQuery = z.infer<typeof apiAct005.requestQuery>;
type ApiAct005RequestBody = z.infer<typeof apiAct005.requestBody>;
type ApiAct005ResponseOk = z.infer<(typeof apiAct005.responseBodyMap)[200]>;

export default apiAct005;

export type {
  ApiAct005RequestParam,
  ApiAct005RequestQuery,
  ApiAct005RequestBody,
  ApiAct005ResponseOk,
};
