import { z } from "zod";

import zId from "@sparcs-clubs/interface/common/type/id.type";

// TODO: 수정 필요
export const zClub = z.object({
  id: zId,
  name: z.string().max(255).min(1),
});

// TODO: 수정 필요
export const zClubSummary = zClub.pick({
  id: true,
  name: true,
});

export type IClubSummary = z.infer<typeof zClubSummary>;
