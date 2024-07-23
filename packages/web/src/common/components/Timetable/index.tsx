import React, { useCallback, useEffect, useState } from "react";

import { addMinutes } from "date-fns";

import styled from "styled-components";

import TimetableDateList from "./_atomic/TimetableDateList";
import TimetableTable from "./_atomic/TimetableTable";
import TimetableTimeList from "./_atomic/TimetableTimeList";
import WeekNavigator from "./_atomic/WeekNavigator";

import type { TimetableCellType } from "./_atomic/TimetableCell";

interface TimetableProps {
  data: boolean[];
  setDateTimeRange: React.Dispatch<
    React.SetStateAction<[Date, Date] | undefined>
  >;
  availableHoursPerDay: number;
  startDate: Date;
  setStartDate: React.Dispatch<React.SetStateAction<Date>>;
}

const TimetableInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const TimetableGridInner = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
`;

const Timetable: React.FC<TimetableProps> = ({
  data,
  setDateTimeRange,
  availableHoursPerDay,
  startDate,
  setStartDate,
}) => {
  const [indexRange, setIndexRange] = useState<number[]>([]);
  const convertDataToTimetableCell = useCallback((): TimetableCellType[] => {
    const currentDateTime = new Date();
    return data.map((isReserved, index) => {
      const time = addMinutes(startDate, index * 30);
      if (time < currentDateTime) {
        if (isReserved) {
          return "past";
        }
        return "disabled";
      }
      if (isReserved) {
        return "disabled";
      }
      return "default";
    });
  }, [data, startDate]);

  useEffect(() => {
    if (indexRange.length === 2) {
      setDateTimeRange([
        addMinutes(startDate, indexRange[0] * 30),
        addMinutes(startDate, (indexRange[1] + 1) * 30),
      ]);
    } else {
      setDateTimeRange(undefined);
    }
  }, [indexRange, startDate, setDateTimeRange]);

  return (
    <TimetableInner>
      <WeekNavigator initialDate={startDate} onChange={setStartDate} />
      <TimetableDateList startDate={startDate} paddingLeft="56px" />
      <TimetableGridInner>
        <TimetableTimeList />
        <TimetableTable
          setIndexRange={setIndexRange}
          data={convertDataToTimetableCell()}
          update={startDate.toString()}
          availableHoursPerDay={availableHoursPerDay}
        />
      </TimetableGridInner>
    </TimetableInner>
  );
};

export default Timetable;
