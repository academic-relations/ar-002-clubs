import React, { useEffect, useState } from "react";

import { isAfter, isSameDay } from "date-fns";

import Calendar from "@sparcs-clubs/web/common/components/Calendar/Calendar";
import responsive from "@sparcs-clubs/web/styles/themes/responsive";

interface RangeCalendarProps {
  rentalDate: Date | undefined;
  returnDate: Date | undefined;
  setRentalDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  setReturnDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  workDates: Date[];
  openPeriodModal: (state: "change" | "reset") => void;
  setPendingDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  isRentalListEmpty: boolean;
}

const RangeCalendar: React.FC<RangeCalendarProps> = ({
  rentalDate,
  returnDate,
  setRentalDate,
  setReturnDate,
  workDates,
  openPeriodModal,
  setPendingDate,
  isRentalListEmpty,
}) => {
  const [calendarSize, setCalendarSize] = useState<"sm" | "md" | "lg">("lg");

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      const parsePx = (value: string) => parseInt(value.replace("px", ""));
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
    if (workDates.some(selectedDate => isSameDay(selectedDate, date))) {
      if (rentalDate && !returnDate && isAfter(date, rentalDate)) {
        setReturnDate(date);
      } else if (!rentalDate) {
        setRentalDate(date);
      } else if (isRentalListEmpty) {
        setReturnDate(undefined);
        setRentalDate(date);
      } else {
        setPendingDate(date);
        openPeriodModal("change");
      }
    }
  };

  return (
    <Calendar
      size={calendarSize}
      existDates={workDates}
      eventPeriods={
        rentalDate && returnDate ? [{ start: rentalDate, end: returnDate }] : []
      }
      selectedDates={rentalDate && !returnDate ? [rentalDate] : []}
      onDateClick={onDateClick}
    />
  );
};

export default RangeCalendar;
