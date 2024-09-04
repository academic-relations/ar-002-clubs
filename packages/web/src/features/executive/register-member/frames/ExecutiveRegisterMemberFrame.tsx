"use client";

import React, { useState } from "react";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Pagination from "@sparcs-clubs/web/common/components/Pagination";
import RegistrationMemberTable from "@sparcs-clubs/web/common/components/RegisterMemberTable";

import { useGetMemberRegistration } from "@sparcs-clubs/web/features/executive/register-member/services/getMemberRegistration";

export const ExecutiveRegisterMember = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const limit = 10;
  const { data, isLoading, isError } = useGetMemberRegistration({
    pageOffset: currentPage,
    itemCount: 10,
  });

  const paginatedData = data && {
    total: data.total,
    items: data.items.slice((currentPage - 1) * limit, currentPage * limit),
    offset: (currentPage - 1) * limit,
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  return (
    <AsyncBoundary isLoading={isLoading} isError={isError}>
      {data && paginatedData && (
        <>
          <RegistrationMemberTable registerMemberList={paginatedData} />
          <FlexWrapper direction="row" gap={16} justify="center">
            <Pagination
              totalPage={Math.ceil(data.total / limit)}
              currentPage={currentPage}
              limit={limit}
              setPage={handlePageChange}
            />
          </FlexWrapper>
        </>
      )}
    </AsyncBoundary>
  );
};
