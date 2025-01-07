import { format as formatFns } from "date-fns";
import { ko } from "date-fns/locale";

/**
 * NOTE: (@dora)
 * - KST 기준으로 포맷팅하기 위해서는 시간대를 변경해야 함
 * - 예시) 2025-01-01T00:00:00Z -> 2025-01-01T00:00:00+09:00
 */
const format = (
  date: Date,
  _format: string,
  options?: Parameters<typeof formatFns>[2],
) => {
  const dateString = new Date(date).toISOString();
  const dateStringWithTimezone = dateString.replace("Z", "+09:00");
  const dateWithTimezone = new Date(dateStringWithTimezone);
  return formatFns(dateWithTimezone, _format, options);
};

const formatDate = (date: Date) =>
  format(date, "yyyy년 M월 d일 (iii)", { locale: ko });

const formatMonth = (date: Date) => format(date, "yyyy년 M월", { locale: ko });

const formatSimpleSlashDate = (date: Date) =>
  format(date, "M/d(E)", { locale: ko });

const formatSimplerSlashDate = (date: Date) =>
  format(date, "M/d", { locale: ko });

const formatSlashDate = (date: Date) =>
  format(date, "MM/dd (E)", { locale: ko });

const formatDateTime = (date: Date) =>
  format(date, "yyyy년 M월 d일 (iii) HH:mm", { locale: ko });

const formatDateTimeEn = (date: Date) =>
  format(date, "MMM dd, yyyy (iii) HH:mm");

const formatTime = (date: Date) => format(date, "HH:mm", { locale: ko });

const formatSlashDateTime = (date: Date) =>
  format(date, "yyyy/MM/dd HH:mm", { locale: ko });

const formatDotDate = (date: Date) =>
  format(date, "yyyy.MM.dd", { locale: ko });

const formatDotSimpleDate = (date: Date) =>
  format(date, "yy.MM.dd", { locale: ko });

const formatDotDetailDate = (date: Date) =>
  format(date, "yyyy.MM.dd HH:mm", { locale: ko });

export {
  formatDate,
  formatDateTime,
  formatDateTimeEn,
  formatDotDate,
  formatDotDetailDate,
  formatDotSimpleDate,
  formatMonth,
  formatSimplerSlashDate,
  formatSimpleSlashDate,
  formatSlashDate,
  formatSlashDateTime,
  formatTime,
};
