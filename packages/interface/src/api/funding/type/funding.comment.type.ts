import { z } from "zod";

import { zExecutiveSummary } from "@sparcs-clubs/interface/api/user/type/user.type";
import { FundingStatusEnum } from "@sparcs-clubs/interface/common/enum/funding.enum";
import zId from "@sparcs-clubs/interface/common/type/id.type";

import { zFunding } from "./funding.common.type";

export const zFundingComment = z.object({
  id: zId,
  funding: zFunding.pick({ id: true }),
  chargedExecutive: zExecutiveSummary.pick({ id: true }),
  content: z.string(),
  fundingStatusEnum: z.nativeEnum(FundingStatusEnum),
  approvedAmount: z.coerce.number().int().min(0),
  createdAt: z.coerce.date(),
});

export const zFundingCommentResponse = zFundingComment.extend({
  chargedExecutive: zExecutiveSummary,
});

export const zFundingCommentRequest = zFundingComment.omit({
  id: true,
  createdAt: true,
});

export type IFundingComment = z.infer<typeof zFundingComment>;
export type IFundingCommentResponse = z.infer<typeof zFundingCommentResponse>;
export type IFundingCommentRequest = z.infer<typeof zFundingCommentRequest>;
