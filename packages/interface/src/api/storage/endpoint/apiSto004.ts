import { HttpStatusCode } from "axios";
import { z } from "zod";

/**
 * @version v0.1
 * @description 현재 학기 출력 해당 동아리의 홍보물 신청 내역을 가져옵니다.
 */

const url = (applicationId: string) =>
  `/student/storage/applications/application/${applicationId}`;
const method = "GET";

const requestParam = z.object({
  applicationId: z.coerce.number().int().min(1),
});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    clubId: z.coerce.number().int().min(1),
    clubNameKr: z.string().max(128),
    clubNameEn: z.string().max(128),
    studentId: z.coerce.number().int().min(1),
    studentName: z.string(),
    studentPhoneNumber: z.string().max(30),
    numberOfBoxes: z.coerce.number().int().min(0),
    desiredPickUpDate: z.coerce.date(),
    nonStandardItems: z
      .object({
        name: z.coerce.string().max(30),
        fileId: z.coerce.string().max(128),
      })
      .array(),
    desiredStartDate: z.coerce.date(),
    desiredEndDate: z.coerce.date(),
    status: z.coerce.string().max(30),
    isPickedUp: z.coerce.boolean(),
    contractId: z.optional(z.coerce.number().int().min(1)),
    note: z.coerce.string().max(512),
    createdAt: z.coerce.date(),
  }),
};

const responseErrorMap = {};

const apiSto004 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiSto004RequestParam = z.infer<typeof apiSto004.requestParam>;
type ApiSto004RequestQuery = z.infer<typeof apiSto004.requestQuery>;
type ApiSto004RequestBody = z.infer<typeof apiSto004.requestBody>;
type ApiSto004ResponseOk = z.infer<(typeof apiSto004.responseBodyMap)[200]>;

export default apiSto004;

export type {
  ApiSto004RequestParam,
  ApiSto004RequestQuery,
  ApiSto004RequestBody,
  ApiSto004ResponseOk,
};
