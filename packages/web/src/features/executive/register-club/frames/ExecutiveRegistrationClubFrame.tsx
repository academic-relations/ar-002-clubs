"use client";

import React, { useEffect, useState } from "react";

import styled from "styled-components";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import ExecutiveRegistrationTable from "@sparcs-clubs/web/common/components/ExecutiveRegistrationTable";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Pagination from "@sparcs-clubs/web/common/components/Pagination";
import { RegisterClubList } from "@sparcs-clubs/web/features/executive/register-club/services/_mock/mockRegisterClub";
import { useGetRegisterClub } from "@sparcs-clubs/web/features/executive/register-club/services/useGetRegisterClub";

const TableWithPaginationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  align-self: stretch;
`;

export const ExecutiveRegistrationClubFrame = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isError } = useGetRegisterClub({
    pageOffset: currentPage,
    itemCount: 10,
  });

  const [clubData, setClubData] = useState<RegisterClubList>({
    items: [],
    total: 0,
    offset: 0,
  });
  const [paginatedData, setPaginatedData] = useState<RegisterClubList>({
    items: [],
    total: 0,
    offset: 0,
  });

  useEffect(() => {
    if (!isLoading && data) {
      setClubData(data);
      setPaginatedData({
        total: data.total,
        items: data.items.slice((currentPage - 1) * limit, currentPage * limit),
        offset: (currentPage - 1) * limit,
      });
    }
  }, [isLoading, data, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <AsyncBoundary isLoading={isLoading} isError={isError}>
      <TableWithPaginationWrapper>
        <ExecutiveRegistrationTable registerList={paginatedData} />
        <FlexWrapper direction="row" gap={16} justify="center">
          <Pagination
            totalPage={Math.ceil(clubData.total / limit)}
            currentPage={currentPage}
            limit={limit}
            setPage={handlePageChange}
          />
        </FlexWrapper>
      </TableWithPaginationWrapper>
    </AsyncBoundary>
  );
};
