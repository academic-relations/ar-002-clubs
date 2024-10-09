import React, { useCallback, useState } from "react";

import { useRouter } from "next/navigation";
import { overlay } from "overlay-kit";
import styled from "styled-components";

import Button from "@sparcs-clubs/web/common/components/Button";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Modal from "@sparcs-clubs/web/common/components/Modal";
import CancellableModalContent from "@sparcs-clubs/web/common/components/Modal/CancellableModalContent";
import ConfirmModalContent from "@sparcs-clubs/web/common/components/Modal/ConfirmModalContent";
import StepProcess from "@sparcs-clubs/web/common/components/StepProcess/StepProcess";

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

const RentalInfoFrame: React.FC<RentalFrameProps> = ({ formCtx }) => {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [nextEnabled, setNextEnabled] = useState(true);
  const CurrentFrame = frames[step];

  const openReturnModal = () => {
    overlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen}>
        <CancellableModalContent
          onConfirm={() => {
            close();
            setStep(step - 1);
          }}
          onClose={close}
        >
          이전 단계로 이동할 경우
          <br />
          현재 단계에서 입력한 내용은 저장되지 않고 초기화됩니다.
        </CancellableModalContent>
      </Modal>
    ));
  };

  const openAssignModal = () => {
    overlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen}>
        <ConfirmModalContent
          onConfirm={() => {
            close();
            router.push("/my");
          }}
        >
          신청이 완료되었습니다.
          <br />
          확인을 누르면 신청 내역 화면으로 이동합니다.
        </ConfirmModalContent>
      </Modal>
    ));
  };

  const onPrev = useCallback(() => {
    setStep(step - 1);
    openReturnModal();
  }, [step, setStep]);

  const onNext = useCallback(() => {
    if (step < frames.length - 1) {
      setStep(step + 1);
    }
    if (step === frames.length - 1) {
      openAssignModal();
    }
  }, [step, setStep]);

  return (
    <FlexWrapper direction="column" gap={60}>
      <StepProcess steps={steps} activeStepIndex={step + 1} />
      <RentalNoticeFrameInner>
        <CurrentFrame formCtx={formCtx} setNextEnabled={setNextEnabled} />
      </RentalNoticeFrameInner>
      <StyledBottom>
        <Button onClick={onPrev}>이전</Button>
        <Button onClick={onNext} type={nextEnabled ? "default" : "disabled"}>
          {step === frames.length - 1 ? "신청" : "다음"}
        </Button>
      </StyledBottom>
    </FlexWrapper>
  );
};

export default RentalInfoFrame;
