import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zClubName } from "@sparcs-clubs/interface/common/commonString";
import {
  RegistrationStatusEnum,
  RegistrationTypeEnum,
} from "@sparcs-clubs/interface/common/enum/registration.enum";

/**
 * @version v0.1
 * @description 자신의 동아리 등록 목록을 조회합니다.
 */

const url = () => `/student/registrations/club-registrations/my`;
const method = "GET";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    registrations: z.array(
      z.object({
        id: z.coerce.number().int().min(1),
        registrationStatusEnumId: z.nativeEnum(RegistrationStatusEnum),
        registrationTypeEnumId: z.nativeEnum(RegistrationTypeEnum),
        divisionName: z.string().max(128),
        clubNameKr: zClubName,
        clubId: z.coerce.number().int().min(1),
        activityFieldKr: z.string().max(255),
        activityFieldEn: z.string().max(255),
        professorName: z.string().max(255),
      }),
    ),
  }),
};

const responseErrorMap = {};

const apiReg012 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiReg012RequestParam = z.infer<typeof apiReg012.requestParam>;
type ApiReg012RequestQuery = z.infer<typeof apiReg012.requestQuery>;
type ApiReg012RequestBody = z.infer<typeof apiReg012.requestBody>;
type ApiReg012ResponseOk = z.infer<(typeof apiReg012.responseBodyMap)[200]>;

export default apiReg012;

export type {
  ApiReg012RequestParam,
  ApiReg012RequestQuery,
  ApiReg012RequestBody,
  ApiReg012ResponseOk,
};
