import z from "zod";

export const zClubName = z.string().max(128);
