import { HttpStatusCode } from "axios";
import { z } from "zod";
/**
 * @version v0.1
 * @description 동아리가 활동한 모든 학기를 가져옵니다.
 */

const url = (clubId: number) =>
  `/student/clubs/club/${clubId}/members/semesters`;
const method = "GET";

const requestParam = z.object({
  cludId: z.number().int().min(1),
});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    semesters: z
      .object({
        id: z.number().int().min(1),
        year: z.number().int(),
        name: z.string().max(10),
      })
      .array(),
  }),
};

const responseErrorMap = {};

const apiClb009 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiClb009RequestParam = z.infer<typeof apiClb009.requestParam>;
type ApiClb009RequestQuery = z.infer<typeof apiClb009.requestQuery>;
type ApiClb009RequestBody = z.infer<typeof apiClb009.requestBody>;
type ApiClb009ResponseOk = z.infer<(typeof apiClb009.responseBodyMap)[200]>;

export default apiClb009;

export type {
  ApiClb009RequestParam,
  ApiClb009RequestQuery,
  ApiClb009RequestBody,
  ApiClb009ResponseOk,
};
