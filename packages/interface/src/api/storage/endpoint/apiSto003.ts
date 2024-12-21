import { HttpStatusCode } from "axios";
import { z } from "zod";

/**
 * @version v0.1
 * @description 현재 학기 출력 해당 동아리의 홍보물 신청 내역을 가져옵니다.
 */

const url = () => `/student/storage/applications/my/`;
const method = "GET";

const requestParam = z.object({});

const requestQuery = z.object({
  clubId: z.coerce.number().min(1),
  pageOffset: z.coerce.number().min(1),
  itemCount: z.coerce.number().min(1),
});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    items: z.array(
      z.object({
        clubId: z.number().int().min(1),
        desiredStartDate: z.date(),
        desiredEndDate: z.date(),
        numberOfBoxes: z.number().int().min(0),
        numberOfNonStandardItems: z.number().int().min(0),
        status: z.string().max(30),
        createdAt: z.date(),
      }),
    ),
    total: z.number().int().min(0),
    offset: z.number().int().min(1),
  }),
};

const responseErrorMap = {};

const apiSto003 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiSto003RequestParam = z.infer<typeof apiSto003.requestParam>;
type ApiSto003RequestQuery = z.infer<typeof apiSto003.requestQuery>;
type ApiSto003RequestBody = z.infer<typeof apiSto003.requestBody>;
type ApiSto003ResponseOk = z.infer<(typeof apiSto003.responseBodyMap)[200]>;

export default apiSto003;

export type {
  ApiSto003RequestParam,
  ApiSto003RequestQuery,
  ApiSto003RequestBody,
  ApiSto003ResponseOk,
};
