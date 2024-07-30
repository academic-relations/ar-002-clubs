import React, { useCallback, useEffect, useMemo, useState } from "react";

import apiCms002 from "@sparcs-clubs/interface/api/common-space/endpoint/apiCms002";

import {
  addWeeks,
  differenceInHours,
  differenceInMinutes,
  startOfWeek,
} from "date-fns";

import styled from "styled-components";

import { z } from "zod";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";

import Card from "@sparcs-clubs/web/common/components/Card";
import Info from "@sparcs-clubs/web/common/components/Info";
import Modal from "@sparcs-clubs/web/common/components/Modal";
import CancellableModalContent from "@sparcs-clubs/web/common/components/Modal/CancellableModalContent";
import Select from "@sparcs-clubs/web/common/components/Select";
import Timetable from "@sparcs-clubs/web/common/components/Timetable";
import Typography from "@sparcs-clubs/web/common/components/Typography";

import useGetCommonSpaces from "@sparcs-clubs/web/features/common-space/service/getCommonSpaces";
import useGetCommonSpaceUsageOrders from "@sparcs-clubs/web/features/common-space/service/getCommonSpaceUsageOrders";

import { CommonSpaceInfoProps } from "@sparcs-clubs/web/features/common-space/types/commonSpace";
import {
  formatSimpleSlashDate,
  formatTime,
} from "@sparcs-clubs/web/utils/Date/formateDate";

const StyledCardOuter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  flex: 1 0 0;
  align-self: stretch;
`;

const StyledCardLayout = styled(Card)`
  display: flex;

  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.lg}) {
    flex-wrap: wrap;
  }
`;

type UsageOrder = z.infer<
  (typeof apiCms002.responseBodyMap)[200]["shape"]["usageOrders"]["element"]
>;

const CommonSpaceInfoSecondFrame: React.FC<
  CommonSpaceInfoProps & {
    setNextEnabled: (enabled: boolean) => void;
  }
> = ({ setNextEnabled, body, setBody, param, setParam }) => {
  const { data, isLoading, isError } = useGetCommonSpaces();
  const [date, setDate] = useState(startOfWeek(new Date()));

  const [intermediateSelectedValue, setIntermediateSelectedValue] =
    useState("");
  const [hasSelectError, setHasSelectError] = useState(false);
  const [dateTimeRange, setDateTimeRange] = useState<[Date, Date] | undefined>(
    body?.startTerm && body?.endTerm
      ? [body.startTerm, body.endTerm]
      : undefined,
  );
  const [showModal, setShowModal] = useState(false);

  const {
    data: usageOrdersData,
    isLoading: isUsageOrdersLoading,
    isError: isUsageOrdersError,
  } = useGetCommonSpaceUsageOrders(
    {
      spaceId: param.spaceId || 1,
    },
    { startDate: date, endDate: addWeeks(date, 1) },
  );

  const getSpace = useCallback(
    () =>
      data?.commonSpaces.find(
        item => item.id.toString() === param.spaceId?.toString(),
      ),
    [data?.commonSpaces, param.spaceId],
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
      Boolean(param.spaceId) && !hasSelectError && !!dateTimeRange;
    setNextEnabled(allConditionsMet);
  }, [param, hasSelectError, setNextEnabled, dateTimeRange]);

  const diffHours =
    dateTimeRange && differenceInHours(dateTimeRange[1], dateTimeRange[0]);
  const diffMinutes =
    dateTimeRange && differenceInMinutes(dateTimeRange[1], dateTimeRange[0]);

  useEffect(() => {
    if (dateTimeRange) {
      setBody(prev => ({
        ...prev,
        startTerm: dateTimeRange[0],
        endTerm: dateTimeRange[1],
      }));
    }
  }, [dateTimeRange, setBody]);

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
          selectedValue={param.spaceId?.toString() || ""}
          onSelect={value => {
            if (dateTimeRange) {
              setShowModal(true);
              setIntermediateSelectedValue(value);
            } else {
              setParam({ ...param, spaceId: Number(value) });
            }
          }}
          label="공용공간"
          setErrorStatus={setHasSelectError}
        />
        {showModal ? (
          <Modal>
            <CancellableModalContent
              onClose={() => {
                setShowModal(false);
                setIntermediateSelectedValue("");
              }}
              onConfirm={() => {
                setShowModal(false);
                setParam({
                  ...param,
                  spaceId: Number(intermediateSelectedValue),
                });
                setIntermediateSelectedValue("");
              }}
            >
              공용공간을 변경하면 선택한 시간이 모두 초기화됩니다.
              <br />
              ㄱㅊ?
            </CancellableModalContent>
          </Modal>
        ) : null}
      </AsyncBoundary>
      {getSpace() && (
        <>
          <Info
            text={`${getSpace()?.name}는 하루에 최대 ${getSpace()?.availableHoursPerDay}시간, 일주일에 최대 ${getSpace()?.availableHoursPerWeek}시간 사용할 수 있습니다.`}
          />
          <StyledCardLayout outline gap={20} style={{ flexDirection: "row" }}>
            <AsyncBoundary
              isLoading={isUsageOrdersLoading}
              isError={isUsageOrdersError}
            >
              <Timetable
                data={disabledCells}
                setDateTimeRange={setDateTimeRange}
                availableHoursPerDay={getSpace()?.availableHoursPerDay || 0}
                startDate={date}
                setStartDate={setDate}
              />
            </AsyncBoundary>
            <StyledCardOuter>
              {dateTimeRange && (
                <Card outline gap={20} style={{ marginTop: 64 }}>
                  <Typography fs={16} lh={20} fw="BOLD">
                    선택 시간
                  </Typography>
                  <Typography type="p">
                    {formatSimpleSlashDate(dateTimeRange[0])}
                    {formatTime(dateTimeRange[0])}~
                    {formatTime(dateTimeRange[1])} ({`${diffHours}시간`}
                    {diffMinutes! % 60 ? ` ${diffMinutes! % 60}분` : ""})
                  </Typography>
                </Card>
              )}
            </StyledCardOuter>
          </StyledCardLayout>
        </>
      )}
    </>
  );
};

export default CommonSpaceInfoSecondFrame;
