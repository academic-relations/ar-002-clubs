"use client";

import React, { useState } from "react";
import styled from "styled-components";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import {
  noticePerPage,
  indexPerPagination,
} from "@sparcs-clubs/web/constants/noticeList";
import NoticeList from "@sparcs-clubs/web/features/notices/components/NoticeList";
import NoticePagination from "@sparcs-clubs/web/features/notices/components/NoticePagination";

import { getNotice } from "@sparcs-clubs/web/features/notices/services/getNotice";

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
  const [page, setPage] = useState<number>(1);
  const { data, isLoading, isError } = getNotice(page, noticePerPage);

  const totalPage = Math.floor((data?.totalPosts ?? 0) / noticePerPage) + 2;

  return (
    <AsyncBoundary isLoading={isLoading} isError={isError}>
      <NoticeListAndPaginationFrameInner>
        <NoticeList infos={data?.notices ?? []} />
        <NoticePagination
          totalPage={totalPage}
          currentPage={page}
          limit={indexPerPagination}
          setPage={setPage}
        />
      </NoticeListAndPaginationFrameInner>
    </AsyncBoundary>
  );
};

export default NoticeListAndPaginationFrame;
