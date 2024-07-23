import React from "react";

import styled from "styled-components";

import { formatDate } from "@sparcs-clubs/web/utils/Date/formateDate";

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
  gap: 12px;
  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.xs}) {
    gap: 8px;
  }
`;

const DateWrapper = styled.div`
  width: 160px;
  text-align: center;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};
`;
const TitleWrapper = styled.div`
  width: 60px;
  text-align: center;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.MEDIUM};
  &::before {
    content: attr(data-full-label);
    display: block;
  }
  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.xs}) {
    &::before {
      content: attr(data-short-label);
    }
    width: 28px;
  }
`;

const SelectRangeInfo: React.FC<SelectRangeInfoProps> = ({
  isRental,
  date = undefined,
}) => (
  <div>
    <LabelWrapper>
      <TitleWrapper
        data-full-label={isRental ? "대여 일자" : "반납 일자"}
        data-short-label={isRental ? "대여" : "반납"}
      />
      <DateWrapper>{date ? formatDate(date) : "미선택"}</DateWrapper>
    </LabelWrapper>
  </div>
);

export default SelectRangeInfo;
