import { z } from "zod";

import {
  zDivision,
  zDivisionSummary,
} from "@sparcs-clubs/interface/api/division/type/division.type";
import { zProfessor } from "@sparcs-clubs/interface/api/user/type/user.type";
import { ClubTypeEnum } from "@sparcs-clubs/interface/common/enum/club.enum";
import zId from "@sparcs-clubs/interface/common/type/id.type";

// TODO: 수정 필요
export const zClub = z.object({
  id: zId,
  name: z.string().max(255).min(1),
  typeEnum: z.nativeEnum(ClubTypeEnum),
  division: zDivision.pick({ id: true }),
  professor: zProfessor.pick({ id: true }).nullable(),
});

// TODO: 수정 필요
export const zClubSummary = zClub.pick({
  id: true,
  name: true,
  typeEnum: true,
  division: true,
  professor: true,
});

export const zClubSummaryResponse = zClubSummary.extend({
  division: zDivision,
  professor: zProfessor,
});

export type IClubSummary = z.infer<typeof zClubSummary>;
export type IClubSummaryResponse = z.infer<typeof zClubSummaryResponse>;
export type IDivisionSummary = z.infer<typeof zDivisionSummary>;
