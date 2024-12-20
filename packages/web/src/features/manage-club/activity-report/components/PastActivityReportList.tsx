import React from "react";

import { ApiAct006ResponseOk } from "@sparcs-clubs/interface/api/activity/endpoint/apiAct006";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import styled from "styled-components";

import AsyncBoundary from "@sparcs-clubs/web/common/components/AsyncBoundary";
import FoldableSection from "@sparcs-clubs/web/common/components/FoldableSection";
import Table from "@sparcs-clubs/web/common/components/Table";
import Tag from "@sparcs-clubs/web/common/components/Tag";

import { ActTypeTagList } from "@sparcs-clubs/web/constants/tableTagList";

import { formatDate } from "@sparcs-clubs/web/utils/Date/formatDate";

import { getTagDetail } from "@sparcs-clubs/web/utils/getTagDetail";

import useGetActivityReportListForATerm from "../services/useGetActivityReportListForATerm";
import { ActivityTerm } from "../types/activityReport";

interface ActivityReportListProps {
  term: ActivityTerm;
  clubId: number;
}

const columnHelper =
  createColumnHelper<ApiAct006ResponseOk["activities"][number]>();

const columns = [
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
    row => `${formatDate(row.startTerm)} ~ ${formatDate(row.endTerm)}`,
    {
      id: "date-range",
      header: "활동 기간",
      cell: info => info.getValue(),
      size: 48,
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
  term,
  clubId,
}) => {
  const router = useRouter();
  const { data, isLoading, isError } = useGetActivityReportListForATerm(
    term.id,
    { clubId },
  );
  const table = useReactTable({
    columns,
    data: data?.activities ?? [],
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false,
  });

  return (
    <AsyncBoundary isLoading={isLoading} isError={isError}>
      <FoldableSection
        key={term.id}
        title={`${term.year}년 ${term.name}학기 (총 ${data?.activities.length}개)`}
      >
        <TableOuter>
          <Table
            table={table}
            onClick={row =>
              router.push(`/manage-club/activity-report/${row.id}`)
            }
            count={data?.activities.length}
          />
        </TableOuter>
      </FoldableSection>
    </AsyncBoundary>
  );
};

export default PastActivityReportList;
