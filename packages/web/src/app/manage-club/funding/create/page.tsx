"use client";

import React, { useState } from "react";

import { useRouter } from "next/navigation";
import { overlay } from "overlay-kit";
import styled from "styled-components";

import Button from "@sparcs-clubs/web/common/components/Button";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Modal from "@sparcs-clubs/web/common/components/Modal";
import ConfirmModalContent from "@sparcs-clubs/web/common/components/Modal/ConfirmModalContent";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import AddEvidenceFrame from "@sparcs-clubs/web/features/manage-club/funding/frames/AddEvidenceFrame";
import BasicEvidenceFrame from "@sparcs-clubs/web/features/manage-club/funding/frames/BasicEvidenceFrame";
import FundingInfoFrame from "@sparcs-clubs/web/features/manage-club/funding/frames/FundingInfoFrame";
import { FundingInterface } from "@sparcs-clubs/web/features/manage-club/funding/types/funding";

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CreateFunding = () => {
  const [funding, setFunding] = useState<FundingInterface>({
    isFixture: false,
    isTransportation: false,
    isNonCorporateTransaction: false,
    isFoodExpense: false,
    isLaborContract: false,
    isExternalEventParticipationFee: false,
    isPublication: false,
    isProfitMakingActivity: false,
    isJointExpense: false,
    isEtcExpense: false,
  });
  const props = { funding, setFunding };

  const router = useRouter();
  const fundingCancelClick = () => {
    router.push("/manage-club/funding");
  };

  const openConfirmModal = () => {
    overlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen}>
        <ConfirmModalContent
          onConfirm={() => {
            // TODO: 신청 로직 넣기
            close();
            router.push("/manage-club/funding");
          }}
        >
          신청이 완료되었습니다. <br />
          확인을 누르면 신청 내역 화면으로 이동합니다.
        </ConfirmModalContent>
      </Modal>
    ));
  };

  return (
    <FlexWrapper direction="column" gap={60}>
      <PageHead
        items={[
          { name: "대표 동아리 관리", path: "/manage-club" },
          { name: "지원금", path: "/manage-club/funding" },
        ]}
        title="지원금 신청"
        enableLast
      />
      <FundingInfoFrame {...props} />
      <BasicEvidenceFrame {...props} />
      <AddEvidenceFrame {...props} />
      <ButtonWrapper>
        <Button type="outlined" onClick={fundingCancelClick}>
          취소
        </Button>
        <Button type="default" onClick={openConfirmModal}>
          신청
        </Button>
      </ButtonWrapper>
    </FlexWrapper>
  );
};

export default CreateFunding;
