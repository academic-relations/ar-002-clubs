import styled from "styled-components";

import Button from "@sparcs-clubs/web/common/components/Button";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";

import AddEvidFrame from "./_atomic/AddEvidFrame";
import BasicEvidFrame from "./_atomic/BasicEvidFrame";
import FundingInfoFrame from "./_atomic/FundingInfoFrame";

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CreateFundingMainFrame = () => (
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
    <BasicEvidFrame />
    <AddEvidFrame />
    <ButtonWrapper>
      <Button type="outlined">취소</Button>
      <Button type="default">신청</Button>
    </ButtonWrapper>
  </FlexWrapper>
);

export default CreateFundingMainFrame;
