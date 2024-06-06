import { HttpStatusCode } from "axios";
import { z } from "zod";

import { ClubTypeEnum } from "@sparcs-clubs/interface/common/enum/club.enum";

/**
 * @version v0.1
 * @description 동아리의 상세정보를 가져옵니다
 */

const url = (clubId: string) => `/clubs/club/${clubId}`;
const method = "GET";

const requestParam = z.object({
  clubId: z.coerce.number().int().min(1),
});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    id: z.number().int().min(1),
    name: z.string().max(20),
    type: z.nativeEnum(ClubTypeEnum), // 동아리 유형(정동아리 | 가동아리)
    isPermanent: z.boolean(), // 상임동아리 여부
    characteristic: z.string().max(50), // 동아리 소개
    representative: z.string().max(20), // 동아리 대표
    advisor: z.string().max(20).nullable(), // 동아리 지도교수
    totalMemberCnt: z.number().int().min(1),
    description: z.string(),
    divisionName: z.string().max(20), // 분과명
    foundingYear: z.number().int().min(1985).max(2100),
    room: z.string().max(50), // 동아리방 위치
  }),
};

const responseErrorMap = {};

type ApiClb002RequestParam = z.infer<typeof apiClb002.requestParam>;
type ApiClb002RequestQuery = z.infer<typeof apiClb002.requestQuery>;
type ApiClb002RequestBody = z.infer<typeof apiClb002.requestBody>;
type ApiClb002ResponseOK = z.infer<(typeof apiClb002.responseBodyMap)[200]>;

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

export type {
  ApiClb002RequestParam,
  ApiClb002RequestQuery,
  ApiClb002RequestBody,
  ApiClb002ResponseOK,
};
