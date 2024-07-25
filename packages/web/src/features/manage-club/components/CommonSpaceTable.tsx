import React from "react";

import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import Table from "@sparcs-clubs/web/common/components/Table";
import Tag from "@sparcs-clubs/web/common/components/Tag";
import { CmsTagList } from "@sparcs-clubs/web/constants/tableTagList";
import {
  formatDate,
  formatDateTime,
  formatTime,
} from "@sparcs-clubs/web/utils/Date/formateDate";
import { getTagDetail } from "@sparcs-clubs/web/utils/getTagDetail";

import type { ApiCms006ResponseOk } from "@sparcs-clubs/interface/api/common-space/endpoint/apiCms006";

interface CommonSpaceTableProps {
  spaceList: ApiCms006ResponseOk;
}

const columnHelper = createColumnHelper<ApiCms006ResponseOk["items"][number]>();

const columns = [
  columnHelper.accessor("statusEnum", {
    id: "status",
    header: "상태",
    cell: info => {
      const { color, text } = getTagDetail(info.getValue(), CmsTagList);
      return <Tag color={color}>{text}</Tag>;
    },
    size: 10,
  }),
  columnHelper.accessor("createdAt", {
    id: "createdAt",
    header: "신청 일시",
    cell: info => formatDateTime(info.getValue()),
    size: 20,
  }),
  columnHelper.accessor("chargeStudentName", {
    id: "chargeStudentName",
    header: "신청자",
    cell: info => info.getValue(),
    size: 10,
  }),
  columnHelper.accessor("startTerm", {
    id: "startTerm",
    header: "예약 일자",
    cell: info => formatDate(info.getValue()),
    size: 16,
  }),
  columnHelper.accessor(
    row => `${formatTime(row.startTerm)} ~ ${formatTime(row.endTerm)}`,
    {
      id: "time-range",
      header: "예약 시간",
      cell: info => info.getValue(),
      size: 16,
    },
  ),
  columnHelper.accessor("spaceName", {
    id: "spaceName",
    header: "예약 호실",
    cell: info => info.getValue(),
    size: 28,
  }),
];

const CommonSpaceTable: React.FC<CommonSpaceTableProps> = ({ spaceList }) => {
  const table = useReactTable({
    columns,
    data: spaceList.items,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false,
  });

  return <Table table={table} />;
};

export default CommonSpaceTable;