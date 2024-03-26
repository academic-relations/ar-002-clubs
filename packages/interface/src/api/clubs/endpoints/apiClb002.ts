import { createErrorResponse } from "@sparcs-clubs/interface/common/api";
import { HttpStatusCode } from "axios";
import { z } from "zod";

/**
 * @version v0.1
 * @description 동아리의 상세정보를 가져옵니다
 */

const url = (club_id: string) => `/clubs/club/${club_id}`;
const method = "GET";

const requestParam = z.object({
  club_id: z.number().int().positive(),
});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    divisions: z // 분과
      .object({
        id: z.number().int().positive(),
        name: z.string().max(20),
        type: z.string().max(10), // 동아리 유형(정동아리 | 가동아리 | 상임동아리)
        characteristic: z.string().max(50), // 동아리 소개
        representative: z.string().max(20), // 동아리 대표
        advisor: z.string().max(20).nullable(), // 동아리 지도교수
        totalMemberCnt: z.number().int().positive(),
        description: z.string(),
        divisionName: z.string().max(20), // 분과명
        foundingYear: z.number().int().min(1985).max(2100),
        room: z.string().max(50), // 동아리방 위치
      })
      .array(),
  }),
};

const responseErrorMap = {
  [HttpStatusCode.BadRequest]: createErrorResponse(
    "Bad Request",
    "Invalid request. check param and queries",
  ),
};

const apiClb002 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

export default apiClb002;
