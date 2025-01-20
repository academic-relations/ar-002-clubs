import { HttpStatusCode } from "axios";
import { z } from "zod";

/**
 * @version v0.1
 * @description 투표 전, 특정 회의에 속한 안건에 달리는 투표를 열람합니다.
 */

const url = (meetingId: number, agendaId: number, voteId: number) =>
  `/executive/meetings/meeting/${meetingId}/agendas/agenda/${agendaId}/votes/vote/${voteId}`;
const method = "GET";

const requestParam = z.object({
  meetingId: z.coerce.number().int().min(1),
  agendaId: z.coerce.number().int().min(1),
  voteId: z.coerce.number().int().min(1),
});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    title: z.coerce.string().max(255),
    description: z.coerce.string(),
    choices: z.array(
      z.object({
        id: z.coerce.number().int().min(1), // CHACHA: choiceId.
        choice: z.coerce.string().max(255),
      }),
    ),
  }),
};

const responseErrorMap = {};

const apiMee024 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiMee024RequestParam = z.infer<typeof apiMee024.requestParam>;
type ApiMee024RequestQuery = z.infer<typeof apiMee024.requestQuery>;
type ApiMee024RequestBody = z.infer<typeof apiMee024.requestBody>;
type ApiMee024ResponseOk = z.infer<(typeof apiMee024.responseBodyMap)[200]>;

export default apiMee024;

export type {
  ApiMee024RequestBody,
  ApiMee024RequestParam,
  ApiMee024RequestQuery,
  ApiMee024ResponseOk,
};
