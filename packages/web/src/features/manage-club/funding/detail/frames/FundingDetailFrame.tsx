import React from "react";

import { useParams, useRouter } from "next/navigation";
import { overlay } from "overlay-kit";
import styled from "styled-components";

import Button from "@sparcs-clubs/web/common/components/Button";
import Card from "@sparcs-clubs/web/common/components/Card";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Modal from "@sparcs-clubs/web/common/components/Modal";
import CancellableModalContent from "@sparcs-clubs/web/common/components/Modal/CancellableModalContent";
import { ProgressCheckSectionStatusEnum } from "@sparcs-clubs/web/common/components/ProgressCheckSection/progressCheckStationStatus";
import ProgressStatus from "@sparcs-clubs/web/common/components/ProgressStatus";
import RejectReasonToast from "@sparcs-clubs/web/common/components/RejectReasonToast";
import mockFundingDetail from "@sparcs-clubs/web/features/manage-club/services/_mock/mockFundingDetail";

import BasicEvidenceList from "../components/BasicEvidenceList";
import FixtureEvidenceList from "../components/FixtureEvidenceList";
import FundingInfoList from "../components/FundingInfoList";
import NonCorpEvidenceList from "../components/NonCorpEvidenceList";
import OtherEvidenceList from "../components/OtherEvidenceList";
import TransportationEvidenceList from "../components/TransportationEvidenceList";

interface FundingDetailFrameProps {
  isNow: boolean;
}

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const FundingDetailFrame: React.FC<FundingDetailFrameProps> = ({ isNow }) => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

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
            router.push(`/manage-club/funding/${id}/edit`);
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
            router.push("/manage-club/funding");
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
            labels={["신청 완료", "동아리 연합회 신청 반려"]}
            progress={[
              {
                status: ProgressCheckSectionStatusEnum.Approved,
                date: new Date(),
              },
              {
                status: ProgressCheckSectionStatusEnum.Canceled,
                date: new Date(),
              },
            ]}
            optional={
              <RejectReasonToast
                title="반려 사유"
                reasons={[
                  {
                    reason: "대충 어떤 반려 사유 어쩌고",
                    datetime: new Date(),
                  },
                ]}
              />
            }
          />
        )}
        <FundingInfoList />
        <BasicEvidenceList />
        {mockFundingDetail.purposeActivity?.id === 0 && <FixtureEvidenceList />}
        {mockFundingDetail.isFixture && <FixtureEvidenceList isFixture />}
        {mockFundingDetail.isTransportation && <TransportationEvidenceList />}
        {mockFundingDetail.isNonCorporateTransaction && <NonCorpEvidenceList />}
        {mockFundingDetail.isFoodExpense && (
          <OtherEvidenceList
            content="식비"
            explanation={mockFundingDetail.foodExpense?.explanation ?? ""}
          />
        )}
        {mockFundingDetail.isLaborContract && (
          <OtherEvidenceList
            content="근로 계약"
            explanation={mockFundingDetail.laborContract?.explanation ?? ""}
          />
        )}
        {mockFundingDetail.isExternalEventParticipationFee && (
          <OtherEvidenceList
            content="외부 행사 참가비"
            explanation={
              mockFundingDetail.externalEventParticipationFee?.explanation ?? ""
            }
          />
        )}
        {mockFundingDetail.isPublication && (
          <OtherEvidenceList
            content="발간물"
            explanation={mockFundingDetail.publication?.explanation ?? ""}
          />
        )}
        {mockFundingDetail.isProfitMakingActivity && (
          <OtherEvidenceList
            content="수익 사업"
            explanation={
              mockFundingDetail.profitMakingActivity?.explanation ?? ""
            }
          />
        )}
        {mockFundingDetail.isJointExpense && (
          <OtherEvidenceList
            content="공동 경비"
            explanation={mockFundingDetail.jointExpense?.explanation ?? ""}
          />
        )}
        {mockFundingDetail.isEtcExpense && (
          <OtherEvidenceList
            content="기타"
            explanation={mockFundingDetail.etcExpense?.explanation ?? ""}
          />
        )}
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
