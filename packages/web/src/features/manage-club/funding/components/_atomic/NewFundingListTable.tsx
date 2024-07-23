import React from "react";

import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import Table from "@sparcs-clubs/web/common/components/Table";
import TableCell from "@sparcs-clubs/web/common/components/Table/TableCell";
import { TableRow } from "@sparcs-clubs/web/common/components/Table/TableWrapper";
import Tag from "@sparcs-clubs/web/common/components/Tag";

import { numberToKrWon } from "@sparcs-clubs/web/constants/manageClubFunding";

import type { TagColor } from "@sparcs-clubs/web/common/components/Tag";

const getTagDetail = (status: string): { color: TagColor; text: string } => {
  switch (status) {
    case "신청":
      return { color: "BLUE", text: "신청" };
    case "운위":
      return { color: "YELLOW", text: "운위" };
    case "반려":
      return { color: "RED", text: "반려" };
    case "승인":
      return { color: "GREEN", text: "승인" };
    default:
      return { color: "RED", text: "알 수 없음" };
  }
};

const columnHelper = createColumnHelper<{
  id: number;
  status: string;
  activityName: string;
  contentName: string;
  expenditureAmount: number;
  approvedAmount?: number;
}>();

const columns = [
  columnHelper.accessor("status", {
    header: "상태",
    cell: info => {
      const { color, text } = getTagDetail(info.getValue());
      return <Tag color={color}>{text}</Tag>;
    },
    size: 10,
  }),
  columnHelper.accessor("activityName", {
    header: "활동명",
    cell: info => info.getValue(),
    size: 45,
  }),
  columnHelper.accessor("contentName", {
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

const mockData = [
  {
    id: 1,
    status: "신청",
    activityName: "개발개발한 어떠한 활동",
    contentName: "모니터",
    expenditureAmount: 300000,
  },
  {
    id: 2,
    status: "신청",
    activityName: "개발개발한 어떠한 활동",
    contentName: "모니터",
    expenditureAmount: 300000,
  },
  {
    id: 3,
    status: "운위",
    activityName: "개발개발한 어떠한 활동",
    contentName: "모니터",
    expenditureAmount: 300000,
  },
  {
    id: 4,
    status: "반려",
    activityName: "개발개발한 어떠한 활동",
    contentName: "모니터",
    expenditureAmount: 300000,
  },
  {
    id: 5,
    status: "승인",
    activityName: "개발개발한 어떠한 활동",
    contentName: "모니터",
    expenditureAmount: 300000,
    approvedAmount: 300000,
  },
  {
    id: 6,
    status: "승인",
    activityName: "개발개발한 어떠한 활동",
    contentName: "모니터",
    expenditureAmount: 300000,
    approvedAmount: 0,
  },
];

const NewFundingListTable: React.FC = () => {
  const table = useReactTable({
    columns,
    data: mockData,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false,
  });

  return (
    <Table
      table={table}
      count={mockData.length}
      footer={
        <TableRow>
          <TableCell type="Default" width="70%">
            {"\t"}
          </TableCell>
          <TableCell type="Default" width="15%">
            {numberToKrWon(
              mockData.reduce((acc, data) => acc + data.expenditureAmount, 0),
            )}
          </TableCell>
          <TableCell type="Default" width="15%">
            {numberToKrWon(
              mockData.reduce(
                (acc, data) => acc + (data.approvedAmount ?? 0),
                0,
              ),
            )}
          </TableCell>
        </TableRow>
      }
    />
  );
};

export default NewFundingListTable;
