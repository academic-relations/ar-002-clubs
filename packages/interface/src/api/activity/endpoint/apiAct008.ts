import { HttpStatusCode } from "axios";
import { z } from "zod";

import { ActivityTypeEnum } from "@sparcs-clubs/interface/common/enum/activity.enum";

/**
 * @version v0.1
 * @description 활동보고서의 활동을 수정합니다.(가동아리 동아리 신규등록 신청을 위한 얘외적 호라동보고서 수정 기능입니다.)
 */

const url = (applyId: string) =>
  `/student/activities/activity/${applyId}/provisional`;
const method = "PUT";

const requestParam = z.object({
  applyId: z.coerce.number().int().min(1),
});

const requestQuery = z.object({});

const resquestBody = z.object({
  name: z.coerce.string().max(255),
  activityTypeEnumId: z.nativeEnum(ActivityTypeEnum),
  durations: z.array(
    z.object({
      startTerm: z.coerce.date(),
      endTerm: z.coerce.date(),
    }),
  ),
  location: z.coerce.string().max(255),
  purpose: z.coerce.string(),
  detail: z.coerce.string(),
  evidence: z.coerce.string(),
  evidenceFiles: z.array(
    z.object({
      fileId: z.coerce.string().max(255),
    }),
  ),
  participants: z.array(
    z.object({
      studentId: z.coerce.number().int().min(1),
    }),
  ),
});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({}),
};

const responseErrorMap = {};

const apiAct008 = {
  url,
  method,
  requestParam,
  requestQuery,
  resquestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiAct008RequestParam = z.infer<typeof apiAct008.requestParam>;
type ApiAct008RequestQuery = z.infer<typeof apiAct008.requestQuery>;
type ApiAct008RequestBody = z.infer<typeof apiAct008.resquestBody>;
type ApiAct008ResponseOk = z.infer<(typeof apiAct008.responseBodyMap)[200]>;

export default apiAct008;

export type {
  ApiAct008RequestParam,
  ApiAct008RequestQuery,
  ApiAct008RequestBody,
  ApiAct008ResponseOk,
};
