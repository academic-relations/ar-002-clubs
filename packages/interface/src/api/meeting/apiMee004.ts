import { HttpStatusCode } from "axios";
import { z } from "zod";

/**
 * @version v0.1
 * @description 회의와 회의 공고를 삭제합니다
 */

const url = (announcementId: number) =>
  `/executive/meetings/announcements/announcement/${announcementId}`;
const method = "DELETE";

const requestParam = z.object({
  announcementId: z.coerce.number().int().min(1),
});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({}),
};

const responseErrorMap = {};

const apiMee004 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiMee004RequestParam = z.infer<typeof apiMee004.requestParam>;
type ApiMee004RequestQuery = z.infer<typeof apiMee004.requestQuery>;
type ApiMee004RequestBody = z.infer<typeof apiMee004.requestBody>;
type ApiMee004ResponseOk = z.infer<(typeof apiMee004.responseBodyMap)[200]>;

export default apiMee004;

export type {
  ApiMee004RequestBody,
  ApiMee004RequestParam,
  ApiMee004RequestQuery,
  ApiMee004ResponseOk,
};
