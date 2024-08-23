import { HttpStatusCode } from "axios";
import { z } from "zod";

/**
 * @version v0.1
 * @description 동아리 등록을 삭제합니다.
 */

const url = (applyId: string) =>
  `/student/registrations/club-registrations/club-registration/${applyId}`;

const method = "DELETE";

const requestParam = z.object({
  applyId: z.coerce.number().int().min(1),
});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({}),
};

const responseErrorMap = {};

const apiReg010 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiReg010RequestParam = z.infer<typeof apiReg010.requestParam>;
type ApiReg010RequestQuery = z.infer<typeof apiReg010.requestQuery>;
type ApiReg010RequestBody = z.infer<typeof apiReg010.requestBody>;
type ApiReg010ResponseOk = z.infer<(typeof apiReg010.responseBodyMap)[200]>;

export default apiReg010;

export type {
  ApiReg010RequestParam,
  ApiReg010RequestQuery,
  ApiReg010RequestBody,
  ApiReg010ResponseOk,
};
