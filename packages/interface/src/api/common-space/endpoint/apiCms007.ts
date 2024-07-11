import { HttpStatusCode } from "axios";
import { z } from "zod";

import { CommonSpaceUsageOrderStatusEnum } from "@sparcs-clubs/interface/common/enum/commonSpace.enum";

/**
 * @version v0.1
 * @description 자신의 공용공간 사용신청 내역을 가져옵니다.
 */

const url = () => `/student/common-spaces/orders/my`;
const method = "GET";

const requestParam = z.object({});

const requestQuery = z.object({
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  pageOffset: z.number().min(1),
  itemCount: z.number().min(1),
});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    items: z.array(
      z.object({
        orderId: z.number().int().min(1),
        statusEnum: z.nativeEnum(CommonSpaceUsageOrderStatusEnum),
        spaceName: z.string(),
        chargeStudentName: z.string().max(255),
        startTerm: z.date(), // Assuming startTerm is a datetime
        endTerm: z.date(), // Assuming endTerm is a datetime
        createdAt: z.date(), // Assuming createdAt is a datetime
      }),
    ),
    total: z.number().int().min(0),
    offset: z.number().int().min(1),
  }),
};

const responseErrorMap = {};

const apiCms007 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiCms007RequestParam = z.infer<typeof apiCms007.requestParam>;
type ApiCms007RequestQuery = z.infer<typeof apiCms007.requestQuery>;
type ApiCms007RequestBody = z.infer<typeof apiCms007.requestBody>;
type ApiCms007ResponseOk = z.infer<(typeof apiCms007.responseBodyMap)[200]>;

export default apiCms007;

export type {
  ApiCms007RequestParam,
  ApiCms007RequestQuery,
  ApiCms007RequestBody,
  ApiCms007ResponseOk,
};
