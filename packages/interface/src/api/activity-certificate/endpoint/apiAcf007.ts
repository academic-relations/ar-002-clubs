import { ActivityCertificateOrderStatusEnum } from "@sparcs-clubs/interface/common/enum/activityCertificate.enum";
import { HttpStatusCode } from "axios";
import { z } from "zod";

/**
 * @version v0.1
 * @description 자신이 신청한 활동확인서 발급 신청 목록을 가져옵니다
 */

const url = () => `/student/activity-certificates`;
const method = "GET";

const requestParam = z.object({});

const requestQuery = z.object({
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  pageOffset: z.number().positive(),
  itemCount: z.number().positive(),
});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    items: z.array(
      z.object({
        orderId: z.number().int(),
        studentName: z.string(),
        issuedNumber: z.number().int().positive(),
        statusEnum: z.nativeEnum(ActivityCertificateOrderStatusEnum),
        createdAt: z.date(),
      }),
    ),
    total: z.number().int().min(0),
    offset: z.number().int().min(1),
  }),
};

const responseErrorMap = {};

const apiAcf007 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiAcf007RequestParam = z.infer<typeof apiAcf007.requestParam>;
type ApiAcf007RequestQuery = z.infer<typeof apiAcf007.requestQuery>;
type ApiAcf007RequestBody = z.infer<typeof apiAcf007.requestBody>;
type ApiAcf007ResponseOk = z.infer<(typeof apiAcf007.responseBodyMap)[200]>;

export default apiAcf007;

export type {
  ApiAcf007RequestParam,
  ApiAcf007RequestQuery,
  ApiAcf007RequestBody,
  ApiAcf007ResponseOk,
};
