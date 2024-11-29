import { HttpStatusCode } from "axios";
import { z } from "zod";

/**
 * @version v0.1
 * @description 현재 학기 출력 해당 동아리의 홍보물 신청 내역을 가져옵니다.
 */

const url = (applicationId: string) =>
  `/student/storage/applications/application/${applicationId}`;
const method = "PUT";

const requestParam = z.object({
  applicationId: z.coerce.number().int().min(1),
});

const requestQuery = z.object({});

const requestBody = z.object({
  numberOfBoxes: z.coerce.number().int().min(0),
  desiredPickUpDate: z.coerce.date(),
  nonStandardItems: z
    .object({
      name: z.coerce.string().max(30),
      fileId: z.coerce.string().max(128),
    })
    .array()
    .optional(),
  desiredStartDate: z.coerce.date(),
  desiredEndDate: z.coerce.date(),
  status: z.coerce.string().max(30).optional(),
  isPickedUp: z.coerce.boolean(),
  note: z.coerce.string().max(512).optional(),
});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({}),
};

const responseErrorMap = {};

const apiSto006 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiSto006RequestParam = z.infer<typeof apiSto006.requestParam>;
type ApiSto006RequestQuery = z.infer<typeof apiSto006.requestQuery>;
type ApiSto006RequestBody = z.infer<typeof apiSto006.requestBody>;
type ApiSto006ResponseOk = z.infer<(typeof apiSto006.responseBodyMap)[200]>;

export default apiSto006;

export type {
  ApiSto006RequestParam,
  ApiSto006RequestQuery,
  ApiSto006RequestBody,
  ApiSto006ResponseOk,
};
