"use client";

import React from "react";

import styled from "styled-components";
import RegisterMemberListFrame from "@sparcs-clubs/web/features/manage-club/members/frames/RegisterMemberListFrame";
import AllMemberListFrame from "@sparcs-clubs/web/features/manage-club/members/frames/AllMemberListFrame";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";

const MembersPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

const Members = () => (
  <MembersPageWrapper>
    <PageHead
      items={[
        { name: "대표 동아리 관리", path: "/manage-club" },
        { name: "회원 명단", path: "/manage-club/members" },
      ]}
      title="회원 명단"
    />
    <RegisterMemberListFrame />
    {/* TODO: registereMember는 신청 시기에만 나오도록 */}
    <AllMemberListFrame />
  </MembersPageWrapper>
);

export default Members;
