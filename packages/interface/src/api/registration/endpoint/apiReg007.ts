import { HttpStatusCode } from "axios";
import { z } from "zod";

import { RegistrationStatusEnum } from "@sparcs-clubs/interface/common/enum/registration.enum";

/**
 * @version v0.1
 * @description 동아리 가입 신청의 상태를 변경합니다.
 */

const url = () => `/student/registration/member/approval`;
const method = "PATCH";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  clubId: z.coerce.number().int().min(1),
  studentId: z.coerce.number().int().min(1),
  applyStatusEnumId: z.nativeEnum(RegistrationStatusEnum),
});

const responseBodyMap = {
  [HttpStatusCode.NoContent]: z.object({}),
};

const responseErrorMap = {};

const apiReg007 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiReg007RequestParam = z.infer<typeof apiReg007.requestParam>;
type ApiReg007RequestQuery = z.infer<typeof apiReg007.requestQuery>;
type ApiReg007RequestBody = z.infer<typeof apiReg007.requestBody>;
type ApiReg007ResponseNoContent = z.infer<
  (typeof apiReg007.responseBodyMap)[204]
>;

export default apiReg007;

export type {
  ApiReg007RequestParam,
  ApiReg007RequestQuery,
  ApiReg007RequestBody,
  ApiReg007ResponseNoContent,
};