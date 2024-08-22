"use client";

import React, { useEffect, useState } from "react";

import styled from "styled-components";

import Custom404 from "@sparcs-clubs/web/app/not-found";
import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import ExecutiveRegistrationTable from "@sparcs-clubs/web/common/components/ExecutiveRegistrationTable";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import Pagination from "@sparcs-clubs/web/common/components/Pagination";
import { RegisterClubList } from "@sparcs-clubs/web/features/executive/register-club/services/_mock/mockRegisterClub";
import { useGetRegisterClub } from "@sparcs-clubs/web/features/executive/register-club/services/useGetRegisterClub";
import { useGetProfileNow } from "@sparcs-clubs/web/hooks/getProfileNow";

const ExeRegisterClub = () => {
  const profile = useGetProfileNow();

  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isError } = useGetRegisterClub({
    pageOffset: 10,
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
        total: data?.total,
        items: data?.items.slice(
          (currentPage - 1) * limit,
          currentPage * limit,
        ),
        offset: (currentPage - 1) * limit,
      });
    }
  }, [isLoading, data, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (profile !== "executive") {
    return <Custom404 />;
  }

  const TableWithPaginationWrapper = styled.div`
    display: flex;
  `;

  return (
    <FlexWrapper direction="column" gap={20}>
      <PageHead
        items={[
          { name: "집행부원 대시보드", path: "/executive" },
          { name: "동아리 등록 신청 내역", path: `/executive/register-club` },
        ]}
        title="동아리 등록 신청 내역"
      />
      <AsyncBoundary isLoading={isLoading} isError={isError}>
        {clubData.items.length !== 0 && (
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
        )}
      </AsyncBoundary>
    </FlexWrapper>
  );
};

export default ExeRegisterClub;
