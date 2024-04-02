import { HttpStatusCode } from "axios";
import { z } from "zod";

/**
 * @version v0.1
 * @description 신청한 사용 신청을 삭제합니다.
 *              - 신청자 본인이 직접 삭제해야 합니다.
 *              - 이용 시작 이전의 사용 신청만 삭제 가능합니다.
 */

const url = (spaceId: number, orderId: number) =>
  `/student/common-spaces/common-space/${spaceId}/usage-order/${orderId}`;
const method = "DELETE";

const requestParam = z.object({
  spaceId: z.number().int().min(1), // spaceId는 양의 정수여야 합니다.
  orderId: z.number().int().min(1), // orderId는 양의 정수여야 합니다.
});

const requestQuery = z.object({
  startDate: z.date(), // startDate는 날짜여야 합니다.
  endDate: z.date(), // endDate는 날짜여야 합니다.
});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({}),
};

const responseErrorMap = {};

const apiCms004 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiCms004RequestParam = z.infer<typeof apiCms004.requestParam>;
type ApiCms004RequestQuery = z.infer<typeof apiCms004.requestQuery>;
type ApiCms004RequestBody = z.infer<typeof apiCms004.requestBody>;
type ApiCms004ResponseOK = z.infer<(typeof apiCms004.responseBodyMap)[200]>;

export default apiCms004;

export type {
  ApiCms004RequestParam,
  ApiCms004RequestQuery,
  ApiCms004RequestBody,
  ApiCms004ResponseOK,
};
