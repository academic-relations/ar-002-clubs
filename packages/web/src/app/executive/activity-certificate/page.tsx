"use client";

import React, { useState } from "react";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import Pagination from "@sparcs-clubs/web/common/components/Pagination";
import { mockExecutiveAcf } from "@sparcs-clubs/web/features/executive/_mock/mockExecutiveAcf";
import ExecutiveAcfTable from "@sparcs-clubs/web/features/executive/activity-certificate/components/ExecutiveAcfTable";

const ActivityCertificate = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  /* TODO - API 연결 */
  const paginatedData = {
    total: mockExecutiveAcf.total,
    items: mockExecutiveAcf.items.slice(
      (currentPage - 1) * limit,
      currentPage * limit,
    ),
    offset: (currentPage - 1) * limit,
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <FlexWrapper direction="column" gap={20}>
      <PageHead
        items={[
          { name: "집행부원 대시보드", path: "/executive" },
          {
            name: "활동 확인서 발급 내역",
            path: `/executive/activity-certificate`,
          },
        ]}
        title="활동 확인서 발급 내역"
      />
      <AsyncBoundary isLoading={false} isError={false}>
        <ExecutiveAcfTable acfList={paginatedData} />
        <FlexWrapper direction="row" gap={16} justify="center">
          <Pagination
            totalPage={Math.ceil(mockExecutiveAcf.total / limit)}
            currentPage={currentPage}
            limit={limit}
            setPage={handlePageChange}
          />
        </FlexWrapper>
      </AsyncBoundary>
    </FlexWrapper>
  );
};

export default ActivityCertificate;
