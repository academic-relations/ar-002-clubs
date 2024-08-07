"use client";

import { useState } from "react";

import { useParams, useRouter } from "next/navigation";
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
import mockFundingDetail from "@sparcs-clubs/web/features/manage-club/services/_mock/mockFundingDetail";
import { formatDotDate } from "@sparcs-clubs/web/utils/Date/formatDate";

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const EditFunding = () => {
  // TODO: 나중에 관련 input들 다 생기면 짧아질 예정 (select의 value 값을 number | string으로 바꾸는 것도 고려해봐야 할 것 같음)
  const [funding, setFunding] = useState<FundingInterface>({
    ...mockFundingDetail,
    purposeId: mockFundingDetail.purposeId?.toString() || "",
    expenditureDate: formatDotDate(mockFundingDetail.expenditureDate),
    expenditureAmount: mockFundingDetail.expenditureAmount.toString(),
    clubSuppliesEvidenceEnumId:
      mockFundingDetail.clubSuppliesEvidenceEnumId?.toString() || "",
    clubSuppliesClassEnumId:
      mockFundingDetail.clubSuppliesClassEnumId?.toString() || "",
    fixtureEvidenceEnumId:
      mockFundingDetail.fixtureEvidenceEnumId?.toString() || "",
    fixtureClassEnumId: mockFundingDetail.fixtureClassEnumId?.toString() || "",
    transportationEnumId:
      mockFundingDetail.transportationEnumId?.toString() || "",
    numberOfClubSupplies:
      mockFundingDetail.numberOfClubSupplies?.toString() || "",
    numberOfFixture: mockFundingDetail.numberOfFixture?.toString() || "",
    priceOfClubSupplies:
      mockFundingDetail.priceOfClubSupplies?.toString() || "",
    priceOfFixture: mockFundingDetail.priceOfFixture?.toString() || "",
  });

  const props = { funding, setFunding };

  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const cancelClick = () => {
    router.push(`/manage-club/funding/${id}`);
  };

  const openEditModal = () => {
    overlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen}>
        <ConfirmModalContent
          onConfirm={() => {
            // TODO: 저장 로직 넣기
            close();
            router.push("/manage-club/funding");
          }}
        >
          수정이 완료되었습니다. <br />
          확인을 누르면 신청 내역 화면으로 이동합니다.
        </ConfirmModalContent>
      </Modal>
    ));
  };

  return (
    // TODO: RejectReasonToast
    <FlexWrapper direction="column" gap={60}>
      <PageHead
        items={[
          { name: "대표 동아리 관리", path: "/manage-club" },
          { name: "지원금", path: "/manage-club/funding" },
        ]}
        title="지원금 수정"
        enableLast
      />
      <FundingInfoFrame {...props} />
      <BasicEvidenceFrame {...props} />
      <AddEvidenceFrame {...props} />
      <ButtonWrapper>
        <Button type="outlined" onClick={cancelClick}>
          취소
        </Button>
        <Button type="default" onClick={openEditModal}>
          저장
        </Button>
      </ButtonWrapper>
    </FlexWrapper>
  );
};

export default EditFunding;
