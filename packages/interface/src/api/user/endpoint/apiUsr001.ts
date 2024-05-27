import { HttpStatusCode } from "axios";
import { z } from "zod";

/**
 * @version v0.1
 * @description 서비스를 신청하는 유저의 정보를 가져옵니다
 */

const url = () => `student/user/my`;
const method = "GET";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    clubs: z.array(
      z.object({
        id: z.number().int().min(1),
        name: z.string().max(30),
      }),
    ),
    name: z.string().max(30),
    email: z.string().max(50),
    department: z.string().max(10),
    studentNumber: z.number().int().min(20000000).max(30000000),
    phoneNumber: z.string().max(20).optional(),
  }),
};

const responseErrorMap = {};

const apiUsr001 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiUsr001RequestParam = z.infer<typeof apiUsr001.requestParam>;
type ApiUsr001RequestQuery = z.infer<typeof apiUsr001.requestQuery>;
type ApiUsr001RequestBody = z.infer<typeof apiUsr001.requestBody>;
type ApiUsr001ResponseOK = z.infer<(typeof apiUsr001.responseBodyMap)[200]>;

export default apiUsr001;

export type {
  ApiUsr001RequestParam,
  ApiUsr001RequestQuery,
  ApiUsr001RequestBody,
  ApiUsr001ResponseOK,
};
