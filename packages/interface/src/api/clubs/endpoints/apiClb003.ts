import { createErrorResponse } from "@sparcs-clubs/interface/common/api";
import { HttpStatusCode } from "axios";
import { z } from "zod";

/**
 * @version v0.1
 * @description 내가 활동했던 전체 동아리 목록을 가져옵니다
 */

const url = () => `/clubs/my`;
const method = "GET";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    semesters: z
      .object({
        id: z.number().int().positive(), // 학기 id
        name: z.string().max(20), // 학기명
        clubs: z // 활동 동아리 목록
          .object({
            id: z.number().int().positive(),
            name: z.string().max(20),
            type: z.string().max(10), // 동아리 유형(정동아리 | 가동아리 | 상임동아리)
            characteristic: z.string().max(50), // 동아리 소개
            representative: z.string().max(20), // 동아리 대표
            advisor: z.string().max(20).nullable(), // 동아리 지도교수
            totalMemberCnt: z.number().int().positive(),
          })
          .array(),
      })
      .array(),
  }),
};

const responseErrorMap = {
  [HttpStatusCode.Unauthorized]: createErrorResponse(
    "Unauthorized",
    "You are not authorized to access this resource.",
  ),
};

const apiClb003 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

export default apiClb003;
