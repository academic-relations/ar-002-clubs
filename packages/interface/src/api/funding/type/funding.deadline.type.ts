import { z } from "zod";

import { FundingDeadlineEnum } from "@sparcs-clubs/interface/common/enum/funding.enum";

export const zFundingDeadline = z.object({
  id: z.coerce.number().int().min(1),
  deadlineEnum: z.nativeEnum(FundingDeadlineEnum),
  startDate: z.date(),
  endDate: z.date(),
  createdAt: z.date(),
  deletedAt: z.date().nullable(),
});

export type IFundingDeadline = z.infer<typeof zFundingDeadline>;
