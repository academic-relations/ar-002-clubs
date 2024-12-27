"use client";

import React, { useMemo, useState } from "react";

import { hangulIncludes } from "es-hangul";

import styled from "styled-components";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Pagination from "@sparcs-clubs/web/common/components/Pagination";
import SearchInput from "@sparcs-clubs/web/common/components/SearchInput";
import StorageTable from "@sparcs-clubs/web/common/components/StorageTable";

import { useGetStorageApplications } from "../services/useGetStorageApplications";

const ClubSearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  align-self: stretch;
`;

const ClubSearch = styled.div`
  display: flex;
  align-items: flex-start;
  align-self: stretch;
`;

const TableWithPaginationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  align-self: stretch;
`;

export const ExecutiveStorage = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const limit = 10;
  const { data, isLoading, isError } = useGetStorageApplications({
    pageOffset: currentPage,
    itemCount: limit,
  });

  const [searchText, setSearchText] = useState<string>("");

  const filterClubsWithSearch = useMemo(() => {
    const filteredRowsWithSearch = data?.items.filter(
      item =>
        item.clubNameKr.toLowerCase().includes(searchText.toLowerCase()) ||
        item.clubNameEn.toLowerCase().includes(searchText.toLowerCase()) ||
        hangulIncludes(item.clubNameKr, searchText),
    );

    return {
      total: filteredRowsWithSearch?.length ?? 0,
      items:
        filteredRowsWithSearch?.slice(
          10 * (currentPage - 1),
          10 * currentPage,
        ) ?? [],
      offset: data?.offset ?? 0,
    };
  }, [searchText, currentPage, data]);

  const filterClubsWithoutSearch = useMemo(
    () => ({
      total: data?.items?.length ?? 0,
      items: data?.items?.slice(10 * (currentPage - 1), 10 * currentPage) ?? [],
      offset: data?.offset ?? 0,
    }),
    [currentPage, data],
  );

  const filteredClubs =
    searchText === "" ? filterClubsWithoutSearch : filterClubsWithSearch;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <AsyncBoundary isLoading={isLoading} isError={isError}>
      {data && filteredClubs && (
        <>
          <ClubSearchWrapper>
            <ClubSearch>
              <SearchInput
                searchText={searchText}
                handleChange={setSearchText}
                placeholder="동아리 이름으로 검색하세요"
              />
            </ClubSearch>
          </ClubSearchWrapper>
          <TableWithPaginationWrapper>
            <StorageTable storageList={filteredClubs} tableType="executive" />
            <FlexWrapper direction="row" gap={16} justify="center">
              <Pagination
                totalPage={Math.ceil(filteredClubs.total / limit)}
                currentPage={currentPage}
                limit={limit}
                setPage={handlePageChange}
              />
            </FlexWrapper>
          </TableWithPaginationWrapper>
        </>
      )}
    </AsyncBoundary>
  );
};
