import { formatMonth } from "@sparcs-clubs/web/utils/Date/formatDate";

export const formatActivityDuration = (
  duration: { startMonth: Date; endMonth: Date | undefined }[],
) =>
  duration
    .map(({ startMonth, endMonth }) => {
      const start = formatMonth(startMonth);
      const end = endMonth ? formatMonth(endMonth) : "";

      return `${start} ~ ${end}`;
    })
    .join(", ");
