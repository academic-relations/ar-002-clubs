import React from "react";
import styled from "styled-components";
import CalendarDate, { CalendarDateProps } from "./CalendarDate";

interface CalendarWeekProps {
  week: {
    date: number;
    exist: boolean;
    type?: CalendarDateProps["type"];
  }[];
  size?: CalendarDateProps["size"];
}

export interface CalendarSizeProps {
  size: CalendarDateProps["size"];
}

const WeekWrapper = styled.div<CalendarSizeProps>`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: ${({ size }) => {
    switch (size) {
      case "sm":
        return "296px";
      case "md":
        return "352px";
      case "lg":
      default:
        return "408px";
    }
  }};
`;

const CalendarWeek: React.FC<CalendarWeekProps> = ({ week, size = "lg" }) => (
  <WeekWrapper size={size}>
    {week.map(day => (
      <CalendarDate
        date={day.date}
        exist={day.exist}
        type={day.type}
        size={size}
      />
    ))}
  </WeekWrapper>
);

export default CalendarWeek;
