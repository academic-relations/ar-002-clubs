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
import CalendarWeekdays from "./_atomic/CalendarWeekdays";

interface EventPeriod {
  start: Date;
  end: Date;
}

interface CalendarProps extends CalendarSizeProps {
  existDates: Date[];
  eventPeriods: EventPeriod[];
  selectedDates: Date[];
  onDateClick?: (date: Date) => void;
}

const CalendarWrapper = styled.div<CalendarSizeProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
`;

const WeekWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 100%;
`;

const Calendar: React.FC<CalendarProps> = ({
  size = "md",
  existDates,
  eventPeriods,
  selectedDates,
  onDateClick = () => {},
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const weeks = eachWeekOfInterval(
    {
      start: startOfMonth(currentDate),
      end: endOfMonth(currentDate),
    },
    { weekStartsOn: 0 },
  );

  const handleDateClick = (date: Date) => {
    if (date.getMonth() !== currentDate.getMonth()) {
      setCurrentDate(date);
    }
    onDateClick?.(date);
  };

  const getWeekData = (startDate: Date): CalendarDateProps[] =>
    Array.from({ length: 7 }).map((_, index) => {
      const day = addDays(startDate, index);
      const isCurrentMonth = isSameMonth(day, currentDate);
      const exist = existDates.some(existDate => isSameDay(existDate, day));
      let type: CalendarDateProps["type"] = isCurrentMonth
        ? "Default"
        : "Past/Future";

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
        date: day,
        exist,
        type,
      };
    });

  return (
    <CalendarWrapper size={size}>
      <MonthNavigator currentDate={currentDate} onChange={setCurrentDate} />
      <CalendarWeekdays size={size} />
      <WeekWrapper>
        {weeks.map((weekStart: Date) => (
          <CalendarWeek
            week={getWeekData(weekStart)}
            size={size}
            key={weekStart.toISOString()}
            onDateClick={handleDateClick}
          />
        ))}
      </WeekWrapper>
    </CalendarWrapper>
  );
};

export default Calendar;
