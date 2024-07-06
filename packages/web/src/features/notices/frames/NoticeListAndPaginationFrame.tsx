"use client";

import React, { useState } from "react";

import styled from "styled-components";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import Pagination from "@sparcs-clubs/web/common/components/Pagination";
import {
  indexPerPagination,
  noticePerPage,
} from "@sparcs-clubs/web/constants/noticeList";
import NoticeList from "@sparcs-clubs/web/features/notices/components/NoticeList";
import { useGetNotice } from "@sparcs-clubs/web/features/notices/services/useGetNotice";

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
  const { data, isLoading, isError } = useGetNotice(page, noticePerPage);

  const totalPage = Math.floor((data?.total ?? 0) / noticePerPage) + 1;

  return (
    <AsyncBoundary isLoading={isLoading} isError={isError}>
      <NoticeListAndPaginationFrameInner>
        <NoticeList infos={data?.notices ?? []} />
        <Pagination
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
