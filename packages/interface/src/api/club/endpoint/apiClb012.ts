import { HttpStatusCode } from "axios";
import { z } from "zod";

/**
 * @version v0.1
 * @description 동아리의 현재 신청된 대표자 변경을 취소합니다.
 */

const url = (clubId: number) =>
  `/student/clubs/club/${clubId}/delegates/delegate/requests`;
const method = "DELETE";

const requestParam = z.object({
  clubId: z.coerce.number().int().min(1),
});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Created]: z.object({}),
};

const responseErrorMap = {};

const apiClb012 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiClb012RequestParam = z.infer<typeof apiClb012.requestParam>;
type ApiClb012RequestQuery = z.infer<typeof apiClb012.requestQuery>;
type ApiClb012RequestBody = z.infer<typeof apiClb012.requestBody>;
type ApiClb012ResponseCreated = z.infer<
  (typeof apiClb012.responseBodyMap)[201]
>;

export default apiClb012;

export type {
  ApiClb012RequestParam,
  ApiClb012RequestQuery,
  ApiClb012RequestBody,
  ApiClb012ResponseCreated,
};
