"use client";

import React from "react";
import styled from "styled-components";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import MyInfoFrame from "./_atomic/MyInfoFrame";
import MyServiceFrame from "./_atomic/MyServiceFrame";
import MyClubFrame from "./_atomic/MyClubFrame";

const MyPageMainFrameInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

const MyPageMainFrame: React.FC = () => (
  <MyPageMainFrameInner>
    <PageHead
      items={[{ name: "마이페이지", path: "/my" }]}
      title="마이페이지"
    />
    <MyInfoFrame />
    <MyClubFrame />
    <MyServiceFrame />
  </MyPageMainFrameInner>
);

export default MyPageMainFrame;
