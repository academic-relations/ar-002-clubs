import { HttpStatusCode } from "axios";
import { z } from "zod";

/**
 * @version v0.1
 * @description 네이버 카페의 공지사항을 모두 크롤링해옵니다.
 * 집행부원으로 로그인되어있어야 합니다.
 */

const url = () => `/student/notices/update`;
const method = "POST";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Created]: z.object({}),
};

const responseErrorMap = {};

const apiNtc004 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiNtc004RequestParam = z.infer<typeof apiNtc004.requestParam>;
type ApiNtc004RequestQuery = z.infer<typeof apiNtc004.requestQuery>;
type ApiNtc004RequestBody = z.infer<typeof apiNtc004.requestBody>;
type ApiNtc004ResponseCreated = z.infer<
  (typeof apiNtc004.responseBodyMap)[201]
>;

export default apiNtc004;

export type {
  ApiNtc004RequestParam,
  ApiNtc004RequestQuery,
  ApiNtc004RequestBody,
  ApiNtc004ResponseCreated,
};
