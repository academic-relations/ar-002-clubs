import { HttpStatusCode } from "axios";
import { z } from "zod";

/**
 * @version v0.1
 * @description 이번학기 동아리 재등록 신청이 가능한 동아리 id 목록을 리턴합니다.
 */

const url = () => `/student/registration/qualification/renewal`;
const method = "GET";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    clubs: z.array(z.object({ id: z.number().int().min(1) })),
  }),
};

const responseErrorMap = {};

const apiReg002 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiReg002RequestParam = z.infer<typeof apiReg002.requestParam>;
type ApiReg002RequestQuery = z.infer<typeof apiReg002.requestQuery>;
type ApiReg002RequestBody = z.infer<typeof apiReg002.requestBody>;
type ApiReg002ResponseCreated = z.infer<
  (typeof apiReg002.responseBodyMap)[200]
>;

export default apiReg002;

export type {
  ApiReg002RequestParam,
  ApiReg002RequestQuery,
  ApiReg002RequestBody,
  ApiReg002ResponseCreated,
};