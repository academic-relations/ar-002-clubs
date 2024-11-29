import { HttpStatusCode } from "axios";
import { z } from "zod";

/**
 * @version v0.1
 * @description 현재 학기 출력 해당 동아리의 홍보물 신청 내역을 가져옵니다.
 */

const url = (applicationId: string) =>
  `/executive/storage/applications/application/${applicationId}`;
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

const apiSto005 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiSto005RequestParam = z.infer<typeof apiSto005.requestParam>;
type ApiSto005RequestQuery = z.infer<typeof apiSto005.requestQuery>;
type ApiSto005RequestBody = z.infer<typeof apiSto005.requestBody>;
type ApiSto005ResponseOk = z.infer<(typeof apiSto005.responseBodyMap)[200]>;

export default apiSto005;

export type {
  ApiSto005RequestParam,
  ApiSto005RequestQuery,
  ApiSto005RequestBody,
  ApiSto005ResponseOk,
};
