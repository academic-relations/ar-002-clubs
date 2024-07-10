import { HttpStatusCode } from "axios";
import { z } from "zod";

import { FundingOrderStatusEnum } from "@sparcs-clubs/interface/common/enum/funding.enum";

/**
 * @version v0.1
 * @description 현재 학기의 지원금 신청을 조회합니다.
 */

const url = "/student/fundings";
const method = "GET";

const requestParam = z.object({});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({
    fundings: z.array(
      z.object({
        id: z.coerce.number().int().min(1),
        fundingOrderStatusEnumId: z.nativeEnum(FundingOrderStatusEnum),
        activityName: z.coerce.string().max(255),
        expenditureAmount: z.coerce.number().int().min(0),
        approvedAmount: z.coerce.number().int().min(0).optional(),
      }),
    ),
  }),
};

const responseErrorMap = {};

const apiFnd005 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiFnd005RequestParam = z.infer<typeof apiFnd005.requestParam>;
type ApiFnd005RequestQuery = z.infer<typeof apiFnd005.requestQuery>;
type ApiFnd005RequestBody = z.infer<typeof apiFnd005.requestBody>;
type ApiFnd005ResponseOk = z.infer<(typeof apiFnd005.responseBodyMap)[200]>;

export default apiFnd005;

export type {
  ApiFnd005RequestParam,
  ApiFnd005RequestQuery,
  ApiFnd005RequestBody,
  ApiFnd005ResponseOk,
};
