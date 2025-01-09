import React from "react";

import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import Table from "@sparcs-clubs/web/common/components/Table";

interface ChargedChangeClubProps {
  clubId: number;
  clubNameKr: string;
  clubNameEn: string;
  prevExecutiveName: string;
  newChargedExecutiveId: number;
  newChargedExecutiveName: string;
}

const columnHelper = createColumnHelper<ChargedChangeClubProps>();
const columns = [
  columnHelper.accessor("clubNameKr", {
    header: "동아리",
    cell: info => info.getValue(),
    size: 100,
  }),
  columnHelper.accessor("prevExecutiveName", {
    header: "담당자",
    cell: info => info.getValue(),
    size: 100,
  }),
];

const ChargedChangeClubModalTable: React.FC<{
  data: ChargedChangeClubProps[];
}> = ({ data }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false,
  });

  return <Table table={table} />;
};

export default ChargedChangeClubModalTable;
