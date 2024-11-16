import { HttpStatusCode } from "axios";
import { z } from "zod";

import { zKrPhoneNumber } from "@sparcs-clubs/interface/common/type/phoneNumber.type";

/**
 * @version v0.1
 * @description 대여 가능한 물품의 최대 갯수를 가져옵니다
 */

const url = () => `/student/storage/applications/application`;
const method = "POST";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({
  clubId: z.coerce.number().int().min(1),
  studentId: z.coerce.number().int().min(1),
  studentPhoneNumber: zKrPhoneNumber,
  numberOfBoxes: z.coerce.number().int().min(0),
  desiredPickUpDate: z.coerce.date(),
  nonStandardItems: z
    .object({
      name: z.coerce.string().max(30),
      fileId: z.coerce.number().int().min(1),
    })
    .array(),
  desiredStartDate: z.coerce.date(),
  desiredEndDate: z.coerce.date(),
  note: z.coerce.string().max(512),
});

const responseBodyMap = {
  [HttpStatusCode.Created]: z.object({}),
};

const responseErrorMap = {};

const apiSto001 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiSto001RequestParam = z.infer<typeof apiSto001.requestParam>;
type ApiSto001RequestQuery = z.infer<typeof apiSto001.requestQuery>;
type ApiSto001RequestBody = z.infer<typeof apiSto001.requestBody>;
type ApiSto001ResponseCreated = z.infer<
  (typeof apiSto001.responseBodyMap)[201]
>;

export default apiSto001;

export type {
  ApiSto001RequestParam,
  ApiSto001RequestQuery,
  ApiSto001RequestBody,
  ApiSto001ResponseCreated,
};
