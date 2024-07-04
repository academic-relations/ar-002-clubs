import { HttpStatusCode } from "axios";
import { z } from "zod";

import { ActivityTypeEnum } from "@sparcs-clubs/interface/common/enum/activity.enum";

/**
 * @version v0.1
 * @description 활동보고서의 활동을 추가합니다
 */

const url = () => `/student/activities/activity`;
const method = "POST";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  clubId: z.coerce.number().int().min(1), // Club.id는 양의 정수로 가정
  name: z.coerce.string().max(255),
  activityTypeEnumId: z.nativeEnum(ActivityTypeEnum), // ActivityTypeEnum.id는 양의 정수로 가정
  startTerm: z.coerce.date(),
  endTerm: z.coerce.date(),
  location: z.string().max(255),
  purpose: z.string(),
  detail: z.string(),
  evidence: z.string(),
  evidenceFiles: z.array(
    z.object({
      uid: z.string().max(255),
    }),
  ),
  participants: z.array(
    z.object({
      studentId: z.coerce.number().min(1),
    }),
  ),
});

const responseBodyMap = {
  [HttpStatusCode.Created]: z.object({}),
};

const responseErrorMap = {};

const apiAct001 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiAct001RequestParam = z.infer<typeof apiAct001.requestParam>;
type ApiAct001RequestQuery = z.infer<typeof apiAct001.requestQuery>;
type ApiAct001RequestBody = z.infer<typeof apiAct001.requestBody>;
type ApiAct001ResponseCreated = z.infer<
  (typeof apiAct001.responseBodyMap)[201]
>;

export default apiAct001;

export type {
  ApiAct001RequestParam,
  ApiAct001RequestQuery,
  ApiAct001RequestBody,
  ApiAct001ResponseCreated,
};
