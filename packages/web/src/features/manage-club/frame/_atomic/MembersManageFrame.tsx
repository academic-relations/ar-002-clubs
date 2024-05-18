import React from "react";
import styled from "styled-components";

import MoreDetailTitle from "@sparcs-clubs/web/features/manage-club/component/MoreDetailTitle";

const MembersManageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const MembersManageFrame: React.FC = () => (
  <MembersManageWrapper>
    <MoreDetailTitle
      title="(현재 현황 보여주기)"
      // TODO: mock data 가져와서 title formatting
      moreDetail="전체 보기"
      moreDetailPath="/manage-club/members"
    />
    회원 table
  </MembersManageWrapper>
);

export default MembersManageFrame;
