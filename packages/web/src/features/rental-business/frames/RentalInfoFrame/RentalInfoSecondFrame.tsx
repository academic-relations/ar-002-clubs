import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "@sparcs-clubs/web/common/components/Card";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import Info from "@sparcs-clubs/web/common/components/Info";
import Radio from "@sparcs-clubs/web/common/components/Radio";
import ItemButtonList from "@sparcs-clubs/web/features/rental-business/components/ItemButtonList";
import SelectRangeCalendar from "@sparcs-clubs/web/features/rental-business/components/SelectRangeCalendar/SelectRangeCalendar";
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

const Easel: React.FC<RentalFrameProps> = () => (
  <Typography type="p">대여 개수</Typography>
);

const Vacuum: React.FC<RentalFrameProps> = ({ rental, setRental }) => (
  <>
    <Typography type="p">청소기 종류</Typography>
    <Radio
      value={rental?.vacuum || "cordless"}
      onChange={value =>
        setRental({
          ...rental,
          vacuum: value,
        })
      }
    >
      <Radio.Option value="cordless">무선 청소기</Radio.Option>
      <Radio.Option value="corded">유선 청소기</Radio.Option>
    </Radio>
  </>
);

const HandCart: React.FC<RentalFrameProps> = () => (
  <>
    <Typography type="p">롤테이너 개수</Typography>
    <Typography type="p">대형 개수</Typography>
    <Typography type="p">중형 개수</Typography>
    <Typography type="p">소형 개수</Typography>
  </>
);

const Mat: React.FC<RentalFrameProps> = () => (
  <Typography type="p">대여 개수</Typography>
);

const Tool: React.FC<RentalFrameProps> = () => (
  <>
    <Typography type="p">전동 드릴 세트 개수</Typography>
    <Typography type="p">드라이버 개수</Typography>
    <Typography type="p">슈퍼글루 개수</Typography>
    <Typography type="p">니퍼 개수</Typography>
    <Typography type="p">플라이어 개수</Typography>
    <Typography type="p">롱노즈플라이어 개수</Typography>
  </>
);

const NoneRental: React.FC<RentalFrameProps> = () => (
  <Typography type="p">대충 선택 먼저 하세요</Typography>
);

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

  return (
    <>
      <StyledCard type="outline">
        <Typography type="h3">대여 기간 선택</Typography>
        <SelectRangeCalendar onDatesChange={handleDatesChange} />
      </StyledCard>
      <ItemButtonList value={value} onChange={setValue} />
      <Info text={rentals[value].info} />
      <StyledCard type="outline">
        <StyledCardInner>
          <Typography type="h3">세부 물품 정보</Typography>
          <Rental {...props} />
        </StyledCardInner>
      </StyledCard>
    </>
  );
};

export default RentalInfoSecondFrame;
