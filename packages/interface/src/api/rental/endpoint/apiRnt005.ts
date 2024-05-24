import { HttpStatusCode } from "axios";
import { z } from "zod";

/**
 * @version v0.1
 * @description 신청한 대여 정보를 삭제합니다
 */

const url = (id: number) => `/student/rentals/rental/${id}`;
const method = "DELETE";

const requestParam = z.object({
  id: z.number().int().min(0),
});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({}),
};

const responseErrorMap = {};

const apiRnt005 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiRnt005RequestParam = z.infer<typeof apiRnt005.requestParam>;
type ApiRnt005RequestQuery = z.infer<typeof apiRnt005.requestQuery>;
type ApiRnt005RequestBody = z.infer<typeof apiRnt005.requestBody>;
type ApiRnt005ResponseOK = z.infer<(typeof apiRnt005.responseBodyMap)[200]>;

export default apiRnt005;

export type {
  ApiRnt005RequestParam,
  ApiRnt005RequestQuery,
  ApiRnt005RequestBody,
  ApiRnt005ResponseOK,
};
