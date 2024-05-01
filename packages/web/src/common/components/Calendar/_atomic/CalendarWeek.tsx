import React from "react";
import styled, { css } from "styled-components";
import CalendarDate, { CalendarDateProps } from "./CalendarDate";

interface CalendarWeekProps {
  week: {
    date: Date;
    exist: boolean;
    type?: CalendarDateProps["type"];
  }[];
  size?: CalendarDateProps["size"];
  onDateClick: (date: Date) => void;
}

export interface CalendarSizeProps {
  size: CalendarDateProps["size"];
}

const WeekWrapper = styled.div<CalendarSizeProps>`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  align-self: stretch;
  width: 100%;
  flex: 1;
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

const CalendarWeek: React.FC<CalendarWeekProps> = ({
  week,
  size = "lg",
  onDateClick,
}) => (
  <WeekWrapper size={size}>
    {week.map(day => (
      <CalendarDate
        key={day.date.toISOString()}
        date={day.date}
        exist={day.exist}
        type={day.type}
        size={size}
        onDateClick={onDateClick}
      />
    ))}
  </WeekWrapper>
);

export default CalendarWeek;
