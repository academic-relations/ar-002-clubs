import { HttpStatusCode } from "axios";
import { z } from "zod";

/**
 * @version v0.1
 * @description 특정 회의에 속한 안건에 달리는 Content, Vote의 순서를 변경합니다.
 */

const url = (meetingId: number, agendaId: number) =>
  `/executive/meetings/meeting/${meetingId}/agendas/agenda/${agendaId}/entities`;
const method = "PATCH";

const requestParam = z.object({
  meetingId: z.coerce.number().int().min(1),
  agendaId: z.coerce.number().int().min(1),
});

const requestQuery = z.object({});

const requestBody = z.object({
  entityIdList: z.array(
    z.object({
      meetingAgendaEntityType: z.coerce.number().int().min(1),
      id: z.coerce.number().int().min(1),
    }),
  ),
});

const responseBodyMap = {
  [HttpStatusCode.Created]: z.object({}),
};

const responseErrorMap = {};

const apiMee021 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiMee021RequestParam = z.infer<typeof apiMee021.requestParam>;
type ApiMee021RequestQuery = z.infer<typeof apiMee021.requestQuery>;
type ApiMee021RequestBody = z.infer<typeof apiMee021.requestBody>;
type ApiMee021ResponseOk = z.infer<(typeof apiMee021.responseBodyMap)[201]>;

export default apiMee021;

export type {
  ApiMee021RequestBody,
  ApiMee021RequestParam,
  ApiMee021RequestQuery,
  ApiMee021ResponseOk,
};
