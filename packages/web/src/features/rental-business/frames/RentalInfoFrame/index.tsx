import React, { useCallback, useState } from "react";
import styled from "styled-components";
import Button from "@sparcs-clubs/web/common/components/Button";
import StepProcess from "@sparcs-clubs/web/common/components/StepProcess/StepProcess";
import { RentalFrameProps } from "../RentalNoticeFrame";
import RentalInfoFirstFrame from "./RentalInfoFirstFrame";
import RentalInfoSecondFrame from "./RentalInfoSecondFrame";
import RentalInfoThirdFrame from "./RentalInfoThirdFrame";

const RentalFrame = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

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
  RentalInfoFirstFrame,
  RentalInfoSecondFrame,
  RentalInfoThirdFrame,
];

const steps = [
  {
    label: "기본 정보 입력",
    stepIndex: 1,
  },
  {
    label: "대여 물품 선택",
    stepIndex: 2,
  },
  {
    label: "최종확인",
    stepIndex: 3,
  },
];

const RentalInfoFrame: React.FC<RentalFrameProps> = ({ rental, setRental }) => {
  const props = { rental, setRental };
  const [step, setStep] = useState(0);
  const [nextEnabled, setNextEnabled] = useState(true);
  const CurrentFrame = frames[step];

  const onPrev = useCallback(() => {
    if (step === 0) {
      setRental({ ...rental, agreement: false });
      return;
    }
    setStep(step - 1);
  }, [step, setStep, rental, setRental]);

  const onNext = useCallback(() => {
    if (nextEnabled && step < frames.length - 1) {
      setStep(step + 1);
    }
  }, [nextEnabled, step, setStep]);

  return (
    <RentalFrame>
      <StepProcess steps={steps} activeStepIndex={step + 1} />
      <RentalNoticeFrameInner>
        <CurrentFrame {...props} setNextEnabled={setNextEnabled} />
      </RentalNoticeFrameInner>
      <StyledBottom>
        <Button onClick={onPrev}>이전</Button>
        {/* TODO: 2에서 1로 돌아가려고 하면 초기화 경고 modal */}
        <Button onClick={onNext} type={nextEnabled ? "default" : "disabled"}>
          {step === frames.length - 1 ? "신청" : "다음"}
        </Button>
        {/* TODO: 신청 완료 modal */}
        {/* TODO: 백이랑 연결 */}
      </StyledBottom>
    </RentalFrame>
  );
};

export default RentalInfoFrame;
