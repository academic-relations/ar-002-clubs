import { HttpStatusCode } from "axios";
import { z } from "zod";

import { FundingStatusEnum } from "@sparcs-clubs/interface/common/enum/funding.enum";

import { zFunding } from "./type/funding.type";

/**
 * @version v0.1
 * @description 집행부원으로서 지원금 신청에 comment를 남깁니다.
 */

// TODO: 변경 필요

const url = (id: number, fundingStatusEnum: FundingStatusEnum) =>
  `/executive/fundings/funding/${id}/${fundingStatusEnum}`;
const method = "PATCH";
export const ApiFnd014RequestUrl =
  "/executive/activities/activity/:activityId/:fundingStatusEnum";

const requestParam = z.object({
  fundingId: zFunding.pick({ id: true }).shape.id,
  fundingStatusEnum: zFunding.pick({ fundingStatusEnum: true }).shape
    .fundingStatusEnum,
});

const requestQuery = z.object({});

const requestBody = z.object({});

const responseBodyMap = {
  [HttpStatusCode.Ok]: z.object({}),
};

const responseErrorMap = {};

const apiFnd014 = {
  url,
  method,
  requestParam,
  requestQuery,
  requestBody,
  responseBodyMap,
  responseErrorMap,
};

type ApiFnd014RequestParam = z.infer<typeof apiFnd014.requestParam>;
type ApiFnd014RequestQuery = z.infer<typeof apiFnd014.requestQuery>;
type ApiFnd014RequestBody = z.infer<typeof apiFnd014.requestBody>;
type ApiFnd014ResponseOk = z.infer<(typeof apiFnd014.responseBodyMap)[200]>;

export default apiFnd014;

export type {
  ApiFnd014RequestParam,
  ApiFnd014RequestQuery,
  ApiFnd014RequestBody,
  ApiFnd014ResponseOk,
};
