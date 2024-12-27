"use client";

import React, { useState } from "react";

import styled from "styled-components";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Pagination from "@sparcs-clubs/web/common/components/Pagination";
import StorageTable from "@sparcs-clubs/web/common/components/StorageTable";

import { useGetStorageApplications } from "../services/useGetStorageApplications";

const TableWithPaginationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  align-self: stretch;
`;

interface ManageClubTableMainFrameProps {
  clubId: number;
}

export const ManageClubStorageTableFrame: React.FC<
  ManageClubTableMainFrameProps
> = ({ clubId }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const limit = 10;
  const { data, isLoading, isError } = useGetStorageApplications({
    clubId,
    pageOffset: currentPage,
    itemCount: limit,
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <AsyncBoundary isLoading={isLoading} isError={isError}>
      {data && (
        <TableWithPaginationWrapper>
          <StorageTable storageList={data} tableType="manage-club" />
          <FlexWrapper direction="row" gap={16} justify="center">
            <Pagination
              totalPage={Math.ceil(data.total / limit)}
              currentPage={currentPage}
              limit={limit}
              setPage={handlePageChange}
            />
          </FlexWrapper>
        </TableWithPaginationWrapper>
      )}
    </AsyncBoundary>
  );
};
