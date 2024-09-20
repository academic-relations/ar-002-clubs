import { format, subHours } from "date-fns";
import { ko } from "date-fns/locale";

const formatKST = (date: Date) => subHours(date, 9);

const formatDate = (date: Date) =>
  format(formatKST(date), "yyyy년 M월 d일 (iii)", { locale: ko });

const formatMonth = (date: Date) =>
  format(formatKST(date), "yyyy년 M월", { locale: ko });

const formatSimpleSlashDate = (date: Date) =>
  format(formatKST(date), "M/d(E)", { locale: ko });

const formatSimplerSlashDate = (date: Date) =>
  format(formatKST(date), "M/d", { locale: ko });

const formatSlashDate = (date: Date) =>
  format(formatKST(date), "MM/dd (E)", { locale: ko });

const formatDateTime = (date: Date) =>
  format(formatKST(date), "yyyy년 M월 d일 (iii) HH:mm", { locale: ko });

const formatTime = (date: Date) =>
  format(formatKST(date), "HH:mm", { locale: ko });

const formatSlashDateTime = (date: Date) =>
  format(formatKST(date), "yyyy/MM/dd HH:mm");

const formatDotDate = (date: Date) =>
  format(formatKST(date), "yyyy.MM.dd", { locale: ko });

const formatDotSimpleDate = (date: Date) =>
  format(formatKST(date), "yy.MM.dd", { locale: ko });

const formatDotDetailDate = (date: Date) =>
  format(formatKST(date), "yyyy.MM.dd HH:mm", { locale: ko });

export {
  formatDate,
  formatDotSimpleDate,
  formatDateTime,
  formatDotDate,
  formatDotDetailDate,
  formatMonth,
  formatSimpleSlashDate,
  formatSimplerSlashDate,
  formatSlashDate,
  formatSlashDateTime,
  formatTime,
};
