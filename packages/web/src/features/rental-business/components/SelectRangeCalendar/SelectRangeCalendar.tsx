import React, { useState } from "react";
import styled from "styled-components";
import SelectRange from "./_atomic/SelectRange";
import RangeCalendar from "./_atomic/RangeCalendar";

const SelectRangeCalendarWrapper = styled.div`
  display: inline-flex;
  width: 1000px;
  gap: 20px;
  align-items: flex-end;
`;

const SelectRangeCalendar: React.FC = () => {
  const [rentalDate, setRentalDate] = useState<Date | undefined>();
  const [returnDate, setReturnDate] = useState<Date | undefined>();
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
