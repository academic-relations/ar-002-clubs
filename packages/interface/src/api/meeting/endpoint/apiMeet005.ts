import { HttpStatusCode } from "axios";
import { z } from "zod";

/**
 * @version v0.1
 * @description 회의공고에서 다음 회의 차수를 불러옵니다.
 */

const url = () => `/executive/meetings/meeting/next`;
const method = "GET";

const requestParam = z.object({});

const requestQuery = z.object({
  meetingTypeId: z.coerce.number().int().min(1).optional(),
});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    degree: z.coerce.number(),
  }),
};

const responseErrorMap = {};

const apiMeet005 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiMeet005RequestParam = z.infer<typeof apiMeet005.requestParam>;
type ApiMeet005RequestQuery = z.infer<typeof apiMeet005.requestQuery>;
type ApiMeet005RequestBody = z.infer<typeof apiMeet005.requestBody>;
type ApiMeet005ResponseOk = z.infer<(typeof apiMeet005.responseBodyMap)[200]>;

export default apiMeet005;

export type {
  ApiMeet005RequestParam,
  ApiMeet005RequestQuery,
  ApiMeet005RequestBody,
  ApiMeet005ResponseOk,
};
