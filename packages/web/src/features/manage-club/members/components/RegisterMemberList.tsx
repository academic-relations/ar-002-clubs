import React, { useState } from "react";

import styled from "styled-components";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Pagination from "@sparcs-clubs/web/common/components/Pagination";
import TableButtonCell from "@sparcs-clubs/web/common/components/Table/TableButtonCell";
import TableCell from "@sparcs-clubs/web/common/components/Table/TableCell";
import Tag from "@sparcs-clubs/web/common/components/Tag";
import Typography from "@sparcs-clubs/web/common/components/Typography";

const TableWithPaginationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

const TableWithCount = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  width: 100%;
`;

const TableWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0px;
  border-radius: 8px;
  width: 100%;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.GRAY[300]};
`;

const RegisterMemberList = () => {
  const [page, setPage] = useState<number>(1);

  return (
    <TableWithPaginationWrapper>
      <TableWithCount>
        <Typography
          fs={16}
          fw="REGULAR"
          lh={20}
          ff="PRETENDARD"
          color="GRAY.600"
        >
          총 00명
        </Typography>
        <TableWrapper>
          <FlexWrapper direction="row" gap={0}>
            <TableCell type="HeaderSort" width="10%">
              상태
            </TableCell>
            <TableCell type="HeaderSort" width="20%">
              신청일시
            </TableCell>
            <TableCell type="HeaderSort" width="10%">
              학번
            </TableCell>
            <TableCell type="HeaderSort" width="10%">
              신청자
            </TableCell>
            <TableCell type="Header" width="15%">
              전화번호
            </TableCell>
            <TableCell type="Header" width="20%">
              이메일
            </TableCell>
            <TableCell type="Header" width="15%">
              비고
            </TableCell>
          </FlexWrapper>
          <FlexWrapper direction="row" gap={0}>
            <TableCell type="Tag" width="10%">
              <Tag>신청</Tag>
            </TableCell>
            <TableCell type="Default" width="20%">
              신청일시
            </TableCell>
            <TableCell type="Default" width="10%">
              학번
            </TableCell>
            <TableCell type="Default" width="10%">
              신청자
            </TableCell>
            <TableCell type="Default" width="15%">
              전화번호
            </TableCell>
            <TableCell type="Default" width="20%">
              이메일
            </TableCell>
            <TableButtonCell
              text={["승인", "반려"]}
              onClick={[() => {}, () => {}]}
              // TODO: 승인 반려 onClick 기능 넣기
            />
          </FlexWrapper>
        </TableWrapper>
      </TableWithCount>
      <Pagination
        totalPage={10}
        currentPage={page}
        limit={10}
        setPage={setPage}
      />
    </TableWithPaginationWrapper>
  );
};

export default RegisterMemberList;
