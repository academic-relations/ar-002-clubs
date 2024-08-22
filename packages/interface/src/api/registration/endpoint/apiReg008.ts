import { HttpStatusCode } from "axios";
import { z } from "zod";

import { RegistrationApplicationStudentStatusEnum } from "@sparcs-clubs/interface/common/enum/registration.enum";

/**
 * @version v0.1
 * @description 동아리 가입 신청 목록을 조회합니다.
 */

const url = (clubId: string) =>
  `/student/registrations/member-registrations/club/${clubId}`;
const method = "GET";

const requestParam = z.object({
  clubId: z.coerce.number().int().min(1),
});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    applies: z.array(
      z.object({
        id: z.coerce.number().int().min(1),
        applyStatusEnumId: z.nativeEnum(
          RegistrationApplicationStudentStatusEnum,
        ),
      }),
    ),
  }),
};

const responseErrorMap = {};

const apiReg008 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiReg008RequestParam = z.infer<typeof apiReg008.requestParam>;
type ApiReg008RequestQuery = z.infer<typeof apiReg008.requestQuery>;
type ApiReg008RequestBody = z.infer<typeof apiReg008.requestBody>;
type ApiReg008ResponseOk = z.infer<(typeof apiReg008.responseBodyMap)[200]>;

export default apiReg008;

export type {
  ApiReg008RequestParam,
  ApiReg008RequestQuery,
  ApiReg008RequestBody,
  ApiReg008ResponseOk,
};
