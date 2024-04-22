import React, { useState } from "react";
import {
  startOfMonth,
  endOfMonth,
  eachWeekOfInterval,
  addDays,
  isSameMonth,
  isSameDay,
} from "date-fns";
import styled from "styled-components";
import MonthNavigator from "./_atomic/MonthNavigator";
import CalendarWeek, { CalendarSizeProps } from "./_atomic/CalendarWeek";
import { CalendarDateProps } from "./_atomic/CalendarDate";

interface EventPeriod {
  start: Date;
  end: Date;
}

interface CalendarProps extends CalendarSizeProps {
  existDates: Date[];
  eventPeriods: EventPeriod[];
  selectedDates: Date[];
}

const CalendarWrapper = styled.div<CalendarSizeProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const WeekWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const Calendar: React.FC<CalendarProps> = ({
  size = "md",
  existDates,
  eventPeriods,
  selectedDates,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const weeks = eachWeekOfInterval(
    {
      start: startOfMonth(currentDate),
      end: endOfMonth(currentDate),
    },
    { weekStartsOn: 0 },
  );

  const getWeekData = (startDate: Date): CalendarDateProps[] =>
    Array.from({ length: 7 }).map((_, index) => {
      const day = addDays(startDate, index);
      const isCurrentMonth = isSameMonth(day, currentDate);
      const exist = existDates.some(existDate => isSameDay(existDate, day));

      let type:
        | "Default"
        | "Past/Future"
        | "Start"
        | "Pass"
        | "End"
        | "Selected" = isCurrentMonth ? "Default" : "Past/Future";

      if (!isCurrentMonth) {
        type = "Past/Future";
      } else if (
        selectedDates.some(selectedDate => isSameDay(selectedDate, day))
      ) {
        type = "Selected";
      } else {
        eventPeriods.forEach(period => {
          if (isSameDay(day, period.start)) {
            type = "Start";
          } else if (isSameDay(day, period.end)) {
            type = "End";
          } else if (day >= period.start && day <= period.end) {
            type = "Pass";
          }
        });
      }

      return {
        date: day.getDate(),
        exist,
        type,
      };
    });

  const handleMonthChange = (newDate: Date) => {
    setCurrentDate(newDate);
  };

  return (
    <CalendarWrapper size={size}>
      <MonthNavigator initialDate={currentDate} onChange={handleMonthChange} />
      <WeekWrapper>
        {weeks.map((weekStart: Date) => (
          <CalendarWeek
            week={getWeekData(weekStart)}
            size={size}
            key={weekStart.toISOString()}
          />
        ))}
      </WeekWrapper>
    </CalendarWrapper>
  );
};

export default Calendar;
