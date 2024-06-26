import React from "react";

import { isSameDay, setHours } from "date-fns";

import Calendar from "@sparcs-clubs/web/common/components/Calendar/Calendar";
import { executiveWorkingHourStart } from "@sparcs-clubs/web/constants/printingBusiness";

interface SingleDateSelectionCalendarProps {
  calendarSize: "sm" | "md" | "lg";
  executiveWorkDates: Date[];
  value: Date;
  onDatesChange: (date: Date) => void;
}

const SingleDateSelectionCalendar: React.FC<
  SingleDateSelectionCalendarProps
> = ({ calendarSize, executiveWorkDates, value, onDatesChange }) => {
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
