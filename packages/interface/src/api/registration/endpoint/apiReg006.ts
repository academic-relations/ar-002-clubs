import { HttpStatusCode } from "axios";
import { z } from "zod";

import { RegistrationApplicationStudentStatusEnum } from "@sparcs-clubs/interface/common/enum/registration.enum";

/**
 * @version v0.1
 * @description 자신의 동아리 신청 내역과 그 상태를 전부 조회합니다.
 */

const url = () => `/student/registrations/member-registrations/my`;
const method = "GET";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    applies: z.array(
      z.object({
        id: z.coerce.number().int().min(1),
        clubId: z.coerce.number().int().min(1),
        applyStatusEnumId: z.nativeEnum(
          RegistrationApplicationStudentStatusEnum,
        ),
      }),
    ),
  }),
};

const responseErrorMap = {};

const apiReg006 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiReg006RequestParam = z.infer<typeof apiReg006.requestParam>;
type ApiReg006RequestQuery = z.infer<typeof apiReg006.requestQuery>;
type ApiReg006RequestBody = z.infer<typeof apiReg006.requestBody>;
type ApiReg006ResponseOk = z.infer<(typeof apiReg006.responseBodyMap)[200]>;

export default apiReg006;

export type {
  ApiReg006RequestParam,
  ApiReg006RequestQuery,
  ApiReg006RequestBody,
  ApiReg006ResponseOk,
};
