"use client";

import React from "react";

import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import styled from "styled-components";

import Table from "@sparcs-clubs/web/common/components/Table";

import TableCell from "@sparcs-clubs/web/common/components/Table/TableCell";
import { TableRow } from "@sparcs-clubs/web/common/components/Table/TableWrapper";
import { numberToKrWon } from "@sparcs-clubs/web/constants/manageClubFunding";

import { PastFundingData } from "@sparcs-clubs/web/features/manage-club/funding/types/funding";

const TableWithCount = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  width: 100%;
`;

const CountRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};
  color: ${({ theme }) => theme.colors.GRAY[600]};
`;

const columnHelper = createColumnHelper<PastFundingData>();

const columns = [
  columnHelper.accessor("activityName", {
    header: "활동명",
    cell: info => info.getValue(),
    size: 55,
  }),
  columnHelper.accessor("name", {
    header: "항목명",
    cell: info => info.getValue(),
    size: 15,
  }),
  columnHelper.accessor("expenditureAmount", {
    header: "신청 금액",
    cell: info => `${info.getValue().toLocaleString("ko-KR")}원`,
    size: 15,
  }),
  columnHelper.accessor("approvedAmount", {
    header: "승인 금액",
    cell: info =>
      info.getValue() === undefined
        ? "-"
        : `${(info.getValue() ?? 0).toLocaleString("ko-KR")}원`,
    size: 15,
  }),
];

const PastFundingListTable: React.FC<{ data: PastFundingData[] }> = ({
  data: fundings,
}) => {
  const router = useRouter();

  const table = useReactTable({
    columns,
    data: fundings,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false,
  });

  return (
    <TableWithCount>
      <CountRow>총 {fundings.length}개</CountRow>
      <Table
        table={table}
        onClick={row => router.push(`/manage-club/funding/${row.id}`)}
        footer={
          <TableRow>
            <TableCell type="Default" width="70%">
              {"\t"}
            </TableCell>
            <TableCell type="Default" width="15%">
              {numberToKrWon(
                fundings.reduce((acc, data) => acc + data.expenditureAmount, 0),
              )}
            </TableCell>
            <TableCell type="Default" width="15%">
              {numberToKrWon(
                fundings.reduce(
                  (acc, data) => acc + (data.approvedAmount ?? 0),
                  0,
                ),
              )}
            </TableCell>
          </TableRow>
        }
      />
    </TableWithCount>
  );
};

export default PastFundingListTable;
