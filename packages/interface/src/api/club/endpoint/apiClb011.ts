import { HttpStatusCode } from "axios";
import { z } from "zod";

import { ClubDelegateChangeRequestStatusEnum } from "@sparcs-clubs/interface/common/enum/club.enum";

/**
 * @version v0.1
 * @description 동아리의 현재 신청된 대표자 변경을 조회합니다.
 */

const url = (clubId: number) =>
  `/student/clubs/club/${clubId}/delegates/delegate/requests`;
const method = "GET";

const requestParam = z.object({
  cludId: z.coerce.number().int().min(1),
});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    requests: z
      .object({
        studentId: z.coerce.number().int().min(1),
        studentName: z.coerce.number().int().min(1),
        clubDelegateChangeRequestStatusEnumId: z.nativeEnum(
          ClubDelegateChangeRequestStatusEnum,
        ),
      })
      .array(),
  }),
};

const responseErrorMap = {};

const apiClb011 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiClb010RequestParam = z.infer<typeof apiClb011.requestParam>;
type ApiClb010RequestQuery = z.infer<typeof apiClb011.requestQuery>;
type ApiClb010RequestBody = z.infer<typeof apiClb011.requestBody>;
type ApiClb010ResponseOk = z.infer<(typeof apiClb011.responseBodyMap)[200]>;

export default apiClb011;

export type {
  ApiClb010RequestParam,
  ApiClb010RequestQuery,
  ApiClb010RequestBody,
  ApiClb010ResponseOk,
};
