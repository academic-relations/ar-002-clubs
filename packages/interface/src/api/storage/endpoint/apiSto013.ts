import { HttpStatusCode } from "axios";
import { z } from "zod";

/**
 * @version v0.1
 * @description 현재 학기 출력 해당 동아리의 홍보물 신청 내역을 가져옵니다.
 */

const url = (contractId: string) =>
  `/student/storage/contracts/contract/${contractId}`;
const method = "GET";

const requestParam = z.object({
  contractId: z.coerce.number().int().min(1),
});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    numberOfBoxes: z.coerce.number().int().min(0),
    numberOfNonStandardItems: z.coerce.number().int().min(0),
    charge: z.coerce.number().int().min(0),
    zone: z.coerce.string().max(255),
    studentId: z.coerce.number().int().min(1),
    executiveId: z.coerce.number().int().min(1),
    applicationId: z.coerce.number().int().min(1),
    note: z.coerce.string().max(512),
  }),
};

const responseErrorMap = {};

const apiSto013 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiSto013RequestParam = z.infer<typeof apiSto013.requestParam>;
type ApiSto013RequestQuery = z.infer<typeof apiSto013.requestQuery>;
type ApiSto013RequestBody = z.infer<typeof apiSto013.requestBody>;
type ApiSto013ResponseOk = z.infer<(typeof apiSto013.responseBodyMap)[200]>;

export default apiSto013;

export type {
  ApiSto013RequestParam,
  ApiSto013RequestQuery,
  ApiSto013RequestBody,
  ApiSto013ResponseOk,
};
