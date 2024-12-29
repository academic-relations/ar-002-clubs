import React from "react";

import { useRouter } from "next/navigation";

import { overlay } from "overlay-kit";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Modal from "@sparcs-clubs/web/common/components/Modal";
import ConfirmModalContent from "@sparcs-clubs/web/common/components/Modal/ConfirmModalContent";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import Typography from "@sparcs-clubs/web/common/components/Typography";

import { useCreateFunding } from "../services/useCreateFunding";
import { FundingFormData } from "../types/funding";

import FundingForm from "./FundingForm";

interface CreateFundingFrameProps {
  clubId: number;
}

const CreateFundingFrame: React.FC<CreateFundingFrameProps> = ({ clubId }) => {
  const router = useRouter();
  const fundingCancelClick = () => {
    router.push("/manage-club/funding");
  };

  const { mutate: createFunding } = useCreateFunding(clubId);

  const handleSubmit = (data: FundingFormData) => {
    createFunding(data, {
      onSuccess: () => {
        overlay.open(({ isOpen, close }) => (
          <Modal isOpen={isOpen}>
            <ConfirmModalContent
              onConfirm={() => {
                close();
                router.push("/manage-club/funding");
              }}
            >
              신청이 완료되었습니다. <br />
              확인을 누르면 신청 내역 화면으로 이동합니다.
            </ConfirmModalContent>
          </Modal>
        ));
      },
      onError: error => {
        overlay.open(({ isOpen, close }) => (
          <Modal isOpen={isOpen}>
            <ConfirmModalContent onConfirm={close}>
              지원금 신청에 실패했습니다.
              <Typography color="GRAY.300" fs={12} lh={16} fw="REGULAR">
                {error.message}
              </Typography>
            </ConfirmModalContent>
          </Modal>
        ));
      },
    });
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
      <FundingForm onCancel={fundingCancelClick} onSubmit={handleSubmit} />
    </FlexWrapper>
  );
};

export default CreateFundingFrame;
