"use client";

import React from "react";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import MyInfoFrame from "./_atomic/MyInfoFrame";
import MyServiceFrame from "./_atomic/MyServiceFrame";
import MyClubFrame from "./_atomic/MyClubFrame";

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
