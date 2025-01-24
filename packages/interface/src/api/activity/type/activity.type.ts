import { z } from "zod";

import { zClubSummary } from "@sparcs-clubs/interface/api/club/type/club.type";
import { zExecutiveSummary } from "@sparcs-clubs/interface/api/user/type/user.type";
import {
  ActivityStatusEnum,
  ActivityTypeEnum,
} from "@sparcs-clubs/interface/common/enum/activity.enum";

// TODO: 수정 필요
export const zActivity = z.object({
  id: z.coerce.number().int().min(1),
  clubId: z.coerce.number().int().min(1),
  name: z.string().max(255).min(1),
});

export const zActivitySummary = z.object({
  id: z.coerce.number().int().min(1),
  activityStatusEnum: z.nativeEnum(ActivityStatusEnum),
  activityTypeEnum: z.nativeEnum(ActivityTypeEnum),
  club: zClubSummary.pick({ id: true }),
  name: z.string().max(255),
  commentedAt: z.coerce.date().nullable(),
  editedAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const zActivitySummaryResponse = zActivitySummary.extend({
  club: zClubSummary,
});

export const zActivitySummaryExecutiveResponse =
  zActivitySummaryResponse.extend({
    chargedExecutive: zExecutiveSummary.optional(),
    recentReviewedExecutive: zExecutiveSummary.optional(),
  });

// TODO: 수정 필요
export const zActivityD = z.object({
  id: z.coerce.number().int().min(1),
  startTerm: z.date(),
  endTerm: z.date(),
});

export type IActivitySummary = z.infer<typeof zActivitySummary>;
export type IActivityResponseSummary = z.infer<typeof zActivitySummaryResponse>;
export type IActivitySummaryExecutiveResponse = z.infer<
  typeof zActivitySummaryExecutiveResponse
>;
export type IActivityD = z.infer<typeof zActivityD>;
