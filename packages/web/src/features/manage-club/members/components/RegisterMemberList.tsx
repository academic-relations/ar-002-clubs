import React, { useState } from "react";

import styled from "styled-components";

import Pagination from "@sparcs-clubs/web/common/components/Pagination";
import MembersTable from "@sparcs-clubs/web/features/manage-club/components/MembersTable";
import { mockRegisterMembers } from "@sparcs-clubs/web/features/manage-club/members/frames/_mock/mockMembers";

const TableWithPagination = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  align-self: stretch;
`;

const RegisterMemberList = () => {
  const [page, setPage] = useState<number>(1);
  const totalPage = Math.ceil(mockRegisterMembers.members.length / 10);

  return (
    <TableWithPagination>
      <MembersTable memberList={mockRegisterMembers.members} />
      {totalPage !== 1 && (
        <Pagination
          totalPage={totalPage}
          currentPage={page}
          limit={10}
          setPage={setPage}
        />
      )}
    </TableWithPagination>
  );
};

export default RegisterMemberList;
