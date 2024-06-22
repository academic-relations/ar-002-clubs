import React, { useCallback, useState } from "react";

import styled from "styled-components";

import Button from "@sparcs-clubs/web/common/components/Button";
import StepProcess, {
  StepInputType,
} from "@sparcs-clubs/web/common/components/StepProcess/StepProcess";

import { ActivityCertificateFrameProps } from "../ActivityCertificateNoticeFrame";

import ActivityCertificateInfoFirstFrame from "./ActivityCertificateInfoFirstFrame";
import ActivityCertificateInfoSecondFrame from "./ActivityCertificateInfoSecondFrame";
import ActivityCertificateInfoThirdFrame from "./ActivityCertificateInfoThirdFrame";

const RentalNoticeFrameInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 60px;
  align-self: stretch;
`;

const StyledBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
`;

const frames = [
  ActivityCertificateInfoFirstFrame,
  ActivityCertificateInfoSecondFrame,
  ActivityCertificateInfoThirdFrame,
];

const steps: StepInputType[] = [
  {
    label: "기본 정보 입력",
    stepIndex: 1,
  },
  {
    label: "활동 내역 입력",
    stepIndex: 2,
  },
  {
    label: "최종 확인",
    stepIndex: 3,
  },
];

const ActivityCertificateInfoFrame: React.FC<ActivityCertificateFrameProps> = ({
  activityCertificate,
  setActivityCertificate,
  activityCertificateProgress,
  setActivityCertificateProgress,
  firstErrorStatus,
  setFirstErrorStatus,
  secondErrorStatus,
  setSecondErrorStatus,
}) => {
  const props = {
    activityCertificate,
    setActivityCertificate,
    activityCertificateProgress,
    setActivityCertificateProgress,
    firstErrorStatus,
    setFirstErrorStatus,
    secondErrorStatus,
    setSecondErrorStatus,
  };
  const [step, setStep] = useState(0);
  const CurrentFrame = frames[step];

  const nextButtonDisabler = () => {
    if (step === 0) {
      if (
        activityCertificateProgress.firstFilled &&
        activityCertificateProgress.firstNoError
      )
        return "default";
      return "disabled";
    }
    if (step === 1) {
      if (
        activityCertificateProgress.secondFilled &&
        activityCertificateProgress.secondNoError
      )
        return "default";
      return "disabled";
    }
    return "default";
  };

  const onPrev = useCallback(() => {
    if (step === 0) {
      setActivityCertificateProgress({
        ...activityCertificateProgress,
        agreement: false,
      });
      return;
    }
    setStep(step - 1);
  }, [step, setStep, activityCertificate, setActivityCertificate]);

  const onNext = useCallback(() => {
    if (step === frames.length - 1) {
      return;
    }
    setStep(step + 1);
  }, [step, setStep]);

  return (
    <>
      <RentalNoticeFrameInner>
        <StepProcess steps={steps} activeStepIndex={step + 1} />
        <CurrentFrame {...props} />
      </RentalNoticeFrameInner>
      <StyledBottom>
        <Button onClick={onPrev}>이전</Button>
        <Button
          onClick={nextButtonDisabler() === "default" ? onNext : undefined}
          type={nextButtonDisabler()}
        >
          {step === frames.length - 1 ? "신청" : "다음"}
        </Button>
      </StyledBottom>
    </>
  );
};

export default ActivityCertificateInfoFrame;
