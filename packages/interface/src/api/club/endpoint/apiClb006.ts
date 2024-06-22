import { HttpStatusCode } from "axios";
import { z } from "zod";

import { ClubRepresentativeEnum } from "@sparcs-clubs/interface/common/enum/club.enum";
import { zKrPhoneNumber } from "@sparcs-clubs/interface/common/type/phoneNumber.type";

/**
 * @version v0.1
 * @description 동아리의 대표자 및 대의원 정보를 가져옵니다
 */

const url = () => `/student/clubs/club/{club_id}/representatives`;
const method = "GET";

const requestParam = z.object({
  clubId: z.number().int(),
});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    representatives: z.array(
      z.object({
        representitiveEnum: z.nativeEnum(ClubRepresentativeEnum),
        studentId: z.number().int(),
        name: z.string().max(20),
        phoneNumber: zKrPhoneNumber,
      }),
    ),
  }),
};

const responseErrorMap = {};

type ApiClb006RequestParam = z.infer<typeof apiClb006.requestParam>;
type ApiClb006RequestQuery = z.infer<typeof apiClb006.requestQuery>;
type ApiClb006RequestBody = z.infer<typeof apiClb006.requestBody>;
type ApiClb006ResponseOK = z.infer<(typeof apiClb006.responseBodyMap)[200]>;

const apiClb006 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

export default apiClb006;

export type {
  ApiClb006RequestParam,
  ApiClb006RequestQuery,
  ApiClb006RequestBody,
  ApiClb006ResponseOK,
};
