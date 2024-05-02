import React from "react";
import styled from "styled-components";
import { setHours } from "date-fns";

import Calendar from "@sparcs-clubs/web/common/components/Calendar/Calendar";

interface SingleDateSelectionCalendarProps {
  executiveWorkDates: Date[];
  value: Date;
  onDatesChange: (date: Date) => void;
}

const SingleDateSelectionCalendarInner = styled.div`
  flex: none;
  order: 1;
  align-self: stretch;
  flex-grow: 1;
`;

const SingleDateSelectionCalendar: React.FC<
  SingleDateSelectionCalendarProps
> = ({ executiveWorkDates, value, onDatesChange }) => (
  <SingleDateSelectionCalendarInner>
    <Calendar
      size="lg"
      existDates={executiveWorkDates}
      eventPeriods={[]}
      selectedDates={[value]}
      onDateClick={date => {
        onDatesChange(setHours(date, 21));
      }}
    />
  </SingleDateSelectionCalendarInner>
);

export default SingleDateSelectionCalendar;
