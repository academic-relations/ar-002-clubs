import React, { useCallback, useState } from "react";

import { overlay } from "overlay-kit";
import { useFormContext } from "react-hook-form";
import styled from "styled-components";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Modal from "@sparcs-clubs/web/common/components/Modal";
import CancellableModalContent from "@sparcs-clubs/web/common/components/Modal/CancellableModalContent";
import StepProcess from "@sparcs-clubs/web/common/components/StepProcess/StepProcess";
// import StyledBottom from "@sparcs-clubs/web/common/components/StyledBottom";
// import postCommonSpaceUsageOrder from "@sparcs-clubs/web/features/common-space/service/postCommonSpaceUsageOrder";

import { CommonSpaceInterface } from "@sparcs-clubs/web/features/common-space/types/commonSpace";

import CommonSpaceInfoFirstFrame from "./CommonSpaceInfoFirstFrame";
import CommonSpaceInfoSecondFrame from "./CommonSpaceInfoSecondFrame";
import CommonSpaceInfoThirdFrame from "./CommonSpaceInfoThirdFrame";

const CommonSpaceNoticeFrameInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;
`;

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

const CommonSpaceInfoFrame: React.FC = () => {
  const { setValue } = useFormContext<CommonSpaceInterface>();
  const [step, setStep] = useState(0);

  const openEditModal = useCallback(() => {
    overlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen}>
        <CancellableModalContent
          onConfirm={() => {
            close();
            setStep(step - 1);
          }}
          onClose={close}
        >
          공용공간 신청 내역을 수정하면 신청 상태가 모두 초기화 됩니다.
          <br />
          ㄱㅊ?
        </CancellableModalContent>
      </Modal>
    ));
  }, [step, setStep]);

  const onPrev = useCallback(() => {
    if (step === 0) {
      setValue("agreement", false);
      return;
    }
    if (step === 1) {
      openEditModal();
      return;
    }
    setStep(step - 1);
  }, [setValue, step, openEditModal]);

  const onNext = useCallback(() => {
    if (step < 2) {
      setStep(step + 1);
    }
  }, [step, setStep]);

  return (
    <FlexWrapper direction="column" gap={60}>
      <CommonSpaceNoticeFrameInner>
        <StepProcess steps={steps} activeStepIndex={step + 1} />
        {step === 0 && (
          <CommonSpaceInfoFirstFrame onPrev={onPrev} onNext={onNext} />
        )}
        {step === 1 && (
          <CommonSpaceInfoSecondFrame onPrev={onPrev} onNext={onNext} />
        )}
        {step === 2 && <CommonSpaceInfoThirdFrame onPrev={onPrev} />}
      </CommonSpaceNoticeFrameInner>
    </FlexWrapper>
  );
};

export default CommonSpaceInfoFrame;
