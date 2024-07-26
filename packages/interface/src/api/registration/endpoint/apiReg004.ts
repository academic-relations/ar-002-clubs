import { HttpStatusCode } from "axios";
import { z } from "zod";

import { RegistrationEventEnum } from "@sparcs-clubs/interface/common/enum/registration.enum";

/**
 * @version v0.1
 * @description 동아리 등록, 동아리 신청과 관련된 일정을 확인합니다
 */

const url = () => `/student/registration/events`;
const method = "GET";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    events: z.array(
      z.object({
        id: z.number().int().min(1),
        registrationEventEnumId: z.nativeEnum(RegistrationEventEnum),
        startTerm: z.date(),
        endTerm: z.date(),
      }),
    ),
  }),
};

const responseErrorMap = {};

const apiReg004 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiReg004RequestParam = z.infer<typeof apiReg004.requestParam>;
type ApiReg004RequestQuery = z.infer<typeof apiReg004.requestQuery>;
type ApiReg004RequestBody = z.infer<typeof apiReg004.requestBody>;
type ApiReg004ResponseOK = z.infer<(typeof apiReg004.responseBodyMap)[200]>;

export default apiReg004;

export type {
  ApiReg004RequestParam,
  ApiReg004RequestQuery,
  ApiReg004RequestBody,
  ApiReg004ResponseOK,
};
