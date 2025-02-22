import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zDivisionSummaryResponse } from "../type/division.type";

/**
 * @version v0.1
 * @description 현재 유효한 분과 목록을 조회합니다.
 * - public한 API입니다.
 */

const url = () => `/divisions/current`;
export const ApiDiv002RequestUrl = `/divisions/current`;
const method = "GET";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    divisions: z.array(zDivisionSummaryResponse),
  }),
};

const responseErrorMap = {};

const apiDiv002 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiDiv002RequestParam = z.infer<typeof apiDiv002.requestParam>;
type ApiDiv002RequestQuery = z.infer<typeof apiDiv002.requestQuery>;
type ApiDiv002RequestBody = z.infer<typeof apiDiv002.requestBody>;
type ApiDiv002ResponseOk = z.infer<(typeof apiDiv002.responseBodyMap)[200]>;

export default apiDiv002;

export type {
  ApiDiv002RequestParam,
  ApiDiv002RequestQuery,
  ApiDiv002RequestBody,
  ApiDiv002ResponseOk,
};
