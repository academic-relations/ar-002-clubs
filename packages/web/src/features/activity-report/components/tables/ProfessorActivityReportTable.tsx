import React from "react";

import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useRouter } from "next/navigation";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import Table from "@sparcs-clubs/web/common/components/Table";
import Tag from "@sparcs-clubs/web/common/components/Tag";

import {
  ActTypeTagList,
  ApplyTagList,
  ProfessorApprovalTagList,
} from "@sparcs-clubs/web/constants/tableTagList";

import useGetProfessorManageClubActivityReportList from "@sparcs-clubs/web/features/activity-report/hooks/useGetProfessorManageClubActivityReportList";
import { ProfessorActivityReportTableData } from "@sparcs-clubs/web/features/activity-report/types/table";

import { formatDate } from "@sparcs-clubs/web/utils/Date/formatDate";
import { getTagDetail } from "@sparcs-clubs/web/utils/getTagDetail";

interface ProfessorActivityReportTableProps {
  clubId: number;
}

const columnHelper = createColumnHelper<ProfessorActivityReportTableData>();
const columns = [
  columnHelper.accessor("activityStatusEnumId", {
    header: "상태",
    cell: info => {
      const { color, text } = getTagDetail(info.getValue(), ApplyTagList);
      return <Tag color={color}>{text}</Tag>;
    },
    size: 0,
  }),
  columnHelper.accessor("professorApproval", {
    id: "professorApproval",
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
    id: "activity",
    header: "활동명",
    cell: info => info.getValue(),
    size: 20,
  }),
  columnHelper.accessor("activityTypeEnumId", {
    header: "활동 분류",
    cell: info => {
      const { color, text } = getTagDetail(info.getValue(), ActTypeTagList);
      return <Tag color={color}>{text}</Tag>;
    },
    size: 32,
  }),
  columnHelper.accessor(
    row =>
      `${formatDate(row.durations[0].startTerm)} ~ ${formatDate(row.durations[0].endTerm)}${row.durations.length > 1 ? ` 외 ${row.durations.length - 1}개` : ""}`,
    {
      id: "date-range",
      header: "활동 기간",
      cell: info => info.getValue(),
      size: 48,
    },
  ),
];

const ProfessorActivityReportTable: React.FC<
  ProfessorActivityReportTableProps
> = ({ clubId }) => {
  const { data, isLoading, isError } =
    useGetProfessorManageClubActivityReportList(clubId);
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false,
  });
  const router = useRouter();

  if (!data) return null;

  return (
    <AsyncBoundary isLoading={isLoading} isError={isError}>
      <Table
        table={table}
        count={data.length}
        onClick={row => router.push(`/manage-club/activity-report/${row.id}`)}
      />
    </AsyncBoundary>
  );
};

export default ProfessorActivityReportTable;
