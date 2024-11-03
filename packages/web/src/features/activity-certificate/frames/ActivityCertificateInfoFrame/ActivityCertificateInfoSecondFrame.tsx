import React, { useState } from "react";

import { useFieldArray, useFormContext } from "react-hook-form";
import styled from "styled-components";

import Button from "@sparcs-clubs/web/common/components/Button";
import IconButton from "@sparcs-clubs/web/common/components/Buttons/IconButton";
import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import FormController from "@sparcs-clubs/web/common/components/FormController";
import DateInput from "@sparcs-clubs/web/common/components/Forms/DateInput";
import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";
import Icon from "@sparcs-clubs/web/common/components/Icon";
import Info from "@sparcs-clubs/web/common/components/Info";

import Typography from "@sparcs-clubs/web/common/components/Typography";
import {
  ActivityCertificateInfo,
  ActivityHistory,
} from "@sparcs-clubs/web/features/activity-certificate/types/activityCertificate";

import { StyledBottom } from "../_atomic/StyledBottom";

interface ActivityCertificateInfoSecondFrameProps {
  onPrev: VoidFunction;
  onNext: VoidFunction;
}

const ActivityCertificateSecondFrameInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;
`;

const ActivityCertificateRow = styled.div`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
  display: inline-flex;
  flex-direction: row;
`;

const IconOuterFrameInner = styled.div`
  height: 36px;
  padding-top: 2px;
  padding-bottom: 2px;
  justify-content: space-between;
  align-items: flex-start;
  display: flex;
`;

const IconInnerFrameInner = styled.div`
  padding: 8px;
  border-radius: 4px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  gap: 4px;
  display: flex;
  cursor: pointer;
`;

const InputFrameInner = styled.div`
  flex: 1 1 0;
  align-items: flex-start;
  gap: 20px;
  display: flex;
`;

const ActivityCertificateInfoSecondFrame: React.FC<
  ActivityCertificateInfoSecondFrameProps
> = ({ onPrev, onNext }) => {
  const {
    watch,
    control,
    formState: { isValid, errors },
  } = useFormContext<ActivityCertificateInfo>();

  const { fields, append, replace } = useFieldArray<
    ActivityCertificateInfo,
    "histories"
  >({
    control,
    name: "histories",
  });

  const [draggingActivityDescription, setDraggingActivityDescription] =
    useState<ActivityHistory | null>(null);

  const activityHistories = watch("histories");

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    activityDescription: ActivityHistory,
  ) => {
    setDraggingActivityDescription(activityDescription);
    e.dataTransfer.setData("text/plain", "");
  };

  const handleDragEnd = () => {
    setDraggingActivityDescription(null);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (
    e: React.DragEvent<HTMLDivElement>,
    activityDescription: ActivityHistory,
  ) => {
    if (!draggingActivityDescription) return;

    const currentIndex = fields.findIndex(
      field => field.key === draggingActivityDescription.key,
    );
    const targetIndex = fields.findIndex(
      field => field.key === activityDescription.key,
    );

    const tempActivityDescriptions: Array<ActivityHistory> = fields.slice();
    if (currentIndex !== -1 && targetIndex !== -1) {
      tempActivityDescriptions.splice(currentIndex, 1);
      tempActivityDescriptions.splice(
        targetIndex,
        0,
        draggingActivityDescription,
      );

      replace(tempActivityDescriptions);
    }
  };

  const handleAddActivityDescription = () => {
    const maxKey = Math.max(...fields.map(({ key }) => key));

    if (fields.length === 0) {
      append({
        key: 1,
        dateRange: [null, null],
        description: "",
      });
    } else if (fields.length < 5) {
      append({
        key: maxKey + 1,
        dateRange: [null, null],
        description: "",
      });
    }
  };

  const handleRemoveActivityDescription = (activityDescriptionKey: number) => {
    if (fields.length > 1) {
      replace([
        ...fields.filter(
          activityDescription =>
            activityDescription.key !== activityDescriptionKey,
        ),
      ]);
    }
  };

  return (
    <>
      <ActivityCertificateSecondFrameInner>
        <Info text="활동 내역 최대 5개까지 입력 가능, 날짜 포함 => 워딩은 병찬이나 동연에서 고쳐주겟징~~" />
        <Card outline gap={20}>
          {fields.map((field, index) => {
            const errorMessage =
              errors.histories?.[index]?.dateRange?.message ?? "";

            return (
              <ActivityCertificateRow
                key={field.key}
                draggable="true"
                onDragStart={e => handleDragStart(e, field)}
                onDragEnd={handleDragEnd}
                onDragOver={e => handleDragOver(e)}
                onDrop={e => handleDrop(e, field)}
              >
                <IconOuterFrameInner>
                  <IconInnerFrameInner>
                    <Icon type="menu" size={16} />
                  </IconInnerFrameInner>
                </IconOuterFrameInner>
                <InputFrameInner>
                  <FlexWrapper
                    direction="column"
                    gap={4}
                    style={{ minWidth: 165 }}
                  >
                    <FormController
                      name={`histories.${index}.dateRange`}
                      control={control}
                      rules={{
                        validate: value =>
                          value?.[1] != null || "끝 기간을 입력하지 않았습니다",
                      }}
                      renderItem={({ value, onChange }) => (
                        <DateInput
                          showIcon={false}
                          selectsRange
                          showMonthYearPicker
                          startDate={value?.[0] ?? undefined}
                          endDate={value?.[1] ?? undefined}
                          onChange={dates => {
                            onChange(dates);
                          }}
                          selectedDates={
                            value
                              ? [value[0], value[1]].filter(
                                  (date): date is Date => date !== undefined,
                                )
                              : undefined
                          }
                          placeholderText="20XX.XX - 20XX.XX"
                          dateFormat="yyyy.MM"
                        />
                      )}
                    />
                    {errorMessage.length > 0 && (
                      <Typography
                        fs={12}
                        lh={16}
                        color="RED.600"
                        style={{ marginLeft: 2 }}
                      >
                        {errorMessage}
                      </Typography>
                    )}
                  </FlexWrapper>
                  <FormController
                    name={`histories.${index}.description`}
                    control={control}
                    required
                    renderItem={props => (
                      <TextInput
                        {...props}
                        placeholder="활동 내역을 작성해주세요"
                      />
                    )}
                  />
                </InputFrameInner>

                <IconOuterFrameInner
                  onClick={_e => handleRemoveActivityDescription(field.key)}
                >
                  <IconInnerFrameInner>
                    <Icon type="delete" size={16} />
                  </IconInnerFrameInner>
                </IconOuterFrameInner>
              </ActivityCertificateRow>
            );
          })}
          <IconButton
            type={activityHistories.length < 5 ? "default" : "disabled"}
            onClick={handleAddActivityDescription}
            icon="add"
          >
            활동 내역 추가
          </IconButton>
        </Card>
      </ActivityCertificateSecondFrameInner>
      <StyledBottom>
        <Button onClick={onPrev}>이전</Button>
        <Button
          onClick={onNext}
          type={
            activityHistories.length >= 1 &&
            activityHistories.length <= 5 &&
            isValid
              ? "default"
              : "disabled"
          }
        >
          다음
        </Button>
      </StyledBottom>
    </>
  );
};
export default ActivityCertificateInfoSecondFrame;
