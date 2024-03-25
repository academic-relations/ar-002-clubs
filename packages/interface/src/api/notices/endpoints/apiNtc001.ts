import { HttpStatusCode } from "axios";
import { z } from "zod";

/**
 * @version v0.1
 * @description 전체 공지사항 목록을 Pagination을 통해 가져옵니다
 */

const url = () => `/notices`;
const method = "GET";

const requestParam = z.object({});

const requestQuery = z.object({
  pageOffset: z.number().int().positive(),
  itemCount: z.number().int().positive(),
});

const requestBody = z.object({});

const zNotice = z.object({
  id: z.number().int().positive(),
  title: z.string().max(512),
  author: z.string().max(20),
  date: z.coerce.date(),
  link: z.string().max(200),
});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    notices: zNotice.array(),
    totalPosts: z.number().int().positive(),
  }),
};

const responseErrorMap = {};

const apiNtc001 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

export default apiNtc001;
