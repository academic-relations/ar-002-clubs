import { HttpStatusCode } from "axios";
import { z } from "zod";

import { FundingStatusEnum } from "@sparcs-clubs/interface/common/enum/funding.enum";

import { zFunding, zFundingComment } from "../type/funding.type";

/**
 * @version v0.1
 * @description 집행부원으로서 지원금 신청에 comment를 남깁니다.
 */

const url = (id: number, fundingStatusEnum: FundingStatusEnum) =>
  `/executive/fundings/funding/${id}/comments/${fundingStatusEnum}`;
const method = "POST";
export const ApiFnd013RequestUrl =
  "/executive/fundings/funding/:id/comments/:fundingStatusEnum";

const requestParam = z.object({
  id: zFunding.pick({ id: true }).shape.id,
  fundingStatusEnum: zFundingComment.pick({ fundingStatusEnum: true }).shape
    .fundingStatusEnum,
});

const requestQuery = z.object({});

const requestBody = z.object({
  approvedAmount: zFundingComment.pick({ approvedAmount: true }).shape
    .approvedAmount,
});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({}),
};

const responseErrorMap = {};

const apiFnd013 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiFnd013RequestParam = z.infer<typeof apiFnd013.requestParam>;
type ApiFnd013RequestQuery = z.infer<typeof apiFnd013.requestQuery>;
type ApiFnd013RequestBody = z.infer<typeof apiFnd013.requestBody>;
type ApiFnd013ResponseOk = z.infer<(typeof apiFnd013.responseBodyMap)[200]>;

export default apiFnd013;

export type {
  ApiFnd013RequestParam,
  ApiFnd013RequestQuery,
  ApiFnd013RequestBody,
  ApiFnd013ResponseOk,
};
