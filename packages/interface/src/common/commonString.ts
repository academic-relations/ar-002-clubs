import z from "zod";

export const zClubName = z.string().max(128);
export const zUserName = z.string().max(255);
export const zFileName = z.string().max(256);
