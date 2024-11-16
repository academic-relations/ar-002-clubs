import { HttpStatusCode } from "axios";
import { z } from "zod";

/**
 * @version v0.1
 * @description 현재 학기 출력 해당 동아리의 홍보물 신청 내역을 가져옵니다.
 */

const url = (contractId: string) =>
  `/executive/storage/contracts/contract/${contractId}`;
const method = "PUT";

const requestParam = z.object({
  contractId: z.coerce.number().int().min(1),
});

const requestQuery = z.object({});

const requestBody = z.object({
  status: z.coerce.string().max(30),
  note: z.coerce.string().max(512),
});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({}),
};

const responseErrorMap = {};

const apiSto011 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiSto011RequestParam = z.infer<typeof apiSto011.requestParam>;
type ApiSto011RequestQuery = z.infer<typeof apiSto011.requestQuery>;
type ApiSto011RequestBody = z.infer<typeof apiSto011.requestBody>;
type ApiSto011ResponseOk = z.infer<(typeof apiSto011.responseBodyMap)[200]>;

export default apiSto011;

export type {
  ApiSto011RequestParam,
  ApiSto011RequestQuery,
  ApiSto011RequestBody,
  ApiSto011ResponseOk,
};
