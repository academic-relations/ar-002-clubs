import { HttpStatusCode } from "axios";
import { z } from "zod";

/**
 * @version v0.1
 * @description 동아리의 대표자 및 대의원 정보를 가져옵니다
 */

const url = () => `/student/clubs/club/{club_id}/representatives`;
const method = "GET";

const requestParam = z.object({
  clubId: z.number().int(),
});

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
            type: z.string().max(10), // 동아리 유형(정동아리 | 가동아리 | 상임동아리)
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

type ApiClb006RequestParam = z.infer<typeof apiClb006.requestParam>;
type ApiClb006RequestQuery = z.infer<typeof apiClb006.requestQuery>;
type ApiClb006RequestBody = z.infer<typeof apiClb006.requestBody>;
type ApiClb006ResponseOK = z.infer<(typeof apiClb006.responseBodyMap)[200]>;

const apiClb006 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

export default apiClb006;

export type {
  ApiClb006RequestParam,
  ApiClb006RequestQuery,
  ApiClb006RequestBody,
  ApiClb006ResponseOK,
};
