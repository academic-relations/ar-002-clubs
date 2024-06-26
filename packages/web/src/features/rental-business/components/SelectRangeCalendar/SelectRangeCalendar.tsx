import React, { useEffect } from "react";

import styled from "styled-components";

import RangeCalendar from "./_atomic/RangeCalendar";
import SelectRange from "./_atomic/SelectRange";

interface SelectRangeCalendarProps {
  rentalDate: Date | undefined;
  returnDate: Date | undefined;
  setRentalDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  setReturnDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  workDates?: Date[];
  setShowPeriodModal: React.Dispatch<
    React.SetStateAction<"none" | "reset" | "change">
  >;
  pendingDate: Date | undefined;
  setPendingDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  isRentalListEmpty: boolean;
}

const SelectRangeCalendarWrapper = styled.div`
  display: inline-flex;
  width: 100%;
  gap: 20px;
  align-items: flex-end;
  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.lg}) {
    flex-direction: column;
  }
`;

const SelectRangeCalendar: React.FC<SelectRangeCalendarProps> = ({
  rentalDate,
  returnDate,
  setRentalDate,
  setReturnDate,
  workDates = [],
  setShowPeriodModal,
  pendingDate,
  setPendingDate,
  isRentalListEmpty,
}) => {
  useEffect(() => {
    setRentalDate(rentalDate);
    setReturnDate(returnDate);
    setPendingDate(pendingDate);
  }, [
    rentalDate,
    returnDate,
    pendingDate,
    setRentalDate,
    setReturnDate,
    setPendingDate,
  ]);

  return (
    <SelectRangeCalendarWrapper>
      <RangeCalendar
        rentalDate={rentalDate}
        returnDate={returnDate}
        setRentalDate={setRentalDate}
        setReturnDate={setReturnDate}
        workDates={workDates}
        setShowPeriodModal={setShowPeriodModal}
        setPendingDate={setPendingDate}
        isRentalListEmpty={isRentalListEmpty}
      />
      <SelectRange
        rentalDate={rentalDate}
        returnDate={returnDate}
        setRentalDate={setRentalDate}
        setReturnDate={setReturnDate}
        setShowPeriodModal={setShowPeriodModal}
        isRentalListEmpty={isRentalListEmpty}
      />
    </SelectRangeCalendarWrapper>
  );
};

export default SelectRangeCalendar;
