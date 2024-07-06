import React from "react";

import isPropValid from "@emotion/is-prop-valid";
import { getHours, getMinutes, setHours, setMinutes } from "date-fns";
import styled from "styled-components";

import { executiveWorkingHourStart } from "@sparcs-clubs/web/constants/printingBusiness";

interface TimeSlotListProps {
  calendarSize: "sm" | "md" | "lg";
  value: Date;
  onDatesChange: (date: Date) => void;
}

const TimeSlotListInner = styled.div.withConfig({
  shouldForwardProp: prop => isPropValid(prop),
})<{ calendarSize: "sm" | "md" | "lg" }>`
  width: ${({ calendarSize }) => (calendarSize === "lg" ? "300px" : "100%")};
  flex: none;
  order: 1;
  align-self: stretch;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 12px;
`;

const TimeSlotSelection = styled.button.withConfig({
  shouldForwardProp: prop => isPropValid(prop),
})<{ isSelected: boolean }>`
  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px 12px;

  /* primary */
  background: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.PRIMARY : theme.colors.WHITE};
  color: ${({ theme, isSelected }) =>
    isSelected ? theme.colors.WHITE : theme.colors.BLACK};
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
  calendarSize,
  value,
  onDatesChange,
}) => (
  <TimeSlotListInner calendarSize={calendarSize}>
    <TimeSlotSelection
      isSelected={
        getHours(value) === executiveWorkingHourStart && getMinutes(value) === 0
      }
      onClick={() =>
        onDatesChange(setHours(setMinutes(value, 0), executiveWorkingHourStart))
      }
    >
      21:00
    </TimeSlotSelection>
    <TimeSlotSelection
      isSelected={
        getHours(value) === executiveWorkingHourStart &&
        getMinutes(value) === 30
      }
      onClick={() =>
        onDatesChange(
          setHours(setMinutes(value, 30), executiveWorkingHourStart),
        )
      }
    >
      21:30
    </TimeSlotSelection>
    <TimeSlotSelection
      isSelected={
        getHours(value) === executiveWorkingHourStart + 1 &&
        getMinutes(value) === 0
      }
      onClick={() =>
        onDatesChange(
          setHours(setMinutes(value, 0), executiveWorkingHourStart + 1),
        )
      }
    >
      22:00
    </TimeSlotSelection>
  </TimeSlotListInner>
);

export default TimeSlotList;
