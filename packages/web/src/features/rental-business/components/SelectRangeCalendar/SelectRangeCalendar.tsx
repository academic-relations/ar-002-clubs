import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SelectRange from "./_atomic/SelectRange";
import RangeCalendar from "./_atomic/RangeCalendar";

interface SelectRangeCalendarProps {
  onDatesChange: (
    rentalDate: Date | undefined,
    returnDate: Date | undefined,
  ) => void;
  workDates?: Date[];
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
  onDatesChange,
  workDates = [],
}) => {
  const [rentalDate, setRentalDate] = useState<Date | undefined>();
  const [returnDate, setReturnDate] = useState<Date | undefined>();

  useEffect(() => {
    onDatesChange(rentalDate, returnDate);
  }, [rentalDate, returnDate, onDatesChange]);

  return (
    <SelectRangeCalendarWrapper>
      <RangeCalendar
        rentalDate={rentalDate}
        returnDate={returnDate}
        setRentalDate={setRentalDate}
        setReturnDate={setReturnDate}
        workDates={workDates}
      />
      <SelectRange
        rentalDate={rentalDate}
        returnDate={returnDate}
        setRentalDate={setRentalDate}
        setReturnDate={setReturnDate}
      />
    </SelectRangeCalendarWrapper>
  );
};

export default SelectRangeCalendar;
