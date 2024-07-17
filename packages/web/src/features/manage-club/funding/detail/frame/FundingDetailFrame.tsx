import React from "react";

import { useRouter } from "next/navigation";
import { overlay } from "overlay-kit";
import styled from "styled-components";

import Button from "@sparcs-clubs/web/common/components/Button";
import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Modal from "@sparcs-clubs/web/common/components/Modal";
import CancellableModalContent from "@sparcs-clubs/web/common/components/Modal/CancellableModalContent";
import { Status } from "@sparcs-clubs/web/common/components/ProgressCheckSection/_atomic/ProgressDot";
import ProgressStatus from "@sparcs-clubs/web/common/components/ProgressStatus";
import mockFundingDetail from "@sparcs-clubs/web/features/manage-club/service/_mock/mockFundingDetail";

import BasicEvidenceList from "../components/BasicEvidenceList";
import FixtureEvidenceList from "../components/FixtureEvidenceList";
import FundingInfoList from "../components/FundingInfoList";
import NonCorpEvidenceList from "../components/NonCorpEvidenceList";

interface FundingDetailFrameProps {
  isNow: boolean;
}

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FundingDetailFrame: React.FC<FundingDetailFrameProps> = ({ isNow }) => {
  const router = useRouter();

  const onClick = () => {
    router.push("/manage-club/funding");
  };

  const openEditModal = () => {
    overlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen}>
        <CancellableModalContent
          onConfirm={() => {
            close();
            // TODO: 수정 로직 넣기
          }}
          onClose={close}
        >
          지원금 신청 내역을 수정하면 신청 상태가 모두 초기화 됩니다.
          <br />
          ㄱㅊ?
        </CancellableModalContent>
      </Modal>
    ));
  };

  const openDeleteModal = () => {
    overlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen}>
        <CancellableModalContent
          onConfirm={() => {
            close();
            // TODO: 삭제 로직 넣기
          }}
          onClose={close}
        >
          지원금 신청 내역을 삭제하면 복구할 수 없습니다.
          <br />
          ㄱㅊ?
        </CancellableModalContent>
      </Modal>
    ));
  };

  return (
    <FlexWrapper direction="column" gap={40}>
      <Card outline>
        {isNow && (
          <ProgressStatus
            labels={["신청 완료", "동아리 연합회 승인 대기"]}
            progress={[{ status: Status.Approved, date: new Date() }]}
            // TODO: 반려일 경우 optional에 RejectReasonToast 추가
          />
        )}
        <FundingInfoList />
        <BasicEvidenceList />
        {mockFundingDetail.purposeId === 0 && <FixtureEvidenceList />}
        {mockFundingDetail.isFixture && <FixtureEvidenceList isFixture />}
        {mockFundingDetail.isNonCorporateTransaction && <NonCorpEvidenceList />}
      </Card>
      <ButtonWrapper>
        <Button type="default" onClick={onClick}>
          목록으로 돌아가기
        </Button>
        {isNow && (
          <FlexWrapper direction="row" gap={10}>
            <Button type="default" onClick={openDeleteModal}>
              삭제
            </Button>
            <Button type="default" onClick={openEditModal}>
              수정
            </Button>
          </FlexWrapper>
        )}
      </ButtonWrapper>
    </FlexWrapper>
  );
};
export default FundingDetailFrame;
