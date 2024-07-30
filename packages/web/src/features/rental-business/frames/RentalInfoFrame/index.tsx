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
import { useGetAvailableRentals } from "@sparcs-clubs/web/features/rental-business/service/getAvailableRentals";
import postRentalOrder from "@sparcs-clubs/web/features/rental-business/service/postRentalOrder";

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

const RentalInfoFrame: React.FC<RentalFrameProps> = ({ rental, setRental }) => {
  const router = useRouter();
  const props = { rental, setRental };
  const [step, setStep] = useState(0);
  const [nextEnabled, setNextEnabled] = useState(true);
  const CurrentFrame = frames[step];

  const isRentalListEmpty = () =>
    !rental.easel &&
    !rental.vacuum &&
    (!rental.handCart || Object.values(rental.handCart).every(val => !val)) &&
    !rental.mat &&
    (!rental.tool || Object.values(rental.tool).every(val => !val));

  const openReturnModal = () => {
    overlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen}>
        <CancellableModalContent
          onConfirm={() => {
            close();
            setRental({ agreement: true, info: rental.info });
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
    // TODO: step 0으로 돌아갈 때 agreement true로 두기
    if (step === 0) {
      setRental({ agreement: false, info: rental.info });
    }
    if (step === 1) {
      if (!isRentalListEmpty()) {
        openReturnModal();
        return;
      }
      if (rental.date?.start !== undefined) {
        openReturnModal();
        return;
      }
    }
    setStep(step - 1);
  }, [step, setStep, rental, setRental]);

  const { data } = useGetAvailableRentals(
    rental.date?.start ?? new Date(),
    rental.date?.end ?? new Date(),
  );
  // TODO: 임시로 달아둠, 고쳐야 함
  const objectsWithQuantity = [
    { name: "Easel", quantity: rental.easel || 0 },
    { name: "Vacuum Corded", quantity: rental.vacuum === "corded" ? 1 : 0 },
    {
      name: "Hand Cart Rolltainer",
      quantity: rental.handCart?.rolltainer || 0,
    },
    { name: "Hand Cart Large", quantity: rental.handCart?.large || 0 },
    { name: "Hand Cart Medium", quantity: rental.handCart?.medium || 0 },
    { name: "Hand Cart Small", quantity: rental.handCart?.small || 0 },
    { name: "Mat", quantity: rental.mat || 0 },
    { name: "Power Drill Set", quantity: rental.tool?.powerDrill || 0 },
    { name: "Driver Set", quantity: rental.tool?.driver || 0 },
    { name: "Super Glue", quantity: rental.tool?.superGlue || 0 },
    { name: "Nipper", quantity: rental.tool?.nipper || 0 },
    { name: "Plier", quantity: rental.tool?.plier || 0 },
    { name: "Long Nose Plier", quantity: rental.tool?.longNosePlier || 0 },
  ];

  const objectsWithId = objectsWithQuantity.map(item => {
    const { id } = data?.objects.find(obj => obj.name === item.name) || {
      id: -1,
    };
    return { id, number: item.quantity };
  });

  const filteredObjectsWithId = objectsWithId.filter(item => item.number !== 0);

  const onNext = useCallback(() => {
    if (nextEnabled && step < frames.length - 1) {
      setStep(step + 1);
    }
    if (step === frames.length - 1) {
      // TODO?: 신청 제대로 안 됐을 때 modal?
      postRentalOrder(
        // TODO: 임시로 달아둠, 고쳐야 함
        { clubId: rental.info?.clubId ?? 1 },
        {
          studentPhoneNumber: rental.info?.phone ?? "",
          objects: filteredObjectsWithId,
          purpose: rental.purpose ?? "",
          desiredStart: rental.date?.start ?? new Date(),
          desiredEnd: rental.date?.end ?? new Date(),
        },
      ).then(() => openAssignModal());
    }
  }, [nextEnabled, step, setStep]);

  return (
    <FlexWrapper direction="column" gap={60}>
      <StepProcess steps={steps} activeStepIndex={step + 1} />
      <RentalNoticeFrameInner>
        <CurrentFrame {...props} setNextEnabled={setNextEnabled} />
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
