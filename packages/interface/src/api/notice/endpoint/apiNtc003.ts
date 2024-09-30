import { HttpStatusCode } from "axios";
import { z } from "zod";

/**
 * @version v0.1
 * @description 새로운 공지사항을 생성합니다.
 * 집행부원으로 로그인되어있어야 합니다.
 */

const url = () => `/student/notices`;
const method = "POST";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  title: z.string().max(100),
  author: z.string().max(20),
  date: z.date().optional().default(new Date()),
  link: z.string().max(200),
});

const responseBodyMap = {
  [HttpStatusCode.Created]: z.object({}),
};

const responseErrorMap = {};

const apiNtc003 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiNtc003RequestParam = z.infer<typeof apiNtc003.requestParam>;
type ApiNtc003RequestQuery = z.infer<typeof apiNtc003.requestQuery>;
type ApiNtc003RequestBody = z.infer<typeof apiNtc003.requestBody>;
type ApiNtc003ResponseCreated = z.infer<
  (typeof apiNtc003.responseBodyMap)[201]
>;

export default apiNtc003;

export type {
  ApiNtc003RequestParam,
  ApiNtc003RequestQuery,
  ApiNtc003RequestBody,
  ApiNtc003ResponseCreated,
};
