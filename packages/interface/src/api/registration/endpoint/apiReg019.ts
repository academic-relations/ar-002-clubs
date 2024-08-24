import { HttpStatusCode } from "axios";
import { z } from "zod";

import {
  zClubName,
  zUserName,
} from "@sparcs-clubs/interface/common/commonString";

/**
 * @version v0.1
 * @description 동아리별 가입 신청의 간략한 상태를 확인합니다.
 */

const url = () => `/executive/registrations/member-registrations/brief`;
const method = "GET";

const requestParam = z.object({});

const requestQuery = z.object({
  pageOffset: z.coerce.number().int().min(1),
  itemCount: z.coerce.number().int().min(1),
});
const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    items: z.array(
      z.object({
        clubId: z.coerce.number().int().min(1),
        clubTypeEnumId: z.coerce.number().int().min(1),
        division: z.object({
          id: z.coerce.number().int().min(1),
          name: zUserName,
        }),
        clubName: zClubName,
        totalRegistrations: z.coerce.number().int().min(0),
        regularMemberRegistrations: z.coerce.number().int().min(0),
        totalApprovals: z.coerce.number().int().min(0),
        regularMemberApprovals: z.coerce.number().int().min(0),
      }),
    ),
    total: z.coerce.number().min(1),
    offset: z.coerce.number().min(1),
  }),
};

const responseErrorMap = {};

const apiReg019 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiReg019RequestParam = z.infer<typeof apiReg019.requestParam>;
type ApiReg019RequestQuery = z.infer<typeof apiReg019.requestQuery>;
type ApiReg019RequestBody = z.infer<typeof apiReg019.requestBody>;
type ApiReg019ResponseOk = z.infer<(typeof apiReg019.responseBodyMap)[200]>;

export default apiReg019;

export type {
  ApiReg019RequestParam,
  ApiReg019RequestQuery,
  ApiReg019RequestBody,
  ApiReg019ResponseOk,
};
