import { HttpStatusCode } from "axios";
import { z } from "zod";

/**
 * @version v0.1
 * @description 회의공고 (=회의를 삭제합니다)
 */

const url = (announcementId: number) =>
  `/meetings/announcements/announcement/${announcementId}`;
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

const apiMeet004 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiMeet004RequestParam = z.infer<typeof apiMeet004.requestParam>;
type ApiMeet004RequestQuery = z.infer<typeof apiMeet004.requestQuery>;
type ApiMeet004RequestBody = z.infer<typeof apiMeet004.requestBody>;
type ApiMeet004ResponseOk = z.infer<(typeof apiMeet004.responseBodyMap)[200]>;

export default apiMeet004;

export type {
  ApiMeet004RequestParam,
  ApiMeet004RequestQuery,
  ApiMeet004RequestBody,
  ApiMeet004ResponseOk,
};
