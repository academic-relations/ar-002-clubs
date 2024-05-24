import Card from "@sparcs-clubs/web/common/components/Card";
import Select from "@sparcs-clubs/web/common/components/Forms/Select";
import Info from "@sparcs-clubs/web/common/components/Info";
import Timetable from "@sparcs-clubs/web/common/components/Timetable";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import { useGetCommonSpaces } from "@sparcs-clubs/web/features/common-space/service/getCommonSpaces";
import apiCms001 from "@sparcs-clubs/interface/api/common-space/endpoint/apiCms001";
import { z } from "zod";
import { useGetCommonSpaceUsageOrders } from "@sparcs-clubs/web/features/common-space/service/getCommonSpaceUsageOrders";
import apiCms002 from "@sparcs-clubs/interface/api/common-space/endpoint/apiCms002";

import {
  addWeeks,
  differenceInHours,
  differenceInMinutes,
  format,
  startOfWeek,
} from "date-fns";
import { ko } from "date-fns/locale";

import type { CommonSpaceFrameProps } from "../CommonSpaceNoticeFrame";

const StyledCardOuter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  flex: 1 0 0;
  align-self: stretch;
`;

type CommonSpaceItem = z.infer<
  (typeof apiCms001.responseBodyMap)[200]["shape"]["commonSpaces"]["element"]
>;

type UsageOrder = z.infer<
  (typeof apiCms002.responseBodyMap)[200]["shape"]["usageOrders"]["element"]
>;

const CommonSpaceInfoSecondFrame: React.FC<
  CommonSpaceFrameProps & { setNextEnabled: (enabled: boolean) => void }
> = ({ setNextEnabled, commonSpace, setCommonSpace }) => {
  const { data, isLoading, isError } = useGetCommonSpaces();
  const [date, setDate] = useState(startOfWeek(new Date(), { locale: ko }));

  const [selectedValue, setSelectedValue] = useState("");
  const [hasSelectError, setHasSelectError] = useState(false);
  const [dateTimeRange, setDateTimeRange] = useState<[Date, Date]>();
  const [selectedSpace, setSelectedSpace] = useState<CommonSpaceItem>();

  const {
    data: usageOrdersData,
    isLoading: isUsageOrdersLoading,
    isError: isUsageOrdersError,
  } = useGetCommonSpaceUsageOrders(
    {
      spaceId: selectedSpace?.id || 0,
    },
    { startDate: date, endDate: addWeeks(date, 1) },
  );

  const disabledCells = useMemo(() => {
    if (!usageOrdersData) return [];
    const cells = Array(7 * 48).fill(false);
    usageOrdersData.usageOrders.forEach((order: UsageOrder) => {
      const start = order.startTerm;
      const end = order.endTerm;
      const cellStart = date;
      const cellEnd = addWeeks(date, 1);
      if (start >= cellStart && end <= cellEnd) {
        const startFill = differenceInMinutes(start, cellStart);
        const endFill = differenceInMinutes(end, cellStart);
        for (let i = startFill; i < endFill; i += 30) {
          cells[i / 30] = true;
        }
      } else if (start < cellStart && end > cellStart) {
        const startFill = 0;
        const endFill = differenceInMinutes(end, cellStart);
        for (let i = startFill; i < endFill; i += 30) {
          cells[i / 30] = true;
        }
      } else if (start < cellEnd && end > cellEnd) {
        const startFill = differenceInMinutes(start, cellStart);
        const endFill = 7 * 48;
        for (let i = startFill; i < endFill; i += 30) {
          cells[i / 30] = true;
        }
      }
    });
    return cells;
  }, [usageOrdersData, date]);

  useEffect(() => {
    const allConditionsMet =
      Boolean(selectedValue) && !hasSelectError && !!dateTimeRange;
    setNextEnabled(allConditionsMet);
  }, [selectedValue, hasSelectError, setNextEnabled, dateTimeRange]);

  useEffect(() => {
    const space = data?.commonSpaces.find(
      item => item.id.toString() === selectedValue,
    );

    if (space)
      setCommonSpace({
        ...commonSpace,
        param: {
          spaceId: space?.id,
        },
        spaceName: space?.name,
      });

    setSelectedSpace(space);
  }, [selectedValue, setCommonSpace]);

  const diffHours =
    dateTimeRange && differenceInHours(dateTimeRange[1], dateTimeRange[0]);
  const diffMinutes =
    dateTimeRange && differenceInMinutes(dateTimeRange[1], dateTimeRange[0]);

  useEffect(() => {
    if (dateTimeRange) {
      setCommonSpace(prev => ({
        ...prev,
        body: {
          ...prev.body,
          startTerm: dateTimeRange[0],
          endTerm: dateTimeRange[1],
        },
      }));
    }
  }, [dateTimeRange, setCommonSpace]);

  return (
    <>
      <AsyncBoundary isLoading={isLoading} isError={isError}>
        <Select
          items={
            data?.commonSpaces.map(space => ({
              value: space.id.toString(),
              label: space.name,
              selectable: true,
            })) || []
          }
          selectedValue={selectedValue}
          onSelect={setSelectedValue}
          label="공용공간"
          setErrorStatus={setHasSelectError}
        />
      </AsyncBoundary>
      {selectedSpace && (
        <>
          <Info
            text={`${selectedSpace.name}는 하루에 최대 ${selectedSpace.availableHoursPerDay}시간, 일주일에 최대 ${selectedSpace.availableHoursPerWeek}시간 사용할 수 있습니다.`}
          />
          <Card outline gap={20} style={{ flexDirection: "row" }}>
            <AsyncBoundary
              isLoading={isUsageOrdersLoading}
              isError={isUsageOrdersError}
            >
              <Timetable
                data={disabledCells}
                setDateTimeRange={setDateTimeRange}
                availableHoursPerDay={selectedSpace.availableHoursPerDay}
                startDate={date}
                setStartDate={setDate}
              />
            </AsyncBoundary>

            <StyledCardOuter>
              {dateTimeRange && (
                <Card outline gap={20} style={{ marginTop: 64 }}>
                  <Typography type="p">선택 시간</Typography>
                  <Typography type="p">
                    {format(dateTimeRange[0], "M/d(E) ", { locale: ko })}
                    {format(dateTimeRange[0], "HH:mm", { locale: ko })} ~
                    {format(dateTimeRange[1], "HH:mm", { locale: ko })} (
                    {`${diffHours}시간`}
                    {diffMinutes! % 60 ? ` ${diffMinutes! % 60}분` : ""})
                  </Typography>
                </Card>
              )}
            </StyledCardOuter>
          </Card>
        </>
      )}
    </>
  );
};

export default CommonSpaceInfoSecondFrame;
