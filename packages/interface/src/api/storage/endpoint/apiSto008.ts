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
  endDate: z.coerce.date(),
  studentId: z.coerce.number().int().min(1),
  applicationId: z.coerce.number().int().min(1),
});

const responseBodyMap = {
  [HttpStatusCode.Created]: z.object({}),
};

const responseErrorMap = {};

const apiSto008 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiSto008RequestParam = z.infer<typeof apiSto008.requestParam>;
type ApiSto008RequestQuery = z.infer<typeof apiSto008.requestQuery>;
type ApiSto008RequestBody = z.infer<typeof apiSto008.requestBody>;
type ApiSto008ResponseCreated = z.infer<
  (typeof apiSto008.responseBodyMap)[201]
>;

export default apiSto008;

export type {
  ApiSto008RequestParam,
  ApiSto008RequestQuery,
  ApiSto008RequestBody,
  ApiSto008ResponseCreated,
};
