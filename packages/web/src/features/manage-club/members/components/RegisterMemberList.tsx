import React, { useState } from "react";

import { ApiClb002ResponseOK } from "@sparcs-clubs/interface/api/club/endpoint/apiClb002";
import { ApiClb015ResponseOk } from "@sparcs-clubs/interface/api/club/endpoint/apiClb015";
import { ApiReg008ResponseOk } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg008";

import styled from "styled-components";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import Pagination from "@sparcs-clubs/web/common/components/Pagination";
import { useGetClubDetail } from "@sparcs-clubs/web/features/clubDetails/services/getClubDetail";
import MembersTable from "@sparcs-clubs/web/features/manage-club/components/MembersTable";
import { useGetMemberRegistration } from "@sparcs-clubs/web/features/manage-club/members/services/getClubMemberRegistration";
import { useGetMyManageClub } from "@sparcs-clubs/web/features/manage-club/services/getMyManageClub";

const TableWithPagination = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  align-self: stretch;
`;

const RegisterMemberList = () => {
  const [page, setPage] = useState<number>(1);

  const { data: idData } = useGetMyManageClub() as {
    data: ApiClb015ResponseOk;
    isLoading: boolean;
  };

  const { data: clubData } = useGetClubDetail(idData.clubId.toString()) as {
    data: ApiClb002ResponseOK;
    isLoading: boolean;
  };

  const {
    data: memberData,
    isLoading: memberIsLoading,
    isError: memberIsError,
  } = useGetMemberRegistration({ clubId: idData.clubId }) as {
    data: ApiReg008ResponseOk;
    isLoading: boolean;
    isError: boolean;
  };

  const totalPage = memberData && Math.ceil(memberData.applies.length / 10);

  return (
    <TableWithPagination>
      <AsyncBoundary isLoading={memberIsLoading} isError={memberIsError}>
        {clubData && memberData && (
          <MembersTable
            memberList={memberData.applies}
            clubName={clubData.name_kr}
            clubId={idData.clubId}
          />
        )}
        {totalPage !== 1 && (
          <Pagination
            totalPage={totalPage}
            currentPage={page}
            limit={10}
            setPage={setPage}
          />
        )}
      </AsyncBoundary>
    </TableWithPagination>
  );
};

export default RegisterMemberList;
