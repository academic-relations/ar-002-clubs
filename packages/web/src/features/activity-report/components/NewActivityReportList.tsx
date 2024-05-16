import React from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import Tag, { type TagColor } from "@sparcs-clubs/web/common/components/Tag";
import Table from "@sparcs-clubs/web/common/components/Table";
import TableCell from "@sparcs-clubs/web/common/components/Table/TableCell";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { type NewActivityReport } from "../types/activityReport";

interface ActivityReportListProps {
  data: NewActivityReport[];
}

const columnHelper = createColumnHelper<NewActivityReport>();

const getStatusTagColor = (category: string): TagColor => {
  switch (category) {
    case "작성중":
      return "BLUE";
    case "신청 완료":
      return "PURPLE";
    case "신청 반려":
      return "RED";
    case "승인 완료":
      return "GREEN";
    default:
      return "GRAY";
  }
};

const columns = [
  columnHelper.accessor(row => row.status, {
    id: "status",
    header: () => (
      <TableCell minWidth={116} width="15%" type="Header">
        상태
      </TableCell>
    ),
    cell: info => (
      <TableCell minWidth={116} width="15%" type="Default">
        <Tag color={getStatusTagColor(info.getValue())}>{info.getValue()}</Tag>
      </TableCell>
    ),
    enableSorting: false,
  }),
  columnHelper.accessor("activity", {
    id: "activity",
    header: () => (
      <TableCell width="30%" type="Header">
        활동명
      </TableCell>
    ),
    cell: info => (
      <TableCell width="30%" type="Default">
        {info.getValue()}
      </TableCell>
    ),
    enableSorting: false,
  }),
  columnHelper.accessor("category", {
    id: "category",
    header: () => (
      <TableCell minWidth={248} width="25%" type="Header">
        활동 분류
      </TableCell>
    ),
    cell: info => (
      <TableCell minWidth={248} width="25%" type="Default">
        <Tag color={getStatusTagColor(info.getValue())}>{info.getValue()}</Tag>
      </TableCell>
    ),
    enableSorting: false,
  }),
  columnHelper.accessor(
    row =>
      `${format(row.startDate, "yyyy년 M월 d일 (E)", { locale: ko })} ~ ${format(row.endDate, "yyyy년 M월 d일 (E)", { locale: ko })}`,
    {
      id: "date-range",
      header: () => (
        <TableCell minWidth={304} width="30%" type="Header">
          활동 기간
        </TableCell>
      ),
      cell: info => (
        <TableCell minWidth={304} width="30%" type="Default">
          {info.getValue()}
        </TableCell>
      ),
      enableSorting: false,
    },
  ),
];

const NewActivityReportList: React.FC<ActivityReportListProps> = ({ data }) => {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });
  return <Table table={table} />;
};

export default NewActivityReportList;
