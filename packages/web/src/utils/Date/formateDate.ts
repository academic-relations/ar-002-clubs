import { format } from "date-fns";
import { ko } from "date-fns/locale";

const formatDate = (date: Date) =>
  format(date, "yyyy년 M월 d일 (iii)", { locale: ko });

const formatDateTime = (date: Date) =>
  format(date, "yyyy년 M월 d일 (iii) HH:mm", { locale: ko });

const formatTime = (date: Date) => format(date, "HH:mm", { locale: ko });

export { formatDate, formatDateTime, formatTime };
