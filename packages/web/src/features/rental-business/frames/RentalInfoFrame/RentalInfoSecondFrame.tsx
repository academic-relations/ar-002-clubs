import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "@sparcs-clubs/web/common/components/Card";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import Info from "@sparcs-clubs/web/common/components/Info";
import ItemButtonList from "@sparcs-clubs/web/features/rental-business/components/ItemButtonList";
import SelectRangeCalendar from "@sparcs-clubs/web/features/rental-business/components/SelectRangeCalendar/SelectRangeCalendar";
import { actualDate } from "@sparcs-clubs/web/utils/Date/actualDate";
import Easel from "@sparcs-clubs/web/features/rental-business//components/Rentals/Easel";
import Vacuum from "@sparcs-clubs/web/features/rental-business//components/Rentals/Vacuum";
import HandCart from "@sparcs-clubs/web/features/rental-business//components/Rentals/HandCart";
import Mat from "@sparcs-clubs/web/features/rental-business//components/Rentals/Mat";
import Tool from "@sparcs-clubs/web/features/rental-business//components/Rentals/Tool";
import { RentalFrameProps } from "../RentalNoticeFrame";

const StyledCard = styled(Card)<{ type: string }>`
  padding: 32px;
  gap: 40px;
  align-self: stretch;
`;

const StyledCardInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
`;

const NoneRental: React.FC<RentalFrameProps> = () => <>none</>;

const rentals = {
  none: {
    info: "대충 대여 기간 먼저 선택해야 한다는 안내문구 어딘가에",
    component: NoneRental,
  },
  easel: {
    info: "대충 이젤에 대한 추가 안내사항",
    component: Easel,
  },
  vacuum: {
    info: "대충 청소기에 대한 추가 안내사항",
    component: Vacuum,
  },
  handCart: {
    info: "대충 핸드카트에 대한 추가 안내사항",
    component: HandCart,
  },
  mat: {
    info: "대충 매트에 대한 추가 안내사항",
    component: Mat,
  },
  tool: {
    info: "대충 툴에 대한 추가 안내사항",
    component: Tool,
  },
};

const mockExistDates = [
  actualDate(2024, 4, 1),
  actualDate(2024, 4, 2),
  actualDate(2024, 4, 3),
  actualDate(2024, 4, 4),
  actualDate(2024, 4, 8),
  actualDate(2024, 4, 9),
  actualDate(2024, 4, 10),
  actualDate(2024, 4, 11),
  actualDate(2024, 4, 15),
  actualDate(2024, 4, 16),
  actualDate(2024, 4, 17),
  actualDate(2024, 4, 18),
  actualDate(2024, 4, 22),
  actualDate(2024, 4, 23),
  actualDate(2024, 4, 24),
  actualDate(2024, 4, 25),
  actualDate(2024, 4, 29),
  actualDate(2024, 4, 30),
  actualDate(2024, 5, 1),
  actualDate(2024, 5, 2),
  actualDate(2024, 5, 6),
  actualDate(2024, 5, 7),
  actualDate(2024, 5, 8),
  actualDate(2024, 5, 9),
  actualDate(2024, 5, 13),
  actualDate(2024, 5, 14),
  actualDate(2024, 5, 15),
  actualDate(2024, 5, 16),
  actualDate(2024, 5, 20),
  actualDate(2024, 5, 21),
  actualDate(2024, 5, 22),
  actualDate(2024, 5, 23),
  actualDate(2024, 5, 27),
  actualDate(2024, 5, 28),
  actualDate(2024, 5, 29),
  actualDate(2024, 5, 30),
];

const RentalInfoSecondFrame: React.FC<RentalFrameProps> = ({
  rental,
  setRental,
}) => {
  const [value, setValue] = useState<
    "none" | "easel" | "vacuum" | "handCart" | "mat" | "tool"
  >("none");

  const Rental = rentals[value].component;
  const props = { rental, setRental };

  const [rentalDate, setRentalDate] = useState<Date | undefined>();
  const [returnDate, setReturnDate] = useState<Date | undefined>();

  const handleDatesChange = (
    rentalDateFromCal: Date | undefined,
    returnDateFromCal: Date | undefined,
  ) => {
    setRentalDate(rentalDateFromCal);
    setReturnDate(returnDateFromCal);
    setValue(!rentalDateFromCal || !returnDateFromCal ? "none" : value);
  };

  useEffect(() => {
    if (!rentalDate || !returnDate) {
      setValue("none");
    }

    setRental({
      ...rental,
      date: { start: rentalDate, end: returnDate },
    });
  }, [rentalDate, returnDate, setRental]);
  // 대여 기간 초기화할 때 modal 띄우는거 추가해야 함

  const itemOnChange = (
    newValue: "easel" | "vacuum" | "handCart" | "mat" | "tool",
  ) => {
    if (rentalDate && returnDate) {
      setValue(newValue);
    }
  };

  return (
    <>
      <StyledCard type="outline">
        <Typography type="h3">대여 기간 선택</Typography>
        <SelectRangeCalendar
          onDatesChange={handleDatesChange}
          workDates={mockExistDates}
        />
      </StyledCard>
      <ItemButtonList value={value} onChange={itemOnChange} />
      <Info text={rentals[value].info} />
      {value !== "none" && (
        <StyledCard type="outline">
          <StyledCardInner>
            <Typography type="h3">세부 물품 정보</Typography>
            <Rental {...props} />
          </StyledCardInner>
        </StyledCard>
      )}
      <StyledCard type="outline">
        <StyledCardInner>
          <Typography type="h3">대여 물품 목록</Typography>
        </StyledCardInner>
      </StyledCard>
    </>
  );
};

export default RentalInfoSecondFrame;
