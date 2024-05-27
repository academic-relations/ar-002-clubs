import { HttpStatusCode } from "axios";
import { z } from "zod";

import { ClubTypeEnum } from "@sparcs-clubs/interface/common/enum/club.enum";

/**
 * @version v0.1
 * @description 내가 활동했던 전체 동아리 목록을 가져옵니다
 */

const url = () => `/student/clubs/my`;
const method = "GET";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    semesters: z
      .object({
        id: z.number().int().min(1), // 학기 id
        name: z.string().max(20), // 학기명
        clubs: z // 활동 동아리 목록
          .object({
            id: z.number().int().min(1),
            name: z.string().max(20),
            type: z.nativeEnum(ClubTypeEnum), // 동아리 유형(정동아리 | 가동아리)
            isPermanent: z.boolean(), // 상임동아리 여부
            characteristic: z.string().max(50), // 동아리 소개
            representative: z.string().max(20), // 동아리 대표
            advisor: z.string().max(20).nullable(), // 동아리 지도교수
            totalMemberCnt: z.number().int().min(1),
          })
          .array(),
      })
      .array(),
  }),
};

const responseErrorMap = {};

type ApiClb003RequestParam = z.infer<typeof apiClb003.requestParam>;
type ApiClb003RequestQuery = z.infer<typeof apiClb003.requestQuery>;
type ApiClb003RequestBody = z.infer<typeof apiClb003.requestBody>;
type ApiClb003ResponseOK = z.infer<(typeof apiClb003.responseBodyMap)[200]>;

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

export type {
  ApiClb003RequestParam,
  ApiClb003RequestQuery,
  ApiClb003RequestBody,
  ApiClb003ResponseOK,
};
