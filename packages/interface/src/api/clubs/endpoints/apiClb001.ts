import { HttpStatusCode } from "axios";
import { z } from "zod";

import { clubTypeEnum } from "@sparcs-clubs/interface/common/enum/clubs";

/**
 * @version v0.1
 * @description 전체 동아리 목록을 가져옵니다
 */

const url = () => `/clubs`;
const method = "GET";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    divisions: z // 분과
      .object({
        id: z.number().int().positive(),
        name: z.string().max(20),
        clubs: z // 동아리
          .object({
            id: z.number().int().positive(),
            name: z.string().max(20),
            type: clubTypeEnum, // 동아리 유형(정동아리 | 가동아리 | 상임동아리)
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

const responseErrorMap = {};

const apiClb001 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

export default apiClb001;
