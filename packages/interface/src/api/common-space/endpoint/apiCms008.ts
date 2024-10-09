import { HttpStatusCode } from "axios";
import { z } from "zod";

import { CommonSpaceUsageOrderStatusEnum } from "@sparcs-clubs/interface/common/enum/commonSpace.enum";

/**
 * @version v0.1
 * @description 개별 공용공간 사용신청 내역을 가져옵니다.
 */

const url = (orderId: number) =>
  `/student/common-spaces/common-space/usage-order/${orderId}`;
const method = "GET";

const requestParam = z.object({
  orderId: z.coerce.number().int().min(1), // orderId는 양의 정수여야 합니다.
});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    orderId: z.number().int().min(1),
    statusEnum: z.nativeEnum(CommonSpaceUsageOrderStatusEnum),
    spaceName: z.string(),
    chargeStudentName: z.string().max(255),
    startTerm: z.coerce.date(), // Assuming startTerm is a datetime
    endTerm: z.coerce.date(), // Assuming endTerm is a datetime
    createdAt: z.coerce.date(), // Assuming createdAt is a datetime
  }),
};

const responseErrorMap = {};

const apiCms008 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiCms008RequestParam = z.infer<typeof apiCms008.requestParam>;
type ApiCms008RequestQuery = z.infer<typeof apiCms008.requestQuery>;
type ApiCms008RequestBody = z.infer<typeof apiCms008.requestBody>;
type ApiCms008ResponseOk = z.infer<(typeof apiCms008.responseBodyMap)[200]>;

export default apiCms008;

export type {
  ApiCms008RequestParam,
  ApiCms008RequestQuery,
  ApiCms008RequestBody,
  ApiCms008ResponseOk,
};
