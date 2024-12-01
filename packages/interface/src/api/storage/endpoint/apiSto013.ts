import { HttpStatusCode } from "axios";
import { z } from "zod";

/**
 * @version v0.1
 * @description 현재 학기 출력 해당 동아리의 홍보물 신청 내역을 가져옵니다.
 */

const url = (contractId: number) =>
  `/executive/storage/contracts/contract/${contractId}`;
const method = "GET";

const requestParam = z.object({
  contractId: z.coerce.number().int().min(1),
});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    clubNameKr: z.string().max(128),
    clubNameEn: z.string().max(128),
    studentName: z.string(),
    studentId: z.coerce.number().int().min(1),
    executiveName: z.string(),
    startDate: z.date(),
    endDate: z.date(),
    numberOfBoxes: z.number().int().min(0),
    numberOfNonStandardItems: z.number().int().min(0),
    charge: z.number().int().min(0),
    zone: z.string().max(255),
    applicationId: z.number().int().min(1),
    note: z.string().max(512),
    createdAt: z.date(),
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
