import { HttpStatusCode } from "axios";
import { z } from "zod";

/**
 * @version v0.1
 * @description 대여 가능한 물품의 최대 갯수를 가져옵니다
 */

const url = () => `/executive/storage/contracts/contract`;
const method = "POST";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  numberOfBoxes: z.coerce.number().int().min(0),
  numberOfNonStandardItems: z.coerce.number().int().min(0),
  charge: z.coerce.number().int().min(0),
  zone: z.coerce.string().max(255),
  studentId: z.coerce.number().int().min(1),
  executiveId: z.coerce.number().int().min(1),
  applicationId: z.coerce.number().int().min(1),
});

const responseBodyMap = {
  [HttpStatusCode.Created]: z.object({}),
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
type ApiSto007ResponseOK = z.infer<(typeof apiSto007.responseBodyMap)[201]>;

export default apiSto007;

export type {
  ApiSto007RequestParam,
  ApiSto007RequestQuery,
  ApiSto007RequestBody,
  ApiSto007ResponseOK,
};
