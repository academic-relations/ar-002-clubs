import React from "react";

import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import styled from "styled-components";

import Table from "@sparcs-clubs/web/common/components/Table";
import Tag, { type TagColor } from "@sparcs-clubs/web/common/components/Tag";
import Typography from "@sparcs-clubs/web/common/components/Typography";

import { formatDate } from "@sparcs-clubs/web/utils/Date/formatDate";

import { type PastActivityReport } from "../types/activityReport";

interface ActivityReportListProps {
  data: PastActivityReport[];
  showItemCount?: boolean;
}

const columnHelper = createColumnHelper<PastActivityReport>();

const getCategoryTagColor = (category: string): TagColor => {
  switch (category) {
    case "동아리 성격에 합치하는 내부 활동":
      return "ORANGE";
    case "동아리 성격에 합치하는 외부 활동":
      return "BLUE";
    case "동아리 성격에 합치하지 않는 활동":
      return "PURPLE";
    default:
      return "GRAY";
  }
};

const columns = [
  columnHelper.accessor("activity", {
    header: "활동명",
    cell: info => info.getValue(),
    size: 35,
  }),
  columnHelper.accessor("category", {
    header: "활동 분류",
    cell: info => (
      <Tag color={getCategoryTagColor(info.getValue())}>{info.getValue()}</Tag>
    ),
    size: 30,
  }),
  columnHelper.accessor(
    row => `${formatDate(row.startDate)} ~ ${formatDate(row.endDate)}`,
    {
      header: "활동 기간",
      cell: info => info.getValue(),
      size: 40,
    },
  ),
];

const TableOuter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-start;
  gap: 8px;
  align-self: stretch;
`;

const PastActivityReportList: React.FC<ActivityReportListProps> = ({
  data,
  showItemCount = true,
}) => {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false,
  });
  return (
    <TableOuter>
      {showItemCount && (
        <Typography
          fs={14}
          fw="REGULAR"
          lh={20}
          ff="PRETENDARD"
          color="GRAY.600"
        >
          총 {data.length}개
        </Typography>
      )}
      <Table table={table} />
    </TableOuter>
  );
};

export default PastActivityReportList;
