import { HttpStatusCode } from "axios";
import { z } from "zod";

/**
 * @version v0.1
 * @description 현재 학기 출력 해당 동아리의 홍보물 신청 내역을 가져옵니다.
 */

const url = (applicationId: string) =>
  `/executive/storage/applications/application/${applicationId}`;
const method = "PUT";

const requestParam = z.object({
  applicationId: z.coerce.number().int().min(1),
});

const requestQuery = z.object({});

const requestBody = z.object({
  status: z.coerce.string().max(30),
  isPickedUp: z.coerce.boolean(),
  note: z.coerce.string().max(512),
});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({}),
};

const responseErrorMap = {};

const apiSto007 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiSto007RequestParam = z.infer<typeof apiSto007.requestParam>;
type ApiSto007RequestQuery = z.infer<typeof apiSto007.requestQuery>;
type ApiSto007RequestBody = z.infer<typeof apiSto007.requestBody>;
type ApiSto007ResponseOk = z.infer<(typeof apiSto007.responseBodyMap)[200]>;

export default apiSto007;

export type {
  ApiSto007RequestParam,
  ApiSto007RequestQuery,
  ApiSto007RequestBody,
  ApiSto007ResponseOk,
};
