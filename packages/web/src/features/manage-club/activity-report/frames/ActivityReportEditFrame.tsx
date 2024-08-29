import React, { useCallback, useEffect, useState } from "react";

import apiAct003 from "@sparcs-clubs/interface/api/activity/endpoint/apiAct003";
import { ActivityTypeEnum } from "@sparcs-clubs/interface/common/enum/activity.enum";
import { isValid, parse } from "date-fns";
import { useRouter } from "next/navigation";
import styled from "styled-components";

import { z } from "zod";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import Button from "@sparcs-clubs/web/common/components/Button";
import Card from "@sparcs-clubs/web/common/components/Card";
import FileUpload from "@sparcs-clubs/web/common/components/FileUpload";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import DateRangeInput from "@sparcs-clubs/web/common/components/Forms/DateRangeInput";
import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import SectionTitle from "@sparcs-clubs/web/common/components/SectionTitle";
import Select from "@sparcs-clubs/web/common/components/Select";

import { formatDotDate } from "@sparcs-clubs/web/utils/Date/formatDate";

import { mockParticipantData } from "../_mock/mock";
import SelectParticipant from "../components/SelectParticipant";
import { useGetActivityReport } from "../services/useGetActivityReport";
import { usePutActivityReport } from "../services/usePutActivityReport";

const ActivityReportMainFrameInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 60px;
`;

const SectionInner = styled.div`
  padding-left: 24px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;
`;

const ButtonPlaceRight = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  align-self: stretch;
`;

type PutActivityReportBody = z.infer<typeof apiAct003.requestBody>;
const ActivityReportEditFrame: React.FC<{ id: string }> = ({ id }) => {
  const { data, isLoading, isError } = useGetActivityReport(Number(id));
  const { mutate } = usePutActivityReport();
  const [formData, setFormData] = useState<PutActivityReportBody>();
  const [duration, setDuration] = useState<[string, string]>(["", ""]);
  const router = useRouter();

  const handleFormChange = useCallback(
    <K extends keyof PutActivityReportBody>(
      key: K,
      value: PutActivityReportBody[K],
    ) => {
      if (!formData) return;
      setFormData({ ...formData, [key]: value });
    },
    [formData],
  );

  useEffect(() => {
    const parsedStartDate = parse(duration[0], "yyyy.MM.dd", new Date());
    const parsedEndDate = parse(duration[1], "yyyy.MM.dd", new Date());

    if (isValid(parsedStartDate) && isValid(parsedEndDate)) {
      handleFormChange("durations", [
        { startTerm: parsedStartDate, endTerm: parsedEndDate },
      ]);
    }
  }, [duration, handleFormChange]);

  useEffect(() => {
    if (data) {
      setFormData(data);
      if (data.durations.length) {
        const { startTerm, endTerm } = data.durations[0];
        const formattedStart = formatDotDate(startTerm);
        const formattedEnd = formatDotDate(endTerm);
        setDuration([formattedStart, formattedEnd]);
      }
    }
  }, [data]);

  const handleSubmit = useCallback(() => {
    if (!formData) return;
    mutate(
      { activityId: Number(id), body: formData },
      {
        onSuccess: () => {
          router.push("/manage-club/activity-report");
        },
      },
    );
  }, [formData, id, mutate, router]);

  return (
    <ActivityReportMainFrameInner>
      <PageHead
        items={[
          { name: "대표 동아리 관리", path: "/manage-club" },
          { name: "활동 보고서", path: "/manage-club/activity-report" },
        ]}
        title="활동 보고서 작성"
        enableLast
      />
      <AsyncBoundary isLoading={isLoading} isError={isError}>
        <SectionTitle>활동 정보</SectionTitle>
        <SectionInner>
          <Card outline padding="32px" gap={32}>
            <TextInput
              label="활동명"
              placeholder="활동명을 입력해주세요"
              name="name"
              value={formData?.name}
              handleChange={value => handleFormChange("name", value)}
            />
            <FlexWrapper gap={32} direction="row">
              <Select
                label="활동 분류"
                items={[
                  {
                    value: ActivityTypeEnum.matchedInternalActivity.toString(),
                    label: "동아리 성격에 합치하는 내부 활동",
                    selectable: true,
                  },
                  {
                    value: ActivityTypeEnum.matchedExternalActivity.toString(),
                    label: "동아리 성격에 합치하는 외부 활동",
                    selectable: true,
                  },
                  {
                    value: ActivityTypeEnum.notMatchedActivity.toString(),
                    label: "동아리 성격에 합치하지 않는 활동",
                    selectable: true,
                  },
                ]}
                value={formData?.activityTypeEnumId.toString()}
                onChange={value =>
                  handleFormChange("activityTypeEnumId", Number(value))
                }
              />
              <DateRangeInput
                label={["활동 기간", "\u200B"]}
                startValue={duration[0]}
                endValue={duration[1]}
                limitStartValue="2000.01.01"
                limitEndValue="3000.01.01"
                placeholder="날짜를 입력해주세요"
                onChange={value => {
                  const [start, end] = value.split("|");
                  setDuration([start, end]);
                }}
                useDays
              />
            </FlexWrapper>
            <TextInput
              label="활동 장소"
              placeholder="활동 장소를 입력해주세요"
              name="location"
              value={formData?.location}
              handleChange={value => handleFormChange("location", value)}
            />
            <TextInput
              label="활동 목적"
              placeholder="활동 목적을 입력해주세요"
              name="purpose"
              value={formData?.purpose}
              handleChange={value => handleFormChange("purpose", value)}
            />
            <TextInput
              area
              label="활동 내용"
              placeholder="활동 내용을 입력해주세요"
              name="detail"
              value={formData?.detail}
              handleChange={value => handleFormChange("detail", value)}
            />
          </Card>
        </SectionInner>
        <SectionTitle>활동 인원</SectionTitle>
        <SectionInner>
          <SelectParticipant data={mockParticipantData} />
        </SectionInner>
        <SectionTitle>활동 증빙</SectionTitle>
        <SectionInner>
          <Card outline padding="32px" gap={32}>
            <FileUpload />
            <TextInput
              area
              placeholder="(선택) 활동 증빙에 대해서 작성하고 싶은 것이 있다면 입력해주세요"
              name="evidence"
              value={formData?.evidence}
              handleChange={value => handleFormChange("evidence", value)}
            />
          </Card>
        </SectionInner>
        <ButtonPlaceRight>
          <Button type="default" onClick={handleSubmit}>
            저장
          </Button>
        </ButtonPlaceRight>
      </AsyncBoundary>
    </ActivityReportMainFrameInner>
  );
};

export default ActivityReportEditFrame;
