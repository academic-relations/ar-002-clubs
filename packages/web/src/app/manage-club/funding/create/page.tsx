"use client";

import styled from "styled-components";

import Button from "@sparcs-clubs/web/common/components/Button";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import AddEvidenceFrame from "@sparcs-clubs/web/features/manage-club/funding/create/frame/AddEvidenceFrame";
import BasicEvidenceFrame from "@sparcs-clubs/web/features/manage-club/funding/create/frame/BasicEvidenceFrame";
import FundingInfoFrame from "@sparcs-clubs/web/features/manage-club/funding/create/frame/FundingInfoFrame";

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CreateFunding = () => (
  <FlexWrapper direction="column" gap={60}>
    <PageHead
      items={[
        { name: "대표 동아리 관리", path: "/manage-club" },
        { name: "지원금", path: "/manage-club/funding" },
      ]}
      title="지원금 신청"
      enableLast
    />
    <FundingInfoFrame />
    <BasicEvidenceFrame />
    <AddEvidenceFrame />
    <ButtonWrapper>
      <Button type="outlined">취소</Button>
      <Button type="default">신청</Button>
    </ButtonWrapper>
  </FlexWrapper>
);

export default CreateFunding;
