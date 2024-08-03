import { HttpStatusCode } from "axios";
import { z } from "zod";

/**
 * @version v0.1
 * @description 특정 학기의 지원금 신청을 조회합니다.
 */

const url = (semesterId: number) =>
  `/student/fundings/semesters/semester/${semesterId}`;
const method = "GET";

const requestParam = z.object({
  semesterId: z.coerce.number().int().min(1),
});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    fundings: z.array(
      z.object({
        id: z.coerce.number().int().min(1),
        activityName: z.coerce.string().max(255),
        name: z.coerce.string().max(255),
        expenditureAmount: z.coerce.number().int().min(1),
        approvedAmount: z.coerce.number().int().min(0).optional(),
      }),
    ),
  }),
};

const responseErrorMap = {};

const apiFnd006 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiFnd006RequestParam = z.infer<typeof apiFnd006.requestParam>;
type ApiFnd006RequestQuery = z.infer<typeof apiFnd006.requestQuery>;
type ApiFnd006RequestBody = z.infer<typeof apiFnd006.requestBody>;
type ApiFnd006ResponseOk = z.infer<(typeof apiFnd006.responseBodyMap)[200]>;

export default apiFnd006;

export type {
  ApiFnd006RequestParam,
  ApiFnd006RequestQuery,
  ApiFnd006RequestBody,
  ApiFnd006ResponseOk,
};
