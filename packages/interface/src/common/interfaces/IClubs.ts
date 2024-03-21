import { z } from "zod";

const ClubstestDto = z.object({
  id: z.number(),
  name: z.string().max(20),
  type: z.string().max(10),
  characteristic: z.string().max(50),
  representative: z.string().max(20),
  advisor: z.string().max(20),
  totalMemberCnt: z.number().gt(0),
});
const ClubsResponseDto = z.object({
  id: z.number(),
  name: z.string().max(20),
  clubs: z.array(ClubstestDto),
});

export type ClubsResponseDtoType = z.infer<typeof ClubsResponseDto>;
