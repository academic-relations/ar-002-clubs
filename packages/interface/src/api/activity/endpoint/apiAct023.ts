import { HttpStatusCode } from "axios";
import { z } from "zod";

/**
 * @version v0.1
 * @description 지도교수가 동아리의 활동보고서를 승인했는지 여부를 조회합니다.
 */

const url = () => `/professor/activities/clubs/club/{clubId}/approve`;
const method = "GET";

const requestParam = z.object({
  clubId: z.coerce.number().int().min(1),
});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    isApproved: z.boolean(),
    approvedAt: z.date(),
  }),
};

const responseErrorMap = {};

const apiAct023 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiAct023RequestParam = z.infer<typeof apiAct023.requestParam>;
type ApiAct023RequestQuery = z.infer<typeof apiAct023.requestQuery>;
type ApiAct023RequestBody = z.infer<typeof apiAct023.requestBody>;
type ApiAct023ResponseOk = z.infer<(typeof apiAct023.responseBodyMap)[200]>;

export default apiAct023;

export type {
  ApiAct023RequestBody,
  ApiAct023RequestParam,
  ApiAct023RequestQuery,
  ApiAct023ResponseOk,
};
