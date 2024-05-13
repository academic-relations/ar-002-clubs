import React, { useState } from "react";
import styled from "styled-components";

import Info from "@sparcs-clubs/web/common/components/Info";
import { newMemberListSectionInfoText } from "@sparcs-clubs/web/constants/manageClubMembers";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
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

const RegisterMemberListFrame = () => {
  const [toggle, setToggle] = useState<boolean>(true);
  return (
    <RegisterMemberWrapper>
      <FoldableSectionTitle
        title="신청 회원 명단"
        toggle={toggle}
        toggleHandler={() => setToggle(!toggle)}
      />
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
