import React, { useState } from "react";
import styled from "styled-components";
import Button from "@sparcs-clubs/web/common/components/Button";
import { RentalFrameProps } from "../RentalNoticeFrame";
import RentalInfoFirstFrame from "./RentalInfoFirstFrame";
import RentalInfoSecondFrame from "./RentalInfoSecondFrame";
import RentalInfoThirdFrame from "./RentalInfoThirdFrame";

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

const RentalInfoFrame: React.FC<RentalFrameProps> = ({ rental, setRental }) => {
  const props = { rental, setRental };
  const [step, setStep] = useState(0);
  const CurrentFrame = frames[step];

  const onPrev = () => {
    if (step === 0) {
      setRental({ ...rental, agreement: false });
      return;
    }
    setStep(step - 1);
  };

  const onNext = () => {
    if (step === frames.length - 1) {
      return;
    }
    setStep(step + 1);
  };

  return (
    <>
      <RentalNoticeFrameInner>
        dummy
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

export default RentalInfoFrame;
