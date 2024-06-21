import React, { useState } from "react";
import styled from "styled-components";

import Info from "@sparcs-clubs/web/common/components/Info";
import { newMemberListSectionInfoText } from "@sparcs-clubs/web/constants/manageClubMembers";
import FoldableSectionTitle from "@sparcs-clubs/web/common/components/FoldableSectionTitle";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import { mockDeadline, mockSemester } from "./_mock/mockMembers";
import RegisterMemberList from "../components/RegisterMemberList";

const RegisterMemberListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-left: 24px;
`;

const RegisterMemberListFrame = () => {
  const [toggle, setToggle] = useState<boolean>(true);
  return (
    <FlexWrapper direction="column" gap={20}>
      <FoldableSectionTitle
        title="신청 회원 명단"
        toggle={toggle}
        toggleHandler={() => setToggle(!toggle)}
      />
      {toggle && (
        <RegisterMemberListWrapper>
          <Info
            text={newMemberListSectionInfoText(mockSemester, mockDeadline)}
          />
          <RegisterMemberList />
        </RegisterMemberListWrapper>
      )}
    </FlexWrapper>
  );
};

export default RegisterMemberListFrame;
