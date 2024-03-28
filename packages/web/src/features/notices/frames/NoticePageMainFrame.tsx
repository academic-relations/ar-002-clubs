"use client";

import React from "react";
import styled from "styled-components";

import PageTitle from "@sparcs-clubs/web/common/components/PageTitle";

import NoticeListAndPaginationFrame from "@sparcs-clubs/web/features/notices/frames/NoticeListAndPaginationFrame";

const NoticePageMainFrameInner = styled.div`
  width: 100%;
  height: 100%;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  display: flex;
  flex-direction: column;
  row-gap: 60px;
`;

const NoticePageMainFrame = () => (
  <NoticePageMainFrameInner>
    <PageTitle>공지사항</PageTitle>
    <NoticeListAndPaginationFrame />
  </NoticePageMainFrameInner>
);

export default NoticePageMainFrame;
