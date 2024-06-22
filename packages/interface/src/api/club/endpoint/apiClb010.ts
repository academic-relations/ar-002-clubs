import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zKrPhoneNumber } from "@sparcs-clubs/interface/common/type/phoneNumber.type";
/**
 * @version v0.1
 * @description semesterId에 해당하는 학기에 cludId의 동아리에서 활동한 모든 회원 정보를 가져옵니다.
 */

const url = (clubId: number, semesterId: number) =>
  `/student/clubs/club/${clubId}/members/semesters/semester/${semesterId}`;
const method = "GET";

const requestParam = z.object({
  cludId: z.number().int().min(1),
  semesterId: z.number().int().min(1),
});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    members: z
      .object({
        studentNumber: z.number().int().min(20000000).max(30000000),
        name: z.string().max(30),
        email: z.string().max(50),
        krPhoneNumber: zKrPhoneNumber.optional(),
      })
      .array(),
  }),
};

const responseErrorMap = {};

const apiClb010 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiClb010RequestParam = z.infer<typeof apiClb010.requestParam>;
type ApiClb010RequestQuery = z.infer<typeof apiClb010.requestQuery>;
type ApiClb010RequestBody = z.infer<typeof apiClb010.requestBody>;
type ApiClb010ResponseOk = z.infer<(typeof apiClb010.responseBodyMap)[200]>;

export default apiClb010;

export type {
  ApiClb010RequestParam,
  ApiClb010RequestQuery,
  ApiClb010RequestBody,
  ApiClb010ResponseOk,
};
