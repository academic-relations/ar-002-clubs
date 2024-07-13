import { HttpStatusCode } from "axios";
import { z } from "zod";

/**
 * @version v0.1
 * @description 파일 업로드를 위한 URL을 가져옵니다.
 */

const url = () => `/files/file/upload-url`;
const method = "GET";

const requestParam = z.object({});

const requestQuery = z.object({
  name: z.coerce.string().max(256),
  type: z.coerce.string().max(30),
  size: z.coerce.number().int().min(1),
});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    uploadUrl: z.string(),
    fileId: z.string().max(128),
  }),
};

const responseErrorMap = {};

const apiFil001 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiFil001RequestParam = z.infer<typeof apiFil001.requestParam>;
type ApiFil001RequestQuery = z.infer<typeof apiFil001.requestQuery>;
type ApiFil001RequestBody = z.infer<typeof apiFil001.requestBody>;
type ApiFil001ResponseOk = z.infer<(typeof apiFil001.responseBodyMap)[200]>;

export default apiFil001;

export type {
  ApiFil001RequestParam,
  ApiFil001RequestQuery,
  ApiFil001RequestBody,
  ApiFil001ResponseOk,
};
