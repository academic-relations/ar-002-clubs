import { HttpStatusCode } from "axios";
import { z } from "zod";

/**
 * @version v0.1
 * @description 신청한 대여 정보를 가져옵니다
 */

const url = (rentalId: number) => `/student/rentals/rental/${rentalId}`;
const method = "GET";

const requestParam = z.object({
  rentalId: z.number().int().min(0),
});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    id: z.number().int().min(0),
    clubId: z.number().int().min(0),
    clubName: z.string(),
    studentName: z.string(),
    studentPhoneNumber: z.string(),
    objects: z.array(
      z.object({
        id: z.number().int().min(0),
        name: z.string(),
        number: z.number().int().min(1),
      }),
    ),
    purpose: z.string().max(500),
    desiredStart: z.date(),
    desiredEnd: z.date(),
    startTerm: z.date(),
    endTerm: z.date(),
  }),
};

const responseErrorMap = {};

const apiRnt004 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiRnt004RequestParam = z.infer<typeof apiRnt004.requestParam>;
type ApiRnt004RequestQuery = z.infer<typeof apiRnt004.requestQuery>;
type ApiRnt004RequestBody = z.infer<typeof apiRnt004.requestBody>;
type ApiRnt004ResponseOK = z.infer<(typeof apiRnt004.responseBodyMap)[200]>;

export default apiRnt004;

export type {
  ApiRnt004RequestParam,
  ApiRnt004RequestQuery,
  ApiRnt004RequestBody,
  ApiRnt004ResponseOK,
};
