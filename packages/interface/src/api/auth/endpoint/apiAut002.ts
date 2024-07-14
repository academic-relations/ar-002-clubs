import { HttpStatusCode } from "axios";
import { z } from "zod";

/**
 * @version v0.1
 * @description 만료된 access token을 재발급 합니다
 */

const url = () => `/auth/refresh`;
const method = "POST";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    accessToken: z.object({
      undergraduate: z.string().optional(),
      master: z.string().optional(),
      doctor: z.string().optional(),
      executive: z.string().optional(),
      professor: z.string().optional(),
      employee: z.string().optional(),
    }),
  }),
};

const responseErrorMap = {};

const apiAut002 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiAut002RequestParam = z.infer<typeof apiAut002.requestParam>;
type ApiAut002RequestQuery = z.infer<typeof apiAut002.requestQuery>;
type ApiAut002RequestBody = z.infer<typeof apiAut002.requestBody>;
type ApiAut002ResponseOk = z.infer<(typeof apiAut002.responseBodyMap)[200]>;

export default apiAut002;

export type {
  ApiAut002RequestParam,
  ApiAut002RequestQuery,
  ApiAut002RequestBody,
  ApiAut002ResponseOk,
};
