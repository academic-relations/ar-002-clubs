import { parse } from "date-fns";

const parseDate = (dateString: string) =>
  parse(dateString, "yyyy년 M월 d일 (iii)", new Date());

const parseMonth = (dateString: string) =>
  parse(dateString, "yyyy년 M월", new Date());

const parseSimpleSlashDate = (dateString: string) =>
  parse(dateString, "M/d(E)", new Date());

const parseSimplerSlashDate = (dateString: string) =>
  parse(dateString, "M/d", new Date());

const parseSlashDate = (dateString: string) =>
  parse(dateString, "MM/dd (E)", new Date());

const parseDateTime = (dateString: string) =>
  parse(dateString, "yyyy년 M월 d일 (iii) HH:mm", new Date());

const parseTime = (dateString: string) =>
  parse(dateString, "HH:mm", new Date());

const parseSlashDateTime = (dateString: string) =>
  parse(dateString, "yyyy/MM/dd HH:mm", new Date());

const parseDotDate = (dateString: string) =>
  parse(dateString, "yyyy.MM.dd", new Date());

const parseDotDetailDate = (dateString: string) =>
  parse(dateString, "yyyy.MM.dd HH:mm", new Date());

export {
  parseDate,
  parseDateTime,
  parseDotDate,
  parseDotDetailDate,
  parseMonth,
  parseSimpleSlashDate,
  parseSimplerSlashDate,
  parseSlashDate,
  parseSlashDateTime,
  parseTime,
};
