import { HttpStatusCode } from "axios";
import { z } from "zod";

/**
 * @version v0.1
 * @description 현재 학기 출력 해당 동아리의 홍보물 신청 내역을 가져옵니다.
 */

const url = (contractId: string) =>
  `/student/storage/contracts/contract/${contractId}`;
const method = "PUT";

const requestParam = z.object({
  contractId: z.coerce.number().int().min(1),
});

const requestQuery = z.object({});

const requestBody = z.object({
  status: z.coerce.string().max(30),
});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({}),
};

const responseErrorMap = {};

const apiSto010 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiSto010RequestParam = z.infer<typeof apiSto010.requestParam>;
type ApiSto010RequestQuery = z.infer<typeof apiSto010.requestQuery>;
type ApiSto010RequestBody = z.infer<typeof apiSto010.requestBody>;
type ApiSto010ResponseOk = z.infer<(typeof apiSto010.responseBodyMap)[200]>;

export default apiSto010;

export type {
  ApiSto010RequestParam,
  ApiSto010RequestQuery,
  ApiSto010RequestBody,
  ApiSto010ResponseOk,
};
