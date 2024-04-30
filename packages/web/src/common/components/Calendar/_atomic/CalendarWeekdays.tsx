import React from "react";
import styled, { css } from "styled-components";
import { CalendarDateProps } from "./CalendarDate";

export interface CalendarSizeProps {
  size: CalendarDateProps["size"];
}

const DayWrapper = styled.div<{
  size?: CalendarDateProps["size"];
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  font-size: 16px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.MEDIUM};
  line-height: 20px;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  color: ${({ theme }) => theme.colors.GRAY[600]};
  width: 100%;
  ${({ size }) => {
    switch (size) {
      case "sm":
        return css`
          height: 32px;
        `;
      case "md":
        return css`
          height: 40px;
        `;
      case "lg":
      default:
        return css`
          height: 48px;
        `;
    }
  }}
`;

const WeekWrapper = styled.div<CalendarSizeProps>`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
`;

const CalendarWeekdays: React.FC<CalendarSizeProps> = ({ size }) => (
  <WeekWrapper size={size}>
    <DayWrapper size={size}>일</DayWrapper>
    <DayWrapper size={size}>월</DayWrapper>
    <DayWrapper size={size}>화</DayWrapper>
    <DayWrapper size={size}>수</DayWrapper>
    <DayWrapper size={size}>목</DayWrapper>
    <DayWrapper size={size}>금</DayWrapper>
    <DayWrapper size={size}>토</DayWrapper>
  </WeekWrapper>
);

export default CalendarWeekdays;
