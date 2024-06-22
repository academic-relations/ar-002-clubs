import React, { useEffect, useState } from "react";

import styled from "styled-components";

import Card from "@sparcs-clubs/web/common/components/Card";
import DateRangeInput from "@sparcs-clubs/web/common/components/Forms/DateRangeInput";
import IconButton from "@sparcs-clubs/web/common/components/Forms/IconButton";
import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";
import Icon from "@sparcs-clubs/web/common/components/Icon";
import Info from "@sparcs-clubs/web/common/components/Info";

// eslint-disable-next-line no-restricted-imports
import { ActivityDescription } from "../../types/activityCertificate";
import { ActivityCertificateFrameProps } from "../ActivityCertificateNoticeFrame";

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
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  display: flex;
`;

const DescriptionInputFrameInner = styled.div`
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
  display: flex;
`;

const ActivityCertificateInfoSecondFrame: React.FC<
  ActivityCertificateFrameProps
> = ({
  activityCertificate,
  setActivityCertificate,
  activityCertificateProgress,
  setActivityCertificateProgress,
  secondErrorStatus,
  setSecondErrorStatus,
}) => {
  useEffect(() => {
    let canPass = true;

    activityCertificate.detail.forEach(activityDescription => {
      if (
        activityDescription.startMonth.length < 7 ||
        activityDescription.endMonth.length < 7 ||
        activityDescription.description.length === 0
      ) {
        canPass = false;
      }
    });

    setActivityCertificateProgress({
      ...activityCertificateProgress,
      secondFilled: canPass,
    });
  }, [activityCertificate]);

  useEffect(() => {
    let canPass = true;

    secondErrorStatus.forEach(activityDescriptionErrorStatus => {
      if (
        activityDescriptionErrorStatus.hasDescriptionError ||
        activityDescriptionErrorStatus.hasStartEndMonthError
      ) {
        canPass = false;
      }
    });

    setActivityCertificateProgress({
      ...activityCertificateProgress,
      secondNoError: canPass,
    });
  }, [secondErrorStatus]);

  const [draggingActivityDescription, setDraggingActivityDescription] =
    useState<ActivityDescription | null>(null);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    activityDescription: ActivityDescription,
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
    activityDescription: ActivityDescription,
  ) => {
    if (!draggingActivityDescription) return;

    const currentIndex = activityCertificate.detail.indexOf(
      draggingActivityDescription,
    );
    const targetIndex = activityCertificate.detail.indexOf(activityDescription);

    const tempActivityDescriptions: Array<ActivityDescription> =
      activityCertificate.detail.slice();
    if (currentIndex !== -1 && targetIndex !== -1) {
      tempActivityDescriptions.splice(currentIndex, 1);
      tempActivityDescriptions.splice(
        targetIndex,
        0,
        draggingActivityDescription,
      );

      setActivityCertificate({
        ...activityCertificate,
        detail: tempActivityDescriptions,
      });
    }
  };

  const handleAddActivityDescription = () => {
    const maxKey = Math.max(
      ...activityCertificate.detail.map(({ key }) => key),
    );
    if (activityCertificate.detail.length < 5) {
      setActivityCertificate({
        ...activityCertificate,
        detail: [
          ...activityCertificate.detail,
          {
            key: maxKey + 1,
            startMonth: "",
            endMonth: "",
            description: "",
          },
        ],
      });
      setSecondErrorStatus([
        ...secondErrorStatus,
        {
          key: maxKey + 1,
          hasStartEndMonthError: false,
          hasDescriptionError: false,
        },
      ]);
    }
  };

  const handleRemoveActivityDescription = (activityDescriptionKey: number) => {
    if (activityCertificate.detail.length > 1) {
      setActivityCertificate({
        ...activityCertificate,
        detail: activityCertificate.detail.filter(
          activityDescription =>
            activityDescription.key !== activityDescriptionKey,
        ),
      });
      setSecondErrorStatus(
        secondErrorStatus.filter(
          activityDescriptionErrorStatus =>
            activityDescriptionErrorStatus.key !== activityDescriptionKey,
        ),
      );
    }
  };

  const handleActivityDescriptionChange = (key: number, newValue: string) => {
    const tempActivityDescriptions = activityCertificate.detail.map(
      tempActivityDescription => {
        if (tempActivityDescription.key === key) {
          return {
            ...tempActivityDescription,
            description: newValue,
          };
        }
        return tempActivityDescription;
      },
    );

    setActivityCertificate({
      ...activityCertificate,
      detail: tempActivityDescriptions,
    });
  };

  const handleActivityStartEndMonthChange = (key: number, newValue: string) => {
    const tempActivityDescriptions = activityCertificate.detail.map(
      tempActivityDescription => {
        if (tempActivityDescription.key === key) {
          return {
            ...tempActivityDescription,
            startMonth: newValue.split("|")[0],
            endMonth: newValue.split("|")[1],
          };
        }
        return tempActivityDescription;
      },
    );

    setActivityCertificate({
      ...activityCertificate,
      detail: tempActivityDescriptions,
    });
  };

  const handleError = (
    key: number,
    inputType: "hasStartEndMonthError" | "hasDescriptionError",
    hasError: boolean,
  ) => {
    const tempErrorStatus = secondErrorStatus.map(tempRowErrorStatus => {
      if (tempRowErrorStatus.key === key) {
        return {
          ...tempRowErrorStatus,
          [inputType]: hasError,
        };
      }
      return tempRowErrorStatus;
    });

    if (JSON.stringify(secondErrorStatus) !== JSON.stringify(tempErrorStatus)) {
      setSecondErrorStatus(tempErrorStatus);
    }
  };

  return (
    <ActivityCertificateSecondFrameInner>
      <Info text="활동 내역 최대 5개까지 입력 가능, 날짜 포함 => 워딩은 병찬이나 동연에서 고쳐주겟징~~" />
      <Card outline gap={20}>
        {activityCertificate.detail.map(activityDescription => (
          <ActivityCertificateRow
            key={activityDescription.key}
            draggable="true"
            onDragStart={e => handleDragStart(e, activityDescription)}
            onDragEnd={handleDragEnd}
            onDragOver={e => handleDragOver(e)}
            onDrop={e => handleDrop(e, activityDescription)}
          >
            <IconOuterFrameInner>
              <IconInnerFrameInner>
                <Icon type="menu" size={16} />
              </IconInnerFrameInner>
            </IconOuterFrameInner>

            <InputFrameInner>
              <DescriptionInputFrameInner>
                <DateRangeInput
                  setErrorStatus={e =>
                    handleError(
                      activityDescription.key,
                      "hasStartEndMonthError",
                      e,
                    )
                  }
                  placeholder="20XX.XX"
                  limitStartValue={activityCertificate.startMonth}
                  limitEndValue={activityCertificate.endMonth}
                  startValue={activityDescription.startMonth}
                  endValue={activityDescription.endMonth}
                  onChange={e =>
                    handleActivityStartEndMonthChange(
                      activityDescription.key,
                      e,
                    )
                  }
                />
                <TextInput
                  setErrorStatus={e =>
                    handleError(
                      activityDescription.key,
                      "hasDescriptionError",
                      e,
                    )
                  }
                  style={
                    secondErrorStatus.filter(
                      activityDescriptionErrorStatus =>
                        activityDescriptionErrorStatus.key ===
                        activityDescription.key,
                    )[0] &&
                    secondErrorStatus.filter(
                      activityDescriptionErrorStatus =>
                        activityDescriptionErrorStatus.key ===
                        activityDescription.key,
                    )[0].hasStartEndMonthError
                      ? { marginBottom: "20px" }
                      : {}
                  }
                  placeholder="활동 내역을 작성해주세요"
                  value={activityDescription.description}
                  onChange={e =>
                    handleActivityDescriptionChange(
                      activityDescription.key,
                      e.target.value,
                    )
                  }
                />
              </DescriptionInputFrameInner>
            </InputFrameInner>

            <IconOuterFrameInner
              onClick={_e =>
                handleRemoveActivityDescription(activityDescription.key)
              }
            >
              <IconInnerFrameInner>
                <Icon type="delete" size={16} />
              </IconInnerFrameInner>
            </IconOuterFrameInner>
          </ActivityCertificateRow>
        ))}
        <IconButton
          type={activityCertificate.detail.length < 5 ? "default" : "disabled"}
          onClick={handleAddActivityDescription}
          buttonText="활동 내역 추가"
          iconType="add"
        />
      </Card>
    </ActivityCertificateSecondFrameInner>
  );
};

export default ActivityCertificateInfoSecondFrame;
