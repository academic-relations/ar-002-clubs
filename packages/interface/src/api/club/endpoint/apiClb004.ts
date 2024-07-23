import { HttpStatusCode } from "axios";
import { z } from "zod";

/**
 * @version v0.1
 * @description 동아리의 기본 정보를 가져옵니다
 */

const url = () => `/student/clubs/club/{club_id}/brief`;
const method = "GET";

const requestParam = z.object({
  clubId: z.coerce.number().int().min(1),
});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    description: z.string(),
    roomPassword: z.string().max(20),
  }),
};

const responseErrorMap = {};

type ApiClb004RequestParam = z.infer<typeof apiClb004.requestParam>;
type ApiClb004RequestQuery = z.infer<typeof apiClb004.requestQuery>;
type ApiClb004RequestBody = z.infer<typeof apiClb004.requestBody>;
type ApiClb004ResponseOK = z.infer<(typeof apiClb004.responseBodyMap)[200]>;

const apiClb004 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

export default apiClb004;

export type {
  ApiClb004RequestParam,
  ApiClb004RequestQuery,
  ApiClb004RequestBody,
  ApiClb004ResponseOK,
};
