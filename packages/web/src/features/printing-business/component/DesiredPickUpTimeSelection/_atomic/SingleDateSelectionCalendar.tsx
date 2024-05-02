import React, { useEffect, useState } from "react";
import { isSameDay, setHours } from "date-fns";

import responsive from "@sparcs-clubs/web/styles/themes/responsive";
import Calendar from "@sparcs-clubs/web/common/components/Calendar/Calendar";

import { executiveWorkingHourStart } from "@sparcs-clubs/web/constants/printingBusiness";

interface SingleDateSelectionCalendarProps {
  executiveWorkDates: Date[];
  value: Date;
  onDatesChange: (date: Date) => void;
}

const SingleDateSelectionCalendar: React.FC<
  SingleDateSelectionCalendarProps
> = ({ executiveWorkDates, value, onDatesChange }) => {
  const [calendarSize, setCalendarSize] = useState<"sm" | "md" | "lg">("lg");

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      const parsePx = (val: string) => parseInt(val.replace("px", ""));
      if (width < parsePx(responsive.BREAKPOINT.sm)) {
        setCalendarSize("sm");
      } else if (
        width > parsePx(responsive.BREAKPOINT.sm) &&
        width <= parsePx(responsive.BREAKPOINT.lg)
      ) {
        setCalendarSize("md");
      } else if (width > parsePx(responsive.BREAKPOINT.lg)) {
        setCalendarSize("lg");
      }
    };

    window.addEventListener("resize", updateSize);
    updateSize();

    return () => window.removeEventListener("resize", updateSize);
  }, [window, setCalendarSize]);

  const onDateClick = (date: Date) => {
    if (
      executiveWorkDates.some(selectedDate => isSameDay(selectedDate, date))
    ) {
      onDatesChange(date);
    }
  };
  return (
    <Calendar
      size={calendarSize}
      existDates={executiveWorkDates}
      eventPeriods={[]}
      selectedDates={[value]}
      onDateClick={date => {
        onDateClick(setHours(date, executiveWorkingHourStart));
      }}
    />
  );
};
export default SingleDateSelectionCalendar;
