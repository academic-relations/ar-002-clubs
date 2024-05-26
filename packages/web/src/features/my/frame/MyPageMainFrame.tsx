"use client";

import BreadCrumb from "@sparcs-clubs/web/common/components/BreadCrumb";
import PageTitle from "@sparcs-clubs/web/common/components/PageTitle";
import React from "react";
import styled from "styled-components";
import MyInfoFrame from "./_atomic/MyInfoFrame";
import MyServiceFrame from "./_atomic/MyServiceFrame";
import MyClubFrame from "./_atomic/MyClubFrame";

const MyPageMainFrameInner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
`;

const PageHeadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const MyPageMainFrame: React.FC = () => (
  <MyPageMainFrameInner>
    <PageHeadWrapper>
      <BreadCrumb items={[{ name: "마이페이지", path: "/my" }]} />
      <PageTitle>마이페이지</PageTitle>
    </PageHeadWrapper>
    <MyInfoFrame />
    <MyClubFrame />
    <MyServiceFrame />
  </MyPageMainFrameInner>
);

export default MyPageMainFrame;
