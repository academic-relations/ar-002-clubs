import { format } from "date-fns";
import { ko } from "date-fns/locale";

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

const formatTime = (date: Date) => format(date, "HH:mm", { locale: ko });

const formatSlashDateTime = (date: Date) =>
  format(date, "yyyy/MM/dd HH:mm", { locale: ko });

const formatDotDate = (date: Date) =>
  format(date, "yyyy.MM.dd", { locale: ko });

export {
  formatDate,
  formatDateTime,
  formatDotDate,
  formatMonth,
  formatSimpleSlashDate,
  formatSimplerSlashDate,
  formatSlashDate,
  formatSlashDateTime,
  formatTime,
};
