import React from "react";

import styled from "styled-components";

import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import Info from "@sparcs-clubs/web/common/components/Info";
import { newMemberListSectionInfoText } from "@sparcs-clubs/web/constants/manageClubMembers";

import RegisterMemberList from "../components/RegisterMemberList";

const RegisterMemberListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const RegisterMemberListFrame = () => (
  <FoldableSectionTitle title="신청 회원 명단" childrenMargin="20px">
    <RegisterMemberListWrapper>
      {/* TODO: 실제 신청기간 보여주기 */}
      <Info text={newMemberListSectionInfoText("2024년 가을", new Date())} />
      <RegisterMemberList />
    </RegisterMemberListWrapper>
  </FoldableSectionTitle>
);

export default RegisterMemberListFrame;
