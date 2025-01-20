import { HttpStatusCode } from "axios";
import { z } from "zod";

/**
 * @version v0.1
 * @description 투표 중, 특정 회의에 속한 안건에 달리는 투표를 열람합니다. (유저의 선택 결과도 함께 열람)
 */

const url = (meetingId: number, agendaId: number, voteId: number) =>
  `/executive/meetings/meeting/${meetingId}/agendas/agenda/${agendaId}/votes/vote/${voteId}/results`; // CHACHA: 선택 결과만 가져오는 건 아니에요!
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
    choiceId: z.coerce.number().int().min(1), // CHACHA: what user chose, choiceId
  }),
};

const responseErrorMap = {};

const apiMee025 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiMee025RequestParam = z.infer<typeof apiMee025.requestParam>;
type ApiMee025RequestQuery = z.infer<typeof apiMee025.requestQuery>;
type ApiMee025RequestBody = z.infer<typeof apiMee025.requestBody>;
type ApiMee025ResponseOk = z.infer<(typeof apiMee025.responseBodyMap)[200]>;

export default apiMee025;

export type {
  ApiMee025RequestBody,
  ApiMee025RequestParam,
  ApiMee025RequestQuery,
  ApiMee025ResponseOk,
};
