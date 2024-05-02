import React from "react";
import styled from "styled-components";
import { getHours, getMinutes, setHours, setMinutes } from "date-fns";

interface TimeSlotListProps {
  value: Date;
  onDatesChange: (date: Date) => void;
}

const TimeSlotListInner = styled.div`
  width: 300px;
  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 0;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 12px;
`;

const TimeSlotSelection = styled.button<{ isSelected: boolean }>`
  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 12px;

  /* primary */
  background: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.PRIMARY : theme.colors.WHITE};
  /* mint800 */
  border: 1px solid
    ${({ theme, isSelected }) =>
      isSelected ? theme.colors.MINT[800] : theme.colors.GRAY[200]};
  border-radius: 4px;

  /* Inside auto layout */
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`;

const TimeSlotList: React.FC<TimeSlotListProps> = ({
  value,
  onDatesChange,
}) => (
  <TimeSlotListInner>
    <TimeSlotSelection
      isSelected={getHours(value) === 21 && getMinutes(value) === 0}
      onClick={() => onDatesChange(setHours(setMinutes(value, 0), 21))}
    >
      21:00
    </TimeSlotSelection>
    <TimeSlotSelection
      isSelected={getHours(value) === 21 && getMinutes(value) === 30}
      onClick={() => onDatesChange(setHours(setMinutes(value, 30), 21))}
    >
      21:30
    </TimeSlotSelection>
    <TimeSlotSelection
      isSelected={getHours(value) === 22 && getMinutes(value) === 0}
      onClick={() => onDatesChange(setHours(setMinutes(value, 0), 22))}
    >
      22:00
    </TimeSlotSelection>
  </TimeSlotListInner>
);

export default TimeSlotList;
