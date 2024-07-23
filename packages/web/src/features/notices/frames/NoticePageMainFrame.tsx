"use client";

import styled from "styled-components";

import PageHead from "@sparcs-clubs/web/common/components/PageHead";
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
    <PageHead
      items={[{ name: "공지사항", path: "/notice" }]}
      title="공지사항"
    />
    <NoticeListAndPaginationFrame />
  </NoticePageMainFrameInner>
);

export default NoticePageMainFrame;
