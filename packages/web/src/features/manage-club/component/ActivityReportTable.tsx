import React from "react";

import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import Table from "@sparcs-clubs/web/common/components/Table";
import Tag, { type TagColor } from "@sparcs-clubs/web/common/components/Tag";
import {
  ActTypeTagList,
  ApplyTagList,
} from "@sparcs-clubs/web/constants/tableTagList";
import { formatDate } from "@sparcs-clubs/web/utils/Date/formateDate";
import { getTagDetail } from "@sparcs-clubs/web/utils/getTagDetail";

import { type Activity } from "../service/_mock/mockManageClub";

interface ActivityTableProps {
  activityList: Activity[];
}

const getProfessorApprovalTagColor = (professorApproval: string): TagColor => {
  switch (professorApproval) {
    case "대기":
      return "GRAY";
    default:
      return "GRAY";
  }
};

const columnHelper = createColumnHelper<Activity>();

const columns = [
  columnHelper.accessor("status", {
    header: "상태",
    cell: info => {
      const { color, text } = getTagDetail(info.getValue(), ApplyTagList);
      return <Tag color={color}>{text}</Tag>;
    },
    size: 8,
  }),
  columnHelper.accessor("professorApproval", {
    header: "지도교수",
    cell: info => (
      <Tag color={getProfessorApprovalTagColor(info.getValue())}>
        {info.getValue()}
      </Tag>
    ),
    size: 8,
  }),
  columnHelper.accessor("name", {
    header: "활동명",
    cell: info => info.getValue(),
    size: 30,
  }),
  columnHelper.accessor("type", {
    header: "활동 분류",
    cell: info => {
      const { color, text } = getTagDetail(info.getValue(), ActTypeTagList);
      return <Tag color={color}>{text}</Tag>;
    },
    size: 25,
  }),
  columnHelper.accessor(
    row => `${formatDate(row.startDate)} ~ ${formatDate(row.endDate)}`,
    {
      id: "date-range",
      header: "활동 기간",
      cell: info => info.getValue(),
      size: 35,
    },
  ),
];

const ActivityReportTable: React.FC<ActivityTableProps> = ({
  activityList,
}) => {
  const table = useReactTable({
    columns,
    data: activityList,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false,
  });

  return <Table table={table} />;
};

export default ActivityReportTable;
