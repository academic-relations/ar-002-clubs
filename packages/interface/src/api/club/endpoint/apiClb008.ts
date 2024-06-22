import { HttpStatusCode } from "axios";
import { z } from "zod";

import { ClubRepresentativeEnum } from "@sparcs-clubs/interface/common/enum/club.enum";
import { zKrPhoneNumber } from "@sparcs-clubs/interface/common/type/phoneNumber.type";

/**
 * @version v0.1
 * @description 동아리의 대표자 및 대의원 변경을 위한 목록을 가져옵니다.
 */

const url = () =>
  `/student/clubs/club/{clubId}/representatives/representative/{representativeId}/candidates`;
const method = "GET";

const requestParam = z.object({
  clubId: z.number().int(),
  representativeEnumId: z.nativeEnum(ClubRepresentativeEnum),
});

const requestQuery = z.object({});

const requestBody = z.object({
  students: z.array(
    z.object({
      id: z.number().int(),
      name: z.string().max(20),
      phoneNumber: zKrPhoneNumber,
    }),
  ),
});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({}),
};

const responseErrorMap = {};

type ApiClb008RequestParam = z.infer<typeof apiClb008.requestParam>;
type ApiClb008RequestQuery = z.infer<typeof apiClb008.requestQuery>;
type ApiClb008RequestBody = z.infer<typeof apiClb008.requestBody>;
type ApiClb008ResponseOK = z.infer<(typeof apiClb008.responseBodyMap)[200]>;

const apiClb008 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

export default apiClb008;

export type {
  ApiClb008RequestParam,
  ApiClb008RequestQuery,
  ApiClb008RequestBody,
  ApiClb008ResponseOK,
};
