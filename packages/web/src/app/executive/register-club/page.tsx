"use client";

import React, { useState } from "react";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import ExecutiveRegistrationTable from "@sparcs-clubs/web/common/components/ExecutiveRegistrationTable";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import Pagination from "@sparcs-clubs/web/common/components/Pagination";
import { mockRegisterClub } from "@sparcs-clubs/web/features/register-club/service/_mock/mockRegisterClub";

const RegisterClub = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  /* TODO : API로 데이터 받아오기 */
  const data = mockRegisterClub;
  const paginatedData = {
    total: data.total,
    items: data.items.slice((currentPage - 1) * limit, currentPage * limit),
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
          { name: "동아리 등록 신청 내역", path: `/executive/register-club` },
        ]}
        title="동아리 등록 신청 내역"
      />
      <AsyncBoundary isLoading={false} isError={false}>
        <ExecutiveRegistrationTable registerList={paginatedData} />
        <FlexWrapper direction="row" gap={16} justify="center">
          <Pagination
            totalPage={Math.ceil(data.total / limit)}
            currentPage={currentPage}
            limit={limit}
            setPage={handlePageChange}
          />
        </FlexWrapper>
      </AsyncBoundary>
    </FlexWrapper>
  );
};

export default RegisterClub;
