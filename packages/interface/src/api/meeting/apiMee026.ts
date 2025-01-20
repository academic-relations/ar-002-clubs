import { HttpStatusCode } from "axios";
import { z } from "zod";

/**
 * @version v0.1
 * @description 투표 마감 후, 특정 회의에 속한 안건에 달리는 투표의 최종 결과를 열람합니다.
 */

const url = (meetingId: number, agendaId: number, voteId: number) =>
  `/executive/meetings/meeting/${meetingId}/agendas/agenda/${agendaId}/votes/vote/${voteId}/results/final`; // CHACHA: 뭔가 이상한데 어쩔 수 없었어요
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
    results: z.array(
      z.object({
        id: z.coerce.number().int().min(1), // CHACHA: choiceId.
        votes: z.coerce.number().int().min(0),
      }),
    ),
  }),
};

const responseErrorMap = {};

const apiMee026 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiMee026RequestParam = z.infer<typeof apiMee026.requestParam>;
type ApiMee026RequestQuery = z.infer<typeof apiMee026.requestQuery>;
type ApiMee026RequestBody = z.infer<typeof apiMee026.requestBody>;
type ApiMee026ResponseOk = z.infer<(typeof apiMee026.responseBodyMap)[200]>;

export default apiMee026;

export type {
  ApiMee026RequestBody,
  ApiMee026RequestParam,
  ApiMee026RequestQuery,
  ApiMee026ResponseOk,
};
