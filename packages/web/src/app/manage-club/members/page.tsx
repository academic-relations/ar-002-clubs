"use client";

import React from "react";

import PageTitle from "@sparcs-clubs/web/common/components/PageTitle";
import BreadCrumb from "@sparcs-clubs/web/common/components/BreadCrumb";
import styled from "styled-components";
import RegisterMemberListFrame from "@sparcs-clubs/web/features/manage-club/members/frames/RegisterMemberListFrame";
import AllMemberListFrame from "@sparcs-clubs/web/features/manage-club/members/frames/AllMemberListFrame";

const MembersPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

const PageHeadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Members = () => (
  <MembersPageWrapper>
    <PageHeadWrapper>
      <BreadCrumb
        items={[
          { name: "대표 동아리 관리", path: "/manage-club" },
          { name: "회원 명단", path: "/manage-club/members" },
        ]}
      />
      <PageTitle>회원 명단</PageTitle>
    </PageHeadWrapper>
    <RegisterMemberListFrame />
    <AllMemberListFrame />
  </MembersPageWrapper>
);

export default Members;
