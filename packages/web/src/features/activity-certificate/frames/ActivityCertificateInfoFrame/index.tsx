import React, { useCallback, useState } from "react";

import { useFormContext } from "react-hook-form";
import styled from "styled-components";

import StepProcess, {
  StepInputType,
} from "@sparcs-clubs/web/common/components/StepProcess/StepProcess";

import { ActivityCertificateInfo } from "@sparcs-clubs/web/features/activity-certificate//types/activityCertificate";

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

const ActivityCertificateInfoFrame: React.FC = () => {
  const { setValue } = useFormContext<ActivityCertificateInfo>();

  const [step, setStep] = useState(0);

  const onPrev = useCallback(() => {
    if (step === 0) {
      setValue("isAgreed", false);
      return;
    }
    setStep(step - 1);
  }, [step, setValue]);

  const onNext = useCallback(() => {
    if (step === 2) {
      return;
    }
    setStep(step + 1);
  }, [step, setStep]);

  return (
    <RentalNoticeFrameInner>
      <StepProcess steps={steps} activeStepIndex={step + 1} />
      {step === 0 && (
        <ActivityCertificateInfoFirstFrame onPrev={onPrev} onNext={onNext} />
      )}
      {step === 1 && (
        <ActivityCertificateInfoSecondFrame onPrev={onPrev} onNext={onNext} />
      )}
      {step === 2 && <ActivityCertificateInfoThirdFrame onPrev={onPrev} />}
    </RentalNoticeFrameInner>
  );
};

export default ActivityCertificateInfoFrame;
