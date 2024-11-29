import { HttpStatusCode } from "axios";
import { z } from "zod";

/**
 * @version v0.1
 * @description 현재 학기 출력 해당 동아리의 홍보물 신청 내역을 가져옵니다.
 */

const url = () => `/student/storage/applications`;
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
        applicationId: z.number().int().min(1),
        clubNameKr: z.string().max(128),
        clubNameEn: z.string().max(128),
        studentName: z.number().int().min(1),
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

const apiSto002 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiSto002RequestParam = z.infer<typeof apiSto002.requestParam>;
type ApiSto002RequestQuery = z.infer<typeof apiSto002.requestQuery>;
type ApiSto002RequestBody = z.infer<typeof apiSto002.requestBody>;
type ApiSto002ResponseOk = z.infer<(typeof apiSto002.responseBodyMap)[200]>;

export default apiSto002;

export type {
  ApiSto002RequestParam,
  ApiSto002RequestQuery,
  ApiSto002RequestBody,
  ApiSto002ResponseOk,
};
