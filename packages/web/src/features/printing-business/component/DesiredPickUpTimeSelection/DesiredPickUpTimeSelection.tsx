import React, { useEffect, useState } from "react";

import isPropValid from "@emotion/is-prop-valid";
import styled from "styled-components";

import responsive from "@sparcs-clubs/web/styles/themes/responsive";

import SingleDateSelectionCalendar from "./_atomic/SingleDateSelectionCalendar";
import TimeSlotList from "./_atomic/TimeSlotList";

interface DesiredPickUpTimeSelectionProps {
  label: string;
  executiveWorkDates: Date[];
  value: Date;
  onDateChange: (date: Date) => void;
}

const DesiredPickUpTimeSelectionInner = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 16px;
`;

const StyledLabel = styled.label`
  display: block;
  margin: 0 2px;
  gap: 10px;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 16px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.MEDIUM};
  color: ${({ theme }) => theme.colors.BLACK};
  line-height: 20px;
  text-align: left;
`;

const CalendarAndTimeSlot = styled.div.withConfig({
  shouldForwardProp: prop => isPropValid(prop),
})<{ calendarSize: "sm" | "md" | "lg" }>`
  width: 100%;

  /* Auto layout */
  display: flex;
  flex-direction: row;
  ${({ calendarSize }) => (calendarSize !== "lg" ? "flex-wrap: wrap;" : "")}
  align-items: center;
  padding: 0px;
  gap: 20px;
`;

const DesiredPickUpTimeSelection: React.FC<DesiredPickUpTimeSelectionProps> = ({
  label,
  executiveWorkDates,
  value,
  onDateChange,
}) => {
  const [calendarSize, setCalendarSize] = useState<"sm" | "md" | "lg">("lg");

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      if (width < parseInt(responsive.BREAKPOINT.sm)) {
        setCalendarSize("sm");
      } else if (
        width > parseInt(responsive.BREAKPOINT.sm) &&
        width <= parseInt(responsive.BREAKPOINT.lg)
      ) {
        setCalendarSize("md");
      } else if (width > parseInt(responsive.BREAKPOINT.lg)) {
        setCalendarSize("lg");
      }
    };

    window.addEventListener("resize", updateSize);
    updateSize();

    return () => window.removeEventListener("resize", updateSize);
  }, [window, setCalendarSize]);
  return (
    <DesiredPickUpTimeSelectionInner>
      <StyledLabel>{label}</StyledLabel>
      <CalendarAndTimeSlot calendarSize={calendarSize}>
        <SingleDateSelectionCalendar
          calendarSize={calendarSize}
          executiveWorkDates={executiveWorkDates}
          value={value}
          onDatesChange={onDateChange}
        />
        <TimeSlotList
          value={value}
          onDatesChange={onDateChange}
          calendarSize={calendarSize}
        />
      </CalendarAndTimeSlot>
    </DesiredPickUpTimeSelectionInner>
  );
};

export default DesiredPickUpTimeSelection;
