import React, { useState } from "react";
import styled from "styled-components";

import Info from "@sparcs-clubs/web/common/components/Info";
import SectionTitle from "@sparcs-clubs/web/common/components/SectionTitle";
import { newMemberListSectionInfoText } from "@sparcs-clubs/web/constants/manageClubMembers";
import TextButton from "@sparcs-clubs/web/common/components/TextButton";
import { mockDeadline, mockSemester } from "./_mock/mockMembers";
import RegisterMemberList from "../components/RegisterMemberList";

const RegisterMemberWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const RegisterMemberListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-left: 24px;
`;

const ClubCategoryTitle = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`;

const RegisterMemberListFrame = () => {
  const [toggle, setToggle] = useState<boolean>(true);
  return (
    <RegisterMemberWrapper>
      <ClubCategoryTitle>
        <SectionTitle>신청 회원 명단</SectionTitle>
        <TextButton onClick={() => setToggle(!toggle)} text="임시 토글" />
        {/* TODO: funding 머지 되면 foldable section title 가져오기 */}
      </ClubCategoryTitle>
      {toggle ? (
        <RegisterMemberListWrapper>
          <Info
            text={newMemberListSectionInfoText(mockSemester, mockDeadline)}
          />
          <RegisterMemberList />
        </RegisterMemberListWrapper>
      ) : null}
    </RegisterMemberWrapper>
  );
};

export default RegisterMemberListFrame;
