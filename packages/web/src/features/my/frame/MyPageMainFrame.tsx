"use client";

import React from "react";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";

import MyClubFrame from "./_atomic/MyClubFrame";
import MyInfoFrame from "./_atomic/MyInfoFrame";
import MyServiceFrame from "./_atomic/MyServiceFrame";

const MyPageMainFrame: React.FC = () => (
  <FlexWrapper direction="column" gap={60}>
    <PageHead
      items={[{ name: "마이페이지", path: "/my" }]}
      title="마이페이지"
    />
    <MyInfoFrame />
    <MyClubFrame />
    <MyServiceFrame />
  </FlexWrapper>
);

export default MyPageMainFrame;
