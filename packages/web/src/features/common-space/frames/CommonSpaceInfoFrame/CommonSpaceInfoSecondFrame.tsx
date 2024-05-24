import Card from "@sparcs-clubs/web/common/components/Card";
import Select from "@sparcs-clubs/web/common/components/Forms/Select";
import Info from "@sparcs-clubs/web/common/components/Info";
import Timetable from "@sparcs-clubs/web/common/components/Timetable";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import { useGetCommonSpaces } from "@sparcs-clubs/web/features/common-space/service/getCommonSpaces";
import apiCms001 from "@sparcs-clubs/interface/api/common-space/endpoint/apiCms001";
import { z } from "zod";

import { differenceInHours, differenceInMinutes, format } from "date-fns";
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

const CommonSpaceInfoSecondFrame: React.FC<
  CommonSpaceFrameProps & { setNextEnabled: (enabled: boolean) => void }
> = ({ setNextEnabled, commonSpace, setCommonSpace }) => {
  const { data, isLoading, isError } = useGetCommonSpaces();

  const [selectedValue, setSelectedValue] = useState("");
  const [hasSelectError, setHasSelectError] = useState(false);
  const [dateTimeRange, setDateTimeRange] = useState<[Date, Date]>();
  const [selectedSpace, setSelectedSpace] = useState<CommonSpaceItem>();

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
            <Timetable
              data={Array(7 * 48).fill(false)}
              setDateTimeRange={setDateTimeRange}
              availableHoursPerDay={selectedSpace.availableHoursPerDay}
            />
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
