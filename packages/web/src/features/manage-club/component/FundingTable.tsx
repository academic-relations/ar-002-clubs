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
import { ApplyTagList } from "@sparcs-clubs/web/constants/tableTagList";
import { getTagDetail } from "@sparcs-clubs/web/utils/getTagDetail";

import { type Funding } from "../service/_mock/mockManageClub";

interface FundingTableProps {
  fundingList: Funding[];
}

const columnHelper = createColumnHelper<Funding>();

const columns = [
  columnHelper.accessor("status", {
    id: "status",
    header: "상태",
    cell: info => {
      const { color, text } = getTagDetail(info.getValue(), ApplyTagList);
      return <Tag color={color}>{text}</Tag>;
    },
    size: 10,
  }),
  columnHelper.accessor("name", {
    id: "name",
    header: "활동명",
    cell: info => info.getValue(),
    size: 40,
  }),
  columnHelper.accessor("itemName", {
    id: "itemName",
    header: "항목명",
    cell: info => info.getValue(),
    size: 20,
  }),
  columnHelper.accessor("requestedAmount", {
    id: "requestedAmount",
    header: "신청 금액",
    cell: info => `${info.getValue().toLocaleString()}원`,
    size: 15,
  }),
  columnHelper.accessor("approvedAmount", {
    id: "approvedAmount",
    header: "승인 금액",
    cell: info =>
      info.getValue() === null ? "-" : `${info.getValue()?.toLocaleString()}원`,
    size: 15,
  }),
];

const FundingTable: React.FC<FundingTableProps> = ({ fundingList }) => {
  const totalRequested = fundingList.reduce(
    (sum, funding) => sum + funding.requestedAmount,
    0,
  );
  const totalApproved = fundingList.reduce(
    (sum, funding) =>
      sum + (funding.approvedAmount === null ? 0 : funding.approvedAmount),
    0,
  );

  const table = useReactTable({
    columns,
    data: fundingList,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false,
  });

  return (
    <Table
      table={table}
      footer={
        <TableRow>
          <TableCell type="Default" width="70%">
            {" "}
          </TableCell>
          <TableCell type="Default" width="15%">
            {totalRequested.toLocaleString()}원
          </TableCell>
          <TableCell type="Default" width="15%">
            {totalApproved === null
              ? "-"
              : `${totalApproved.toLocaleString()}원`}
          </TableCell>
        </TableRow>
      }
    />
  );
};

export default FundingTable;
