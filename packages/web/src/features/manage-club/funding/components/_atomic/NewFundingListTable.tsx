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

import { FundingTagList } from "@sparcs-clubs/web/constants/tableTagList";
import { NewFundingData } from "@sparcs-clubs/web/features/manage-club/funding/types/funding";
import { getTagDetail } from "@sparcs-clubs/web/utils/getTagDetail";

interface NewFundingListTableProps {
  newFundingList?: NewFundingData[];
}

const columnHelper = createColumnHelper<NewFundingData>();

const columns = [
  columnHelper.accessor("fundingStatusEnum", {
    header: "상태",
    cell: info => {
      const { color, text } = getTagDetail(info.getValue(), FundingTagList);
      return <Tag color={color}>{text}</Tag>;
    },
    size: 10,
  }),
  columnHelper.accessor("activityName", {
    header: "활동명",
    cell: info => info.getValue(),
    size: 45,
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

const NewFundingListTable: React.FC<NewFundingListTableProps> = ({
  newFundingList = [],
}) => {
  const table = useReactTable({
    columns,
    data: newFundingList,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false,
  });

  return (
    <Table
      table={table}
      count={newFundingList.length}
      footer={
        <TableRow>
          <TableCell type="Default" width="70%">
            {"\t"}
          </TableCell>
          <TableCell type="Default" width="15%">
            {numberToKrWon(
              newFundingList.reduce(
                (acc, data) => acc + data.expenditureAmount,
                0,
              ),
            )}
          </TableCell>
          <TableCell type="Default" width="15%">
            {numberToKrWon(
              newFundingList.reduce(
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
