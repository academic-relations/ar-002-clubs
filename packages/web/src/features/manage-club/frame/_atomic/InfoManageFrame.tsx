import React from "react";
import styled from "styled-components";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import { ManageWrapper } from "@sparcs-clubs/web/features/manage-club/component/ManageFrameWrapper";

const InfoManageMainWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  padding-left: 24px;
`;

const InfoManageFrame: React.FC = () => {
  const [toggle, setToggle] = React.useState<boolean>(true);
  return (
    <ManageWrapper>
      <FoldableSectionTitle
        title="동아리 정보"
        toggle={toggle}
        toggleHandler={() => setToggle(!toggle)}
      />
      {toggle && (
        <InfoManageMainWrapper>
          <div>기본 정보</div>
          <div>대표자 및 대의원</div>
        </InfoManageMainWrapper>
      )}
    </ManageWrapper>
  );
};

export default InfoManageFrame;
