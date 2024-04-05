import React, { useCallback, useState } from "react";
import styled from "styled-components";
import Button from "@sparcs-clubs/web/common/components/Button";
import { ActivityCertificateFrameProps } from "../ActivityCertificateNoticeFrame";
import ActivityCertificateInfoFirstFrame from "./ActivityCertificateInfoFirstFrame";
import ActivityCertificateInfoSecondFrame from "./ActivityCertificateInfoSecondFrame";
import ActivityCertificateInfoThirdFrame from "./ActivityCertificateInfoThirdFrame";

const RentalNoticeFrameInner = styled.div`
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
  ActivityCertificateInfoFirstFrame,
  ActivityCertificateInfoSecondFrame,
  ActivityCertificateInfoThirdFrame,
];

const ActivityCertificateInfoFrame: React.FC<ActivityCertificateFrameProps> = ({
  activityCertificate,
  setActivityCertificate,
}) => {
  const props = { activityCertificate, setActivityCertificate };
  const [step, setStep] = useState(0);
  const CurrentFrame = frames[step];

  const onPrev = useCallback(() => {
    if (step === 0) {
      setActivityCertificate({ ...activityCertificate, agreement: false });
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
        <CurrentFrame {...props} />
      </RentalNoticeFrameInner>
      <StyledBottom>
        <Button onClick={onPrev}>이전</Button>
        <Button onClick={onNext}>
          {step === frames.length - 1 ? "신청" : "다음"}
        </Button>
      </StyledBottom>
    </>
  );
};

export default ActivityCertificateInfoFrame;
