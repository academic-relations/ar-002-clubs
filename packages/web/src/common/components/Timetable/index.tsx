import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { addMinutes, startOfWeek } from "date-fns";
import { ko } from "date-fns/locale";

import type { TimetableCellType } from "./_atomic/TimetableCell";
import TimetableTable from "./_atomic/TimetableTable";
import WeekNavigator from "./_atomic/WeekNavigator";
import TimetableDateList from "./_atomic/TimetableDateList";
import TimetableTimeList from "./_atomic/TimetableTimeList";

interface TimetableProps {
  data: boolean[];
  setDateTimeRange: React.Dispatch<
    React.SetStateAction<[Date, Date] | undefined>
  >;
}

const TimetableInner = styled.div`
  display: flex;
  width: 600px;
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

const Timetable: React.FC<TimetableProps> = ({ data, setDateTimeRange }) => {
  const [indexRange, setIndexRange] = useState<number[]>([]);
  const [date, setDate] = useState(startOfWeek(new Date(), { locale: ko }));
  const convertDataToTimetableCell = useCallback((): TimetableCellType[] => {
    const currentDateTime = new Date();
    return data.map((isReserved, index) => {
      const time = addMinutes(date, index * 30);
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
  }, [data, date]);

  useEffect(() => {
    if (indexRange.length === 2) {
      setDateTimeRange([
        addMinutes(date, indexRange[0] * 30),
        addMinutes(date, (indexRange[1] + 1) * 30),
      ]);
    } else {
      setDateTimeRange(undefined);
    }
  }, [indexRange, date, setDateTimeRange]);

  return (
    <TimetableInner>
      <WeekNavigator initialDate={date} onChange={setDate} />
      <TimetableDateList startDate={date} paddingLeft="56px" />
      <TimetableGridInner>
        <TimetableTimeList />
        <TimetableTable
          setIndexRange={setIndexRange}
          data={convertDataToTimetableCell()}
          update={date.toString()}
        />
      </TimetableGridInner>
    </TimetableInner>
  );
};

export default Timetable;
