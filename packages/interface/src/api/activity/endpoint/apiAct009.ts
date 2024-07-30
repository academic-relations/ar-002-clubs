import { HttpStatusCode } from "axios";
import { z } from "zod";

/**
 * @version v0.1
 * @description 동아리가 활동한 활동 기간 리스트를 조회합니다.
 * - 동아리 대표자 또는 대의원으로 로그인되어 있어야 합니다.
 */

const url = () => `/student/activities/activity-terms`;
const method = "GET";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  clubId: z.coerce.number().int().min(1),
});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    terms: z.array(
      z.object({
        id: z.coerce.number().int().min(1),
        year: z.coerce.number().int().min(1900),
        name: z.string().max(255),
        startTerm: z.coerce.date(),
        endTerm: z.coerce.date(),
      }),
    ),
  }),
};

const responseErrorMap = {};

const apiAct009 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiAct009RequestParam = z.infer<typeof apiAct009.requestParam>;
type ApiAct009RequestQuery = z.infer<typeof apiAct009.requestQuery>;
type ApiAct009RequestBody = z.infer<typeof apiAct009.requestBody>;
type ApiAct009ResponseOk = z.infer<(typeof apiAct009.responseBodyMap)[200]>;

export default apiAct009;

export type {
  ApiAct009RequestParam,
  ApiAct009RequestQuery,
  ApiAct009RequestBody,
  ApiAct009ResponseOk,
};
