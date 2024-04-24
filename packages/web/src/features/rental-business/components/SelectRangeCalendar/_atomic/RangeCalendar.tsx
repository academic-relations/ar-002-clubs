import React from "react";
import styled from "styled-components";
import { isBefore, isAfter } from "date-fns";

import Calendar from "@sparcs-clubs/web/common/components/Calendar/Calendar";

interface RangeCalendarProps {
  rentalDate: Date | undefined;
  returnDate: Date | undefined;
  setRentalDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  setReturnDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
}

const RangeCalendarWrapper = styled.div`
  /* Your styled components for the wrapper */
`;

const RangeCalendar: React.FC<RangeCalendarProps> = ({
  rentalDate,
  returnDate,
  setRentalDate,
  setReturnDate,
}) => {
  const onDateClick = (date: Date) => {
    if (!rentalDate || (returnDate && isBefore(date, returnDate))) {
      setRentalDate(date);
    } else if (rentalDate && !returnDate && isAfter(date, rentalDate)) {
      setReturnDate(date);
    } else {
      setRentalDate(date);
      setReturnDate(undefined);
    }
  };

  return (
    <RangeCalendarWrapper>
      <Calendar
        size="lg"
        existDates={[]}
        eventPeriods={
          rentalDate && returnDate
            ? [{ start: rentalDate, end: returnDate }]
            : []
        }
        selectedDates={[]}
        onDateClick={onDateClick}
      />
    </RangeCalendarWrapper>
  );
};

export default RangeCalendar;
