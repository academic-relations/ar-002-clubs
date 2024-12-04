import { HttpStatusCode } from "axios";
import { z } from "zod";

/**
 * @version v0.1
 * @description 다른 회의에서 이미 존재하는 안건을 불러와서 현재 회의와의 새로운 Mapping을 추가합니다.
 */

const url = (meetingId: number, agendaId: number) =>
  `/executive/meetings/meeting/${meetingId}/agendas/agenda/${agendaId}`;
const method = "POST";

const requestParam = z.object({
  meetingId: z.coerce.number().int().min(1),
  agendaId: z.coerce.number().int().min(1),
});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Created]: z.object({}),
};

const responseErrorMap = {};

const apiMee011 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiMee011RequestParam = z.infer<typeof apiMee011.requestParam>;
type ApiMee011RequestQuery = z.infer<typeof apiMee011.requestQuery>;
type ApiMee011RequestBody = z.infer<typeof apiMee011.requestBody>;
type ApiMee011ResponseCreated = z.infer<
  (typeof apiMee011.responseBodyMap)[201]
>;

export default apiMee011;

export type {
  ApiMee011RequestParam,
  ApiMee011RequestQuery,
  ApiMee011RequestBody,
  ApiMee011ResponseCreated,
};
