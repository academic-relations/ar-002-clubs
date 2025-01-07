import { HttpStatusCode } from "axios";
import { z } from "zod";

/**
 * @version v0.1
 * @description 특정 회의에 속한 안건에 달리는 투표에 대한 유저의 선택지를 변경합니다.
 */

const url = (meetingId: number, agendaId: number, voteId: number) =>
  `/executive/meetings/meeting/${meetingId}/agendas/agenda/${agendaId}/votes/vote/${voteId}`;
const method = "PATCH";

const requestParam = z.object({
  meetingId: z.coerce.number().int().min(1),
  agendaId: z.coerce.number().int().min(1),
  voteId: z.coerce.number().int().min(1),
});

const requestQuery = z.object({});

const requestBody = z.object({
  choiceId: z.coerce.number().int().min(1),
});

const responseBodyMap = {
  [HttpStatusCode.Created]: z.object({}),
};

const responseErrorMap = {};

const apiMee020 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiMee020RequestParam = z.infer<typeof apiMee020.requestParam>;
type ApiMee020RequestQuery = z.infer<typeof apiMee020.requestQuery>;
type ApiMee020RequestBody = z.infer<typeof apiMee020.requestBody>;
type ApiMee020ResponseOk = z.infer<(typeof apiMee020.responseBodyMap)[201]>;

export default apiMee020;

export type {
  ApiMee020RequestBody,
  ApiMee020RequestParam,
  ApiMee020RequestQuery,
  ApiMee020ResponseOk,
};
