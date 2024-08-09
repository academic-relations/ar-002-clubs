import React from "react";

import styled from "styled-components";

import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import Info from "@sparcs-clubs/web/common/components/Info";
import { newMemberListSectionInfoText } from "@sparcs-clubs/web/constants/manageClubMembers";

import RegisterMemberList from "../components/RegisterMemberList";

import { mockDeadline, mockSemester } from "./_mock/mockMembers";

const RegisterMemberListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-left: 24px;
`;

const RegisterMemberListFrame = () => (
  <FoldableSectionTitle title="신청 회원 명단" childrenMargin="20px">
    <RegisterMemberListWrapper>
      <Info text={newMemberListSectionInfoText(mockSemester, mockDeadline)} />
      <RegisterMemberList />
    </RegisterMemberListWrapper>
  </FoldableSectionTitle>
);

export default RegisterMemberListFrame;
