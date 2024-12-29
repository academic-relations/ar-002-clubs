"use client";

import { useRouter } from "next/navigation";
import { overlay } from "overlay-kit";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Modal from "@sparcs-clubs/web/common/components/Modal";
import ConfirmModalContent from "@sparcs-clubs/web/common/components/Modal/ConfirmModalContent";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import FundingForm from "@sparcs-clubs/web/features/manage-club/funding/frames/FundingForm";
import { FundingFormData } from "@sparcs-clubs/web/features/manage-club/funding/types/funding";

const CreateFunding = () => {
  const router = useRouter();
  const fundingCancelClick = () => {
    router.push("/manage-club/funding");
  };

  const openConfirmModal = (data: FundingFormData) => {
    overlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen}>
        <ConfirmModalContent
          onConfirm={() => {
            // TODO: 신청 로직 넣기
            console.log(data);
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
      <FundingForm onCancel={fundingCancelClick} onSubmit={openConfirmModal} />
    </FlexWrapper>
  );
};

export default CreateFunding;
