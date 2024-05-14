import React from "react";
import styled from "styled-components";
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

const WeekWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  align-self: stretch;
  width: 100%;
  flex: 1;
`;

const CalendarWeek: React.FC<CalendarWeekProps> = ({
  week,
  size = "lg",
  onDateClick,
}) => (
  <WeekWrapper>
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
