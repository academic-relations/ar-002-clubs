import Card from "@sparcs-clubs/web/common/components/Card";
import Select from "@sparcs-clubs/web/common/components/Select";
import Info from "@sparcs-clubs/web/common/components/Info";
import Timetable from "@sparcs-clubs/web/common/components/Timetable";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { differenceInHours, differenceInMinutes, format } from "date-fns";
import { ko } from "date-fns/locale";

import type { CommonSpaceFrameProps } from "../CommonSpaceNoticeFrame";
import { mockCommonSpaceList } from "./mockCommonSpaceList";

const StyledCardOuter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  flex: 1 0 0;
  align-self: stretch;
`;

const CommonSpaceInfoSecondFrame: React.FC<
  CommonSpaceFrameProps & { setNextEnabled: (enabled: boolean) => void }
> = ({ setNextEnabled, commonSpace, setCommonSpace }) => {
  // TODO: 이름 전화번호 동아리 목록 백에서 받아오기

  const [selectedValue, setSelectedValue] = useState("");
  const [hasSelectError, setHasSelectError] = useState(false);
  const [dateTimeRange, setDateTimeRange] = useState<[Date, Date]>();

  useEffect(() => {
    const allConditionsMet =
      Boolean(selectedValue) && !hasSelectError && !!dateTimeRange;
    setNextEnabled(allConditionsMet);
  }, [selectedValue, hasSelectError, setNextEnabled, dateTimeRange]);

  useEffect(() => {
    setCommonSpace({
      ...commonSpace,
      space:
        mockCommonSpaceList.find(item => item.value === selectedValue)?.label ||
        "",
    });
  }, [selectedValue, setCommonSpace]);

  const diffHours =
    dateTimeRange && differenceInHours(dateTimeRange[1], dateTimeRange[0]);
  const diffMinutes =
    dateTimeRange && differenceInMinutes(dateTimeRange[1], dateTimeRange[0]);

  useEffect(() => {
    if (dateTimeRange) {
      setCommonSpace(prev => ({
        ...prev,
        reservation: {
          start: dateTimeRange[0],
          end: dateTimeRange[1],
        },
      }));
    }
  }, [dateTimeRange, setCommonSpace]);

  return (
    <>
      <Select
        items={mockCommonSpaceList}
        selectedValue={selectedValue}
        onSelect={setSelectedValue}
        label="공용공간"
        setErrorStatus={setHasSelectError}
      />
      {commonSpace.space && (
        <>
          <Info
            text={`${commonSpace.space}는 하루에 최대 4시간, 일주일에 최대 10시간 사용할 수 있습니다.`}
          />
          <Card outline gap={20} style={{ flexDirection: "row" }}>
            <Timetable
              data={Array(7 * 48).fill(false)}
              setDateTimeRange={setDateTimeRange}
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
