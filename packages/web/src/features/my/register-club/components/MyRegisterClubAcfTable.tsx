import React from "react";

import { ApiAct011ResponseOk } from "@sparcs-clubs/interface/api/activity/endpoint/apiAct011";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import Table from "@sparcs-clubs/web/common/components/Table";
import Tag from "@sparcs-clubs/web/common/components/Tag";
import { ActTypeTagList } from "@sparcs-clubs/web/constants/tableTagList";
import { formatDate } from "@sparcs-clubs/web/utils/Date/formatDate";
import { getTagDetail } from "@sparcs-clubs/web/utils/getTagDetail";

interface MyRegisterClubAcfTableProps {
  clubRegisterAcfList: ApiAct011ResponseOk;
}

const columnHelper =
  createColumnHelper<ApiAct011ResponseOk["activities"][number]>();

const columns = [
  columnHelper.accessor("name", {
    id: "activityName",
    header: "활동명",
    cell: info => info.getValue(),
    size: 128,
  }),
  columnHelper.accessor("activityTypeEnumId", {
    id: "activityType",
    header: "분과",
    cell: info => {
      const { color, text } = getTagDetail(info.getValue(), ActTypeTagList);
      return <Tag color={color}>{text}</Tag>;
    },
    size: 128,
  }),

  columnHelper.accessor(
    row =>
      `${formatDate(row.duration.startTerm)} ~ ${formatDate(row.duration.endTerm)}`,
    {
      id: "activityPeriod",
      header: "활동 기간",
      cell: info => info.getValue(),
      size: 255,
    },
  ),
];

const MyRegisterClubAcfTable: React.FC<MyRegisterClubAcfTableProps> = ({
  clubRegisterAcfList,
}) => {
  const table = useReactTable({
    columns,
    data: clubRegisterAcfList.activities,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false,
  });

  return <Table table={table} />;
};

export default MyRegisterClubAcfTable;
