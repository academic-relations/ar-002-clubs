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

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    id: z.number().int().min(1),
    activityStatusEnumId: z.nativeEnum(ActivityStatusEnum),
    name: z.string().max(255),
    activityTypeEnumId: z.nativeEnum(ActivityTypeEnum),
    startTerm: z.coerce.date(),
    endTerm: z.coerce.date(),
  }),
};

const responseErrorMap = {};

const apiAct002 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiAct002RequestParam = z.infer<typeof apiAct002.requestParam>;
type ApiAct002RequestQuery = z.infer<typeof apiAct002.requestQuery>;
type ApiAct002RequestBody = z.infer<typeof apiAct002.requestBody>;
type ApiAct002ResponseOk = z.infer<(typeof apiAct002.responseBodyMap)[200]>;

export default apiAct002;

export type {
  ApiAct002RequestParam,
  ApiAct002RequestQuery,
  ApiAct002RequestBody,
  ApiAct002ResponseOk,
};
