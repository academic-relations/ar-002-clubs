"use client";

import React from "react";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import MyClubFrame from "@sparcs-clubs/web/features/my/frame/MyClubFrame";
import MyInfoFrame from "@sparcs-clubs/web/features/my/frame/MyInfoFrame";
import MyServiceFrame from "@sparcs-clubs/web/features/my/frame/MyServiceFrame";

const My: React.FC = () => (
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
export default My;
