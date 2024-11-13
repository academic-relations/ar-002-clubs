import { HttpStatusCode } from "axios";
import { z } from "zod";

/**
 * @version v0.1
 * @description 현재 학기 출력 해당 동아리의 홍보물 신청 내역을 가져옵니다.
 */

const url = () => `/executive/storage/application/`;
const method = "GET";

const requestParam = z.object({});

const requestQuery = z.object({
  pageOffset: z.number().min(1),
  itemCount: z.number().min(1),
});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    items: z.array(
      z.object({
        clubId: z.number().int().min(1),
        studentId: z.number().int().min(1),
        studentPhoneNumber: z.string().max(30),
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

const apiSto010 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiSto010RequestParam = z.infer<typeof apiSto010.requestParam>;
type ApiSto010RequestQuery = z.infer<typeof apiSto010.requestQuery>;
type ApiSto010RequestBody = z.infer<typeof apiSto010.requestBody>;
type ApiSto010ResponseOk = z.infer<(typeof apiSto010.responseBodyMap)[200]>;

export default apiSto010;

export type {
  ApiSto010RequestParam,
  ApiSto010RequestQuery,
  ApiSto010RequestBody,
  ApiSto010ResponseOk,
};
