import { HttpStatusCode } from "axios";
import { z } from "zod";

import {
  zClubName,
  zUserName,
} from "@sparcs-clubs/interface/common/commonString";
import { RegistrationStatusEnum } from "@sparcs-clubs/interface/common/enum/registration.enum";
import { zKrPhoneNumber } from "@sparcs-clubs/interface/common/type/phoneNumber.type";

/**
 * @version v0.1
 * @description 동아리별 가입 신청의 세부 상태를 확인합니다.
 */

const url = () => `/professor/registrations/member-registrations/brief`;
const method = "GET";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    items: z.array(
      z.object({
        clubId: z.coerce.number().int().min(1),
        registrationStatusEnumId: z.nativeEnum(RegistrationStatusEnum),
        division: z.object({
          id: z.coerce.number().int().min(1),
          name: zUserName,
        }),
        clubName: zClubName,
        student: z.object({
          id: z.coerce.number().int().min(1),
          studentNumber: z.coerce.number().int().min(1),
          name: zUserName,
          phoneNumber: zKrPhoneNumber.optional(),
          email: z.string(),
        }),
        professorSignedAt: z.coerce.date(),
      }),
    ),
  }),
};

const responseErrorMap = {};

const apiReg021 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiReg021RequestParam = z.infer<typeof apiReg021.requestParam>;
type ApiReg021RequestQuery = z.infer<typeof apiReg021.requestQuery>;
type ApiReg021RequestBody = z.infer<typeof apiReg021.requestBody>;
type ApiReg021ResponseOk = z.infer<(typeof apiReg021.responseBodyMap)[200]>;

export default apiReg021;

export type {
  ApiReg021RequestParam,
  ApiReg021RequestQuery,
  ApiReg021RequestBody,
  ApiReg021ResponseOk,
};
