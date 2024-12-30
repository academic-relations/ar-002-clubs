import { HttpStatusCode } from "axios";
import { z } from "zod";

/**
 * @version v0.1
 * @description 회의공고에서 다음 회의 차수를 불러옵니다. 회의 종류에 대해서 올해 그 회의가 몇번 열렸는지 계산합니다.
 */

const url = () => `/executive/meetings/meeting/next-degree`;
const method = "GET";

const requestParam = z.object({});

const requestQuery = z.object({
  meetingEnumId: z.coerce.number().min(1),
});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    degree: z.coerce.number(),
  }),
};

const responseErrorMap = {};

const apiMee005 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiMee005RequestParam = z.infer<typeof apiMee005.requestParam>;
type ApiMee005RequestQuery = z.infer<typeof apiMee005.requestQuery>;
type ApiMee005RequestBody = z.infer<typeof apiMee005.requestBody>;
type ApiMee005ResponseOk = z.infer<(typeof apiMee005.responseBodyMap)[200]>;

export default apiMee005;

export type {
  ApiMee005RequestParam,
  ApiMee005RequestQuery,
  ApiMee005RequestBody,
  ApiMee005ResponseOk,
};
