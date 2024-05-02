import React from "react";
import styled from "styled-components";

import SingleDateSelectionCalendar from "./_atomic/SingleDateSelectionCalendar";
import TimeSlotList from "./_atomic/TimeSlotList";

interface DesiredPickUpTimeSelectionProps {
  label: string;
  executiveWorkDates: Date[];
  value: Date;
  onDateChange: (date: Date) => void;
}

const DesiredPickUpTimeSelectionInner = styled.div`
  width: 1056px;
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

const CalendarAndTimeSlot = styled.div`
  width: 100%;

  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 20px;
`;

const DesiredPickUpTimeSelection: React.FC<DesiredPickUpTimeSelectionProps> = ({
  label,
  executiveWorkDates,
  value,
  onDateChange,
}) => (
  <DesiredPickUpTimeSelectionInner>
    <StyledLabel>{label}</StyledLabel>
    <CalendarAndTimeSlot>
      <SingleDateSelectionCalendar
        executiveWorkDates={executiveWorkDates}
        value={value}
        onDatesChange={onDateChange}
      />
      <TimeSlotList value={value} onDatesChange={onDateChange} />
    </CalendarAndTimeSlot>
  </DesiredPickUpTimeSelectionInner>
);

export default DesiredPickUpTimeSelection;
