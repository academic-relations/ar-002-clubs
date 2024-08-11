import { HttpStatusCode } from "axios";
import { z } from "zod";

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

const resquestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({}),
};

const responseErrorMap = {};

const apiAct007 = {
  url,
  method,
  requestParam,
  requestQuery,
  resquestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiAct007RequestParam = z.infer<typeof apiAct007.requestParam>;
type ApiAct007RequestQuery = z.infer<typeof apiAct007.requestQuery>;
type ApiAct007RequestBody = z.infer<typeof apiAct007.resquestBody>;
type ApiAct007ResponseOk = z.infer<(typeof apiAct007.responseBodyMap)[200]>;

export default apiAct007;

export type {
  ApiAct007RequestParam,
  ApiAct007RequestQuery,
  ApiAct007RequestBody,
  ApiAct007ResponseOk,
};
