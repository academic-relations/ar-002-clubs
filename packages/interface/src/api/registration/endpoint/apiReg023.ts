import { HttpStatusCode } from "axios";
import { z } from "zod";

/**
 * @version v0.1
 * @description 교수로서 동아리 등록 신청을 수락(DB에서 boolean으로 관리)합니다.
 */

const url = (applyId: number) =>
  `/professor/registrations/club-registrations/club-registration/${applyId}/approval`;
const method = "PATCH";

const requestParam = z.object({
  applyId: z.coerce.number().int().min(1),
});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({}),
};

const responseErrorMap = {};

const apiReg023 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiReg023RequestParam = z.infer<typeof apiReg023.requestParam>;
type ApiReg023RequestQuery = z.infer<typeof apiReg023.requestQuery>;
type ApiReg023RequestBody = z.infer<typeof apiReg023.requestBody>;
type ApiReg023ResponseOk = z.infer<(typeof apiReg023.responseBodyMap)[200]>;

export default apiReg023;

export type {
  ApiReg023RequestParam,
  ApiReg023RequestQuery,
  ApiReg023RequestBody,
  ApiReg023ResponseOk,
};
