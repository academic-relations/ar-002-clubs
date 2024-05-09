import React, { useCallback, useState } from "react";
import styled from "styled-components";
import Button from "@sparcs-clubs/web/common/components/Button";
import StepProcess from "@sparcs-clubs/web/common/components/StepProcess/StepProcess";
import Modal from "@sparcs-clubs/web/common/components/Modal";
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
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);

  const CurrentFrame = frames[step];

  const onPrev = useCallback(() => {
    if (step === 1) {
      setShowReturnModal(true);
      // 값이 있을 때 이전 단계 돌아갈지 물어보도록
      return;
    }
    setStep(step - 1);
  }, [step, setStep]);

  const onNext = useCallback(() => {
    if (nextEnabled && step < frames.length - 1) {
      setStep(step + 1);
    }
    if (step === frames.length - 1) {
      setShowAssignModal(true);
    }
  }, [nextEnabled, step, setStep]);

  const onCloseReturnModal = useCallback(() => {
    setShowReturnModal(false);
    setStep(0);
  }, []);

  const onCloseAssignModal = useCallback(() => {
    setShowAssignModal(false);
  }, []);

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
        {/* TODO: 백이랑 연결 */}
      </StyledBottom>
      {showReturnModal && (
        <Modal onClose={onCloseReturnModal}>
          <div>
            정말로 이전 단계로 돌아가시겠습니까? 모든 입력 정보가 초기화됩니다.
          </div>
          <Button onClick={onCloseReturnModal}>확인</Button>
        </Modal>
      )}
      {showAssignModal && (
        <Modal onClose={onCloseAssignModal}>
          <div>신청하시겠습니까? 신청 후에는 수정이 불가능합니다.</div>
          <Button onClick={onCloseAssignModal}>확인</Button>
        </Modal>
      )}
    </RentalFrame>
  );
};

export default RentalInfoFrame;
