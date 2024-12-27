import { HttpStatusCode } from "axios";
import { z } from "zod";

/**
 * @version v0.1
 * @description 지도교수가 동아리의 활동보고서를 승인했는지 여부를 조회합니다.
 */

const url = () => `/executive/activities/clubs/club/{clubId}/approve`;
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

const apiAct022 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiAct022RequestParam = z.infer<typeof apiAct022.requestParam>;
type ApiAct022RequestQuery = z.infer<typeof apiAct022.requestQuery>;
type ApiAct022RequestBody = z.infer<typeof apiAct022.requestBody>;
type ApiAct022ResponseOk = z.infer<(typeof apiAct022.responseBodyMap)[200]>;

export default apiAct022;

export type {
  ApiAct022RequestBody,
  ApiAct022RequestParam,
  ApiAct022RequestQuery,
  ApiAct022ResponseOk,
};
