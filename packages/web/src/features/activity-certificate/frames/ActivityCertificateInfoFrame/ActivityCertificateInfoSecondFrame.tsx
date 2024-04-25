import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "@sparcs-clubs/web/common/components/Card";
import Info from "@sparcs-clubs/web/common/components/Info";

import Icon from "@sparcs-clubs/web/common/components/Icon";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import TextInput from "@sparcs-clubs/web/common/components/Forms/TextInput";
import Button from "@sparcs-clubs/web/common/components/Button";
import MonthInput, {
  monthInputEval,
} from "@sparcs-clubs/web/common/components/Forms/MonthInput";
import { ActivityCertificateFrameProps } from "../ActivityCertificateNoticeFrame";
// eslint-disable-next-line no-restricted-imports
import { ActivityDescription } from "../../types/activityCertificate";

const StyledCard = styled(Card)<{ type: string }>`
  padding: 32px;
  gap: 20px;
  align-self: stretch;
`;

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
  height: 36px;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
  display: flex;
`;

const StartEndMonthInputFrameInner = styled.div`
  height: 36px;
  justify-content: flex-start;
  align-items: center;
  gap: 12px;
  display: flex;
`;

const DescriptionInputFrameinner = styled.div`
  width: 100%;
  height: 36px;
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
}) => {
  const outOfMonthBoundError = (
    startMonth: string,
    endMonth: string,
    selfIdentity: "startMonth" | "endMonth",
  ) => {
    // 1. 전에 적은 기간을 벗어나거나
    // 2. startMonth가 endMonth보다 늦거나
    if (
      monthInputEval(startMonth, "startMonth") === "" &&
      monthInputEval(endMonth, "endMonth") === ""
    ) {
      if (new Date(startMonth).getTime() > new Date(endMonth).getTime()) {
        return "입력 기간이 올바르지 않습니다";
      }
    }
    if (
      selfIdentity === "startMonth" &&
      monthInputEval(startMonth, "startMonth") === ""
    ) {
      if (
        new Date(startMonth).getTime() <
          new Date(activityCertificate.startMonth!).getTime() ||
        new Date(activityCertificate.endMonth!).getTime() <
          new Date(startMonth).getTime()
      ) {
        return "입력 기간이 올바르지 않습니다";
      }
    }
    if (
      selfIdentity === "endMonth" &&
      monthInputEval(endMonth, "endMonth") === ""
    ) {
      if (
        new Date(endMonth).getTime() <
          new Date(activityCertificate.startMonth!).getTime() ||
        new Date(activityCertificate.endMonth!).getTime() <
          new Date(endMonth).getTime()
      ) {
        return "입력 기간이 올바르지 않습니다";
      }
    }
    return "";
  };

  useEffect(() => {
    console.log(activityCertificate);

    let tempSecondFilled = true;
    activityCertificate.detail.forEach(activityDescription => {
      if (
        activityDescription.startMonth === null ||
        monthInputEval(activityDescription.startMonth, "startMonth") !== ""
      ) {
        // TODO - 에러 메세지
        tempSecondFilled = false;
      } else if (
        activityDescription.endMonth === null ||
        monthInputEval(activityDescription.endMonth, "endMonth") !== ""
      ) {
        // TODO - 에러 메세지
        tempSecondFilled = false;
      } else if (!activityDescription.description) {
        // TODO - 에러 메세지
        tempSecondFilled = false;
      } else if (
        outOfMonthBoundError(
          activityDescription.startMonth,
          activityDescription.endMonth,
          "startMonth",
        ) ||
        outOfMonthBoundError(
          activityDescription.startMonth,
          activityDescription.endMonth,
          "endMonth",
        )
      ) {
        tempSecondFilled = false;
      }
    });

    setActivityCertificateProgress({
      ...activityCertificateProgress,
      secondFilled: tempSecondFilled,
    });
  }, [activityCertificate]);

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
      console.log(tempActivityDescriptions);

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
    }
  };

  const handleActivityDescriptionChange = (
    key: number,
    inputType: "startMonth" | "endMonth" | "description",
    newValue: string,
  ) => {
    const tempActivityDescriptions = activityCertificate.detail.map(
      tempActivityDescription => {
        if (tempActivityDescription.key === key) {
          return Object.assign(tempActivityDescription, {
            [inputType]: newValue,
          });
        }
        return tempActivityDescription;
      },
    );

    setActivityCertificate({
      ...activityCertificate,
      detail: tempActivityDescriptions,
    });
  };

  return (
    <ActivityCertificateSecondFrameInner>
      <Info text="활동 내역 최대 5개까지 입력 가능, 날짜 포함 => 워딩은 병찬이나 동연에서 고쳐주겟징~~" />
      <StyledCard type="outline">
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
              <StartEndMonthInputFrameInner>
                {outOfMonthBoundError(
                  activityDescription.startMonth,
                  activityDescription.endMonth,
                  "startMonth",
                ) === "" ? (
                  <MonthInput
                    placeholder="20XX.XX"
                    startEndType="startMonth"
                    onMonthChange={changedMonth =>
                      handleActivityDescriptionChange(
                        activityDescription.key,
                        "startMonth",
                        changedMonth,
                      )
                    }
                  />
                ) : (
                  <MonthInput
                    placeholder="20XX.XX"
                    startEndType="startMonth"
                    errorMessage={outOfMonthBoundError(
                      activityDescription.startMonth,
                      activityDescription.endMonth,
                      "startMonth",
                    )}
                    onMonthChange={changedMonth =>
                      handleActivityDescriptionChange(
                        activityDescription.key,
                        "startMonth",
                        changedMonth,
                      )
                    }
                  />
                )}
                <Typography type="p">~</Typography>
                {outOfMonthBoundError(
                  activityDescription.startMonth,
                  activityDescription.endMonth,
                  "endMonth",
                ) === "" ? (
                  <MonthInput
                    placeholder="20XX.XX"
                    startEndType="endMonth"
                    onMonthChange={changedMonth =>
                      handleActivityDescriptionChange(
                        activityDescription.key,
                        "endMonth",
                        changedMonth,
                      )
                    }
                  />
                ) : (
                  <MonthInput
                    placeholder="20XX.XX"
                    startEndType="endMonth"
                    errorMessage={outOfMonthBoundError(
                      activityDescription.startMonth,
                      activityDescription.endMonth,
                      "endMonth",
                    )}
                    onMonthChange={changedMonth =>
                      handleActivityDescriptionChange(
                        activityDescription.key,
                        "endMonth",
                        changedMonth,
                      )
                    }
                  />
                )}
              </StartEndMonthInputFrameInner>
              <DescriptionInputFrameinner>
                <TextInput
                  placeholder="활동 내역을 작성해주세요"
                  onChange={e =>
                    handleActivityDescriptionChange(
                      activityDescription.key,
                      "description",
                      e.target.value,
                    )
                  }
                />
              </DescriptionInputFrameinner>
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
        <Button
          type={activityCertificate.detail.length < 5 ? "default" : "disabled"}
          onClick={handleAddActivityDescription}
        >
          + 활동 내역 추가
        </Button>
      </StyledCard>
    </ActivityCertificateSecondFrameInner>
  );
};

export default ActivityCertificateInfoSecondFrame;
