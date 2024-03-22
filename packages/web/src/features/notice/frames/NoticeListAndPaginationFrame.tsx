"use client";

import React, { useEffect, useState } from "react";
import styled from "styled-components";

import {
  noticePerPage,
  indexPerPagination,
} from "@sparcs-clubs/web/constants/noticeList";
import NoticeList from "@sparcs-clubs/web/features/notice/componenets/NoticeList";
import NoticePagination from "@sparcs-clubs/web/features/notice/componenets/NoticePagination";

import type { NoticeInfo } from "@sparcs-clubs/web/features/notice/types/notice.type";

import mockupNoticePagination from "@sparcs-clubs/web/features/notice/types/mockupNoticeList";

const NoticeListAndPaginationFrameInner = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: center;
  row-gap: 20px;
`;

const NoticeListAndPaginationFrame = () => {
  const [totalPage, setTotalPage] = useState<number>(0);
  const [page, setPage] = useState<number>(11);
  const [noticeInfos, setNoticeInfos] = useState<Array<NoticeInfo>>([]);
  useEffect(() => {
    // api 준비되면 아래 로직을 추가하면 됩니다. 일단 로그로 대체해 두었습니다.
    setNoticeInfos(mockupNoticePagination.notices);
    setTotalPage(
      Math.floor(mockupNoticePagination.totalNotices / noticePerPage) + 1,
    );
    console.log(`page changed to ${page}`);
  }, [page]);

  return (
    <NoticeListAndPaginationFrameInner>
      <NoticeList infos={noticeInfos} />
      <NoticePagination
        totalPage={totalPage}
        currentPage={page}
        limit={indexPerPagination}
        setPage={setPage}
      />
    </NoticeListAndPaginationFrameInner>
  );
};

export default NoticeListAndPaginationFrame;
