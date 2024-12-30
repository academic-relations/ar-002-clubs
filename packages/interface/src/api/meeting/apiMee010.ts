import { HttpStatusCode } from "axios";
import { z } from "zod";

/**
 * @version v0.1
 * @description 하나의 회의에 대해 안건을 삭제합니다. (해당 안건을 하나의 회의에서 제외)
 */

const url = (meetingId: number, agendaId: number) =>
  `/executive/meetings/meeting/${meetingId}/agendas/agenda/${agendaId}`;
const method = "DELETE";

const requestParam = z.object({
  meetingId: z.coerce.number().int().min(1),
  agendaId: z.coerce.number().int().min(1),
});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({}),
};

const responseErrorMap = {};

const apiMee010 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiMee010RequestParam = z.infer<typeof apiMee010.requestParam>;
type ApiMee010RequestQuery = z.infer<typeof apiMee010.requestQuery>;
type ApiMee010RequestBody = z.infer<typeof apiMee010.requestBody>;
type ApiMee010ResponseOk = z.infer<(typeof apiMee010.responseBodyMap)[200]>;

export default apiMee010;

export type {
  ApiMee010RequestParam,
  ApiMee010RequestQuery,
  ApiMee010RequestBody,
  ApiMee010ResponseOk,
};
