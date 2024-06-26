import { HttpStatusCode } from "axios";
import { z } from "zod";

import { ClubRepresentativeEnum } from "@sparcs-clubs/interface/common/enum/club.enum";

/**
 * @version v0.1
 * @description 동아리의 대표자 및 대의원을 변경합니다
 */

const url = () =>
  `/student/clubs/club/{clubId}/representatives/representative/{representativeId}`;
const method = "PUT";

const requestParam = z.object({
  clubId: z.number().int(),
  representativeEnumId: z.nativeEnum(ClubRepresentativeEnum),
});

const requestQuery = z.object({});

const requestBody = z.object({
  studentId: z.number().int(),
});

const responseBodyMap = {
  [HttpStatusCode.Created]: z.object({}),
};

const responseErrorMap = {};

type ApiClb007RequestParam = z.infer<typeof apiClb007.requestParam>;
type ApiClb007RequestQuery = z.infer<typeof apiClb007.requestQuery>;
type ApiClb007RequestBody = z.infer<typeof apiClb007.requestBody>;
type ApiClb007ResponseCreated = z.infer<
  (typeof apiClb007.responseBodyMap)[201]
>;

const apiClb007 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

export default apiClb007;

export type {
  ApiClb007RequestParam,
  ApiClb007RequestQuery,
  ApiClb007RequestBody,
  ApiClb007ResponseCreated,
};
