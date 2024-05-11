import React, { useCallback, useState } from "react";
import styled from "styled-components";
import Button from "@sparcs-clubs/web/common/components/Button";
import StepProcess from "@sparcs-clubs/web/common/components/StepProcess/StepProcess";
import Modal from "@sparcs-clubs/web/common/components/Modal";
import CancellableModalContent from "@sparcs-clubs/web/common/components/Modal/CancellableModalContent";
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

  const [showReturnModal, setShowReturnModal] = useState(false);

  const onConfirmReturn = useCallback(() => {
    setShowReturnModal(false);
    setStep(step - 1);
  }, [step, setStep, rental, setRental]);

  const onCloseReturn = () => setShowReturnModal(false);

  const onPrev = useCallback(() => {
    if (step === 0) {
      setRental({ ...rental, agreement: false });
    }
    if (step === 1) {
      setShowReturnModal(true);
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
        <Button onClick={onNext} type={nextEnabled ? "default" : "disabled"}>
          {step === frames.length - 1 ? "신청" : "다음"}
        </Button>
        {/* TODO: 신청 완료 modal */}
        {/* TODO: 백이랑 연결 */}
      </StyledBottom>
      {showReturnModal && (
        <Modal>
          <CancellableModalContent
            onConfirm={onConfirmReturn}
            onClose={onCloseReturn}
          >
            이전 단계로 이동할 경우
            <br />
            현재 단계에서 입력한 내용은 저장되지 않고 초기화됩니다.
          </CancellableModalContent>
        </Modal>
      )}
    </RentalFrame>
  );
};

export default RentalInfoFrame;
