import { HttpStatusCode } from "axios";
import { z } from "zod";

/**
 * @version v0.1
 * @description 지도교수가 동아리의 활동보고서를 승인했는지 여부를 조회합니다.
 */

const url = () => `/student/activities/clubs/club/{clubId}/approve`;
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

const apiAct021 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiAct021RequestParam = z.infer<typeof apiAct021.requestParam>;
type ApiAct021RequestQuery = z.infer<typeof apiAct021.requestQuery>;
type ApiAct021RequestBody = z.infer<typeof apiAct021.requestBody>;
type ApiAct021ResponseOk = z.infer<(typeof apiAct021.responseBodyMap)[200]>;

export default apiAct021;

export type {
  ApiAct021RequestBody,
  ApiAct021RequestParam,
  ApiAct021RequestQuery,
  ApiAct021ResponseOk,
};
