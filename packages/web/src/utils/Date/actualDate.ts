import { setYear, setMonth, setDate } from "date-fns";

export function actualDate(year: number, month: number, day: number) {
  let date = new Date();
  date = setYear(date, year);
  date = setMonth(date, month - 1);
  date = setDate(date, day);
  return date;
}
