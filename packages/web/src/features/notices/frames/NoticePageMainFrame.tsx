"use client";

import styled from "styled-components";

import BreadCrumb from "@sparcs-clubs/web/common/components/BreadCrumb";
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

const PageHeadWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const NoticePageMainFrame = () => (
  <NoticePageMainFrameInner>
    <PageHeadWrapper>
      <BreadCrumb items={[{ name: "공지사항", path: "/notice" }]} />
      <PageTitle>공지사항</PageTitle>
    </PageHeadWrapper>
    <NoticeListAndPaginationFrame />
  </NoticePageMainFrameInner>
);

export default NoticePageMainFrame;
