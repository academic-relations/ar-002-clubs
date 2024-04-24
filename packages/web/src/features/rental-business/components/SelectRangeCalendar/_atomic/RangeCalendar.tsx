import React from "react";
import { isAfter } from "date-fns";

import Calendar from "@sparcs-clubs/web/common/components/Calendar/Calendar";

interface RangeCalendarProps {
  rentalDate: Date | undefined;
  returnDate: Date | undefined;
  setRentalDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  setReturnDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

const RangeCalendar: React.FC<RangeCalendarProps> = ({
  rentalDate,
  returnDate,
  setRentalDate,
  setReturnDate,
}) => {
  const onDateClick = (date: Date) => {
    if (rentalDate && !returnDate && isAfter(date, rentalDate)) {
      setReturnDate(date);
    } else {
      setRentalDate(date);
      setReturnDate(undefined);
    }
  };

  return (
    <Calendar
      size="lg"
      existDates={[]}
      eventPeriods={
        rentalDate && returnDate ? [{ start: rentalDate, end: returnDate }] : []
      }
      selectedDates={rentalDate && !returnDate ? [rentalDate] : []}
      onDateClick={onDateClick}
    />
  );
};

export default RangeCalendar;
