"use client";

import React, { useState } from "react";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Pagination from "@sparcs-clubs/web/common/components/Pagination";
import RegistrationMemberTable from "@sparcs-clubs/web/common/components/RegisterMemberTable";
import mockupRegistrationMember from "@sparcs-clubs/web/features/executive/_mock/mockupMemberRegistration";

export const ExecutiveRegisterMember = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  /* TODO : API로 데이터 받아오기 */
  const paginatedData = {
    total: mockupRegistrationMember.total,
    items: mockupRegistrationMember.items.slice(
      (currentPage - 1) * limit,
      currentPage * limit,
    ),
    offset: (currentPage - 1) * limit,
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <AsyncBoundary isLoading={false} isError={false}>
      <RegistrationMemberTable registerMemberList={paginatedData} />
      <FlexWrapper direction="row" gap={16} justify="center">
        <Pagination
          totalPage={Math.ceil(mockupRegistrationMember.total / limit)}
          currentPage={currentPage}
          limit={limit}
          setPage={handlePageChange}
        />
      </FlexWrapper>
    </AsyncBoundary>
  );
};
