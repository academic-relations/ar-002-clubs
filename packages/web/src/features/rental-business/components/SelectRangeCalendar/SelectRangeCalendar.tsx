import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SelectRange from "./_atomic/SelectRange";
import RangeCalendar from "./_atomic/RangeCalendar";

interface SelectRangeCalendarProps {
  onDatesChange: (
    rentalDate: Date | undefined,
    returnDate: Date | undefined,
  ) => void;
}

const SelectRangeCalendarWrapper = styled.div`
  display: inline-flex;
  width: 1000px;
  /* 나중에 calendar 관련 width 확인할 때 여기도 봐야함 */
  gap: 20px;
  align-items: flex-end;
`;

const SelectRangeCalendar: React.FC<SelectRangeCalendarProps> = ({
  onDatesChange,
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
