"use client";

import React from "react";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import AllMemberListFrame from "@sparcs-clubs/web/features/manage-club/members/frames/AllMemberListFrame";
import RegisterMemberListFrame from "@sparcs-clubs/web/features/manage-club/members/frames/RegisterMemberListFrame";

const Members = () => (
  <FlexWrapper direction="column" gap={60}>
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
  </FlexWrapper>
);

export default Members;
