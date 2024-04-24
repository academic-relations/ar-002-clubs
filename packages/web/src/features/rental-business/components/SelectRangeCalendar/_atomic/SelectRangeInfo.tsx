import React from "react";
import styled from "styled-components";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

interface SelectRangeInfoProps {
  isRental: boolean;
  date?: Date;
}

const LabelWrapper = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 16px;
  line-height: 20px;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  gap: 20px;
`;

const DateWrapper = styled.div`
  width: 150px;
  text-align: center;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};
`;
const TitleWrapper = styled.div`
  width: 60px;
  text-align: center;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.MEDIUM};
`;

const SelectRangeInfo: React.FC<SelectRangeInfoProps> = ({
  isRental,
  date = undefined,
}) => (
  <div>
    <LabelWrapper>
      <TitleWrapper>{isRental ? "대여 일자" : "반납 일자"}</TitleWrapper>
      <DateWrapper>
        {date ? format(date, "yyyy년 M월 d일 (EEE)", { locale: ko }) : "미선택"}
      </DateWrapper>
    </LabelWrapper>
  </div>
);

export default SelectRangeInfo;
