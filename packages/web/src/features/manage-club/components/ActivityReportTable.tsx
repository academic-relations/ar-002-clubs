import React from "react";

import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import Table from "@sparcs-clubs/web/common/components/Table";
import Tag from "@sparcs-clubs/web/common/components/Tag";
import {
  ActTypeTagList,
  ApplyTagList,
  ProfessorApprovalTagList,
} from "@sparcs-clubs/web/constants/tableTagList";
import { formatDate } from "@sparcs-clubs/web/utils/Date/formatDate";
import { getTagDetail } from "@sparcs-clubs/web/utils/getTagDetail";

import { type Activity } from "../services/_mock/mockManageClub";

interface ActivityTableProps {
  activityList: Activity[];
}

const columnHelper = createColumnHelper<Activity>();

const columns = [
  columnHelper.accessor("status", {
    header: "상태",
    cell: info => {
      const { color, text } = getTagDetail(info.getValue(), ApplyTagList);
      return <Tag color={color}>{text}</Tag>;
    },
    size: 0,
  }),
  columnHelper.accessor("professorApproval", {
    header: "지도교수",
    cell: info => {
      const { color, text } = getTagDetail(
        info.getValue(),
        ProfessorApprovalTagList,
      );
      return <Tag color={color}>{text}</Tag>;
    },
    size: 0,
  }),
  columnHelper.accessor("name", {
    header: "활동명",
    cell: info => info.getValue(),
    size: 20,
  }),
  columnHelper.accessor("type", {
    header: "활동 분류",
    cell: info => {
      const { color, text } = getTagDetail(info.getValue(), ActTypeTagList);
      return <Tag color={color}>{text}</Tag>;
    },
    size: 32,
  }),
  columnHelper.accessor(
    row => `${formatDate(row.startDate)} ~ ${formatDate(row.endDate)}`,
    {
      id: "date-range",
      header: "활동 기간",
      cell: info => info.getValue(),
      size: 48,
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
