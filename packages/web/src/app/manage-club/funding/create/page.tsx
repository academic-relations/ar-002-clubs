"use client";

import React, { useState } from "react";

import styled from "styled-components";

import Button from "@sparcs-clubs/web/common/components/Button";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import AddEvidenceFrame from "@sparcs-clubs/web/features/manage-club/funding/create/frame/AddEvidenceFrame";
import BasicEvidenceFrame from "@sparcs-clubs/web/features/manage-club/funding/create/frame/BasicEvidenceFrame";
import FundingInfoFrame from "@sparcs-clubs/web/features/manage-club/funding/create/frame/FundingInfoFrame";
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
        <Button type="outlined">취소</Button>
        <Button type="default">신청</Button>
      </ButtonWrapper>
    </FlexWrapper>
  );
};

export default CreateFunding;
