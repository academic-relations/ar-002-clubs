import { HttpStatusCode } from "axios";

import { z } from "zod";

/**
 * @version v0.1
 * @description 집행부원으로서 동아리 등록 신청을 수락합니다..
 */

const url = (applyId: string) =>
  `/executive/registrations/club-registraions/club-registration/${applyId}/approval`;
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

const apiReg016 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiReg016RequestParam = z.infer<typeof apiReg016.requestParam>;
type ApiReg016RequestQuery = z.infer<typeof apiReg016.requestQuery>;
type ApiReg016RequestBody = z.infer<typeof apiReg016.requestBody>;
type ApiReg016ResponseOk = z.infer<(typeof apiReg016.responseBodyMap)[200]>;

export default apiReg016;

export type {
  ApiReg016RequestParam,
  ApiReg016RequestQuery,
  ApiReg016RequestBody,
  ApiReg016ResponseOk,
};
