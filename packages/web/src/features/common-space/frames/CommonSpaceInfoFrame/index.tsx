import React, { useCallback, useState } from "react";
import styled from "styled-components";
import Button from "@sparcs-clubs/web/common/components/Button";
import StepProcess from "@sparcs-clubs/web/common/components/StepProcess/StepProcess";
import postCommonSpaceUsageOrder from "@sparcs-clubs/web/features/common-space/service/postCommonSpaceUsageOrder";

import type { CommonSpaceFrameProps } from "../CommonSpaceNoticeFrame";
import CommonSpaceInfoFirstFrame from "./CommonSpaceInfoFirstFrame";
import CommonSpaceInfoSecondFrame from "./CommonSpaceInfoSecondFrame";
import CommonSpaceInfoThirdFrame from "./CommonSpaceInfoThirdFrame";

const CommonSpaceFrame = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

const CommonSpaceNoticeFrameInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;
`;

const StyledBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
`;

const frames = [
  CommonSpaceInfoFirstFrame,
  CommonSpaceInfoSecondFrame,
  CommonSpaceInfoThirdFrame,
];

const steps = [
  {
    label: "기본 정보 입력",
    stepIndex: 1,
  },
  {
    label: "예약 정보 입력",
    stepIndex: 2,
  },
  {
    label: "최종 확인",
    stepIndex: 3,
  },
];

const CommonSpaceInfoFrame: React.FC<CommonSpaceFrameProps> = ({
  commonSpace,
  setCommonSpace,
}) => {
  const props = { commonSpace, setCommonSpace };
  const [step, setStep] = useState(0);
  const [nextEnabled, setNextEnabled] = useState(true);
  const CurrentFrame = frames[step];

  const onPrev = useCallback(() => {
    if (step === 0) {
      setCommonSpace({ ...commonSpace, agreement: false });
      return;
    }
    setStep(step - 1);
  }, [step, setStep, commonSpace, setCommonSpace]);

  const handleSubmit = useCallback(() => {
    const { email, clubdId, startTerm, endTerm } = commonSpace.body;
    const { spaceId } = commonSpace.param;
    const correct = email && clubdId && startTerm && endTerm && spaceId;
    if (correct) {
      postCommonSpaceUsageOrder(
        { spaceId },
        { email, clubdId, startTerm, endTerm },
      );
    }
  }, [commonSpace]);

  const onNext = useCallback(() => {
    if (nextEnabled && step < frames.length - 1) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  }, [nextEnabled, step, setStep]);

  return (
    <CommonSpaceFrame>
      <StepProcess steps={steps} activeStepIndex={step + 1} />
      <CommonSpaceNoticeFrameInner>
        <CurrentFrame {...props} setNextEnabled={setNextEnabled} />
      </CommonSpaceNoticeFrameInner>
      <StyledBottom>
        <Button onClick={onPrev}>이전</Button>
        <Button onClick={onNext} type={nextEnabled ? "default" : "disabled"}>
          {step === frames.length - 1 ? "신청" : "다음"}
        </Button>
      </StyledBottom>
    </CommonSpaceFrame>
  );
};

export default CommonSpaceInfoFrame;
