import React from "react";

import styled from "styled-components";

import TextButton from "@sparcs-clubs/web/common/components/TextButton";

import SelectRangeInfo from "./SelectRangeInfo";

interface SelectRangeProps {
  rentalDate?: Date;
  returnDate?: Date;
  setRentalDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  setReturnDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  openPeriodModal: (state: "change" | "reset") => void;
  isRentalListEmpty: boolean;
}

const RangeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;
  gap: 12px;
  padding: 16px;
`;

const SelectRange: React.FC<SelectRangeProps> = ({
  rentalDate = undefined,
  returnDate = undefined,
  setRentalDate,
  setReturnDate,
  openPeriodModal,
  isRentalListEmpty,
}) => {
  const isButtonDisabled = !rentalDate && !returnDate;

  const handleReset = () => {
    if (isRentalListEmpty) {
      setRentalDate(undefined);
      setReturnDate(undefined);
    } else {
      openPeriodModal("reset");
    }
  };

  return (
    <RangeWrapper>
      <SelectRangeInfo isRental date={rentalDate} />
      <SelectRangeInfo isRental={false} date={returnDate} />
      <TextButton
        text="초기화"
        disabled={isButtonDisabled}
        onClick={handleReset}
      />
    </RangeWrapper>
  );
};
export default SelectRange;
