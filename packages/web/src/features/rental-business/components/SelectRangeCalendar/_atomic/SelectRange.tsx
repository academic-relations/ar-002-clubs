import React from "react";
import styled from "styled-components";
import SelectRangeInfo from "./SelectRangeInfo";

interface SelectRangeProps {
  rentalDate?: Date;
  returnDate?: Date;
}

const RangeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
`;

const SelectRange: React.FC<SelectRangeProps> = ({
  rentalDate = undefined,
  returnDate = undefined,
}) => (
  <RangeWrapper>
    <SelectRangeInfo isRental date={rentalDate} />
    <SelectRangeInfo isRental={false} date={returnDate} />
  </RangeWrapper>
);

export default SelectRange;
