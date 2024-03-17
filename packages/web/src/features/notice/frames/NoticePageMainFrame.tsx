"use client";

import React from "react";
import styled from "styled-components";

import PageTitle from "@sparcs-clubs/web/common/components/PageTitle";

import NoticeListAndPagenationFrame from "@sparcs-clubs/web/features/notice/frames/NoticeListAndPagenationFrame";

const NoticePageMainFrameInner = styled.div`
  width: 100%;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  display: flex;
  flex-direction: column;
  row-gap: 60px;
`;

const NoticePageMainFrame = () => (
  <NoticePageMainFrameInner>
    <PageTitle>동아리 목록</PageTitle>
    <NoticeListAndPagenationFrame />
  </NoticePageMainFrameInner>
);

export default NoticePageMainFrame;
