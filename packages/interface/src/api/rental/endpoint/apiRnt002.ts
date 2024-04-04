import { HttpStatusCode } from "axios";
import { z } from "zod";

/**
 * @version v0.1
 * @description 대여를 신청합니다
 */

const url = () => `/student/rentals/rental`;
const method = "POST";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  clubId: z.number().int().min(1),
  studentPhoneNumber: z.string(),
  objects: z
    .object({
      id: z.number().int().min(1),
      number: z.number().int().min(0),
    })
    .array(),
  purpose: z.string().max(512),
  desiredStart: z.date(),
  desiredEnd: z.date(),
});

const responseBodyMap = {
  [HttpStatusCode.Created]: z.object({}),
};

const responseErrorMap = {
  [HttpStatusCode.Locked]: z.object({
    status: z.literal("Error"),
    message: z.literal("Already used by other oreder."),
  }),
};

const apiRnt002 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiRnt002RequestParam = z.infer<typeof apiRnt002.requestParam>;
type ApiRnt002RequestQuery = z.infer<typeof apiRnt002.requestQuery>;
type ApiRnt002RequestBody = z.infer<typeof apiRnt002.requestBody>;
type ApiRnt002ResponseOK = z.infer<(typeof apiRnt002.responseBodyMap)[201]>;
type ApiRnt002ErrorLocked = z.infer<(typeof apiRnt002.responseErrorMap)[423]>;

export default apiRnt002;

export type {
  ApiRnt002RequestParam,
  ApiRnt002RequestQuery,
  ApiRnt002RequestBody,
  ApiRnt002ResponseOK,
  ApiRnt002ErrorLocked,
};
