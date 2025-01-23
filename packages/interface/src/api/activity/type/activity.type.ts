import { z } from "zod";

// TODO: 수정 필요
export const zActivity = z.object({
  id: z.coerce.number().int().min(1),
  clubId: z.coerce.number().int().min(1),
  name: z.string().max(255).min(1),
});

// TODO: 수정 필요
export const zActivitySummary = zActivity.pick({
  id: true,
  name: true,
});

// TODO: 수정 필요
export const zActivityD = z.object({
  id: z.coerce.number().int().min(1),
  startTerm: z.date(),
  endTerm: z.date(),
});

export type IActivitySummary = z.infer<typeof zActivitySummary>;
export type IActivityD = z.infer<typeof zActivityD>;
