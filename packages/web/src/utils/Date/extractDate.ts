import { addHours, subHours } from "date-fns";

export const getActualYear = (date: Date | string) =>
  new Date(date).getFullYear();

export const getActualMonth = (date: Date | string) =>
  new Date(date).getMonth() + 1;

export const utcToKst = (date: Date) => addHours(date, 9); // DB에 넣을 때
export const kstToUtc = (date: Date) => subHours(date, 9); // DB에서 가져올 때
