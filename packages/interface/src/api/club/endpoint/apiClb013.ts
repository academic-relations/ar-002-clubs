import { HttpStatusCode } from "axios";
import { z } from "zod";

import { ClubDelegateChangeRequestStatusEnum } from "@sparcs-clubs/interface/common/enum/club.enum";

/**
 * @version v0.1
 * @description 마이페이지에서 나에게 신청한 대표자 변경을 조회합니다.
 */

const url = () => `/student/clubs/delegates/requests`;
const method = "GET";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    requests: z
      .object({
        prevStudentId: z.coerce.number().int().min(1),
        prevStudentName: z.coerce.string(),
        clubId: z.coerce.number().int().min(1),
        clubName: z.coerce.string(),
        clubDelegateChangeRequestStatusEnumId: z.nativeEnum(
          ClubDelegateChangeRequestStatusEnum,
        ),
      })
      .array(),
  }),
};

const responseErrorMap = {};

const apiClb013 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiClb010RequestParam = z.infer<typeof apiClb013.requestParam>;
type ApiClb010RequestQuery = z.infer<typeof apiClb013.requestQuery>;
type ApiClb010RequestBody = z.infer<typeof apiClb013.requestBody>;
type ApiClb010ResponseOk = z.infer<(typeof apiClb013.responseBodyMap)[200]>;

export default apiClb013;

export type {
  ApiClb010RequestParam,
  ApiClb010RequestQuery,
  ApiClb010RequestBody,
  ApiClb010ResponseOk,
};
