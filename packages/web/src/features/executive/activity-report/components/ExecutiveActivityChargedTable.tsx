import React, { useMemo } from "react";

import { ApiAct023ResponseOk } from "@sparcs-clubs/interface/api/activity/endpoint/apiAct023";
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

import TextButton from "@sparcs-clubs/web/common/components/Buttons/TextButton";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Table from "@sparcs-clubs/web/common/components/Table";
import Typography from "@sparcs-clubs/web/common/components/Typography";

interface ExecutiveActivityChargedTableProps {
  activities: ApiAct023ResponseOk;
  searchText: string;
}

const columnHelper =
  createColumnHelper<ApiAct023ResponseOk["executiveProgresses"][number]>();
const columns = [
  columnHelper.accessor("executiveName", {
    header: "담당자",
    cell: info => info.getValue(),
    size: 200,
  }),
  columnHelper.accessor(
    row => {
      const { chargedClubsAndProgresses } = row;
      const clubName = chargedClubsAndProgresses[0]?.clubNameKr;
      if (!clubName) return "-";
      if (chargedClubsAndProgresses.length > 1) {
        return `${clubName} 외 ${chargedClubsAndProgresses.length - 1}개`;
      }
      return clubName;
    },
    {
      header: "동아리",
      cell: info => info.getValue(),
      size: 200,
    },
  ),
  columnHelper.accessor(
    row => {
      const { chargedClubsAndProgresses } = row;
      const pendingActivitiesCount = chargedClubsAndProgresses.reduce(
        (acc, item) => acc + item.pendingActivitiesCount,
        0,
      );
      const approvedActivitiesCount = chargedClubsAndProgresses.reduce(
        (acc, item) => acc + item.approvedActivitiesCount,
        0,
      );
      const rejectedActivitiesCount = chargedClubsAndProgresses.reduce(
        (acc, item) => acc + item.rejectedActivitiesCount,
        0,
      );
      const total =
        pendingActivitiesCount +
        approvedActivitiesCount +
        rejectedActivitiesCount;
      const reviewed = approvedActivitiesCount + rejectedActivitiesCount;
      const reviewRate = total ? (reviewed / total) * 100 : 0;
      if (total === 0) return "-";
      return `${reviewRate.toFixed(2)}% (${reviewed} / ${total})`;
    },
    {
      header: "검토율 (검토 / 전체)",
      cell: info => info.getValue(),
      size: 200,
    },
  ),
  columnHelper.accessor(
    row => {
      const { chargedClubsAndProgresses } = row;
      const pendingActivitiesCount = chargedClubsAndProgresses.reduce(
        (acc, item) => acc + item.pendingActivitiesCount,
        0,
      );
      const approvedActivitiesCount = chargedClubsAndProgresses.reduce(
        (acc, item) => acc + item.approvedActivitiesCount,
        0,
      );
      const rejectedActivitiesCount = chargedClubsAndProgresses.reduce(
        (acc, item) => acc + item.rejectedActivitiesCount,
        0,
      );
      const total =
        pendingActivitiesCount +
        approvedActivitiesCount +
        rejectedActivitiesCount;
      const approvedRate = total ? (approvedActivitiesCount / total) * 100 : 0;
      if (total === 0) return "-";
      return `${approvedRate.toFixed(2)}% (${approvedActivitiesCount} / ${total})`;
    },
    {
      header: "승인율 (승인 / 전체)",
      cell: info => info.getValue(),
      size: 200,
    },
  ),
  columnHelper.accessor("executiveId", {
    header: "상태",
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    cell: info => <TextButton text="보기" />,
    size: 125,
  }),
];

const ExecutiveActivityChargedTable: React.FC<
  ExecutiveActivityChargedTableProps
> = ({ activities, searchText }) => {
  const sortedActivities = useMemo(
    () =>
      [...activities.executiveProgresses].sort((a, b) =>
        a.executiveName < b.executiveName ? -1 : 1,
      ),
    [activities.executiveProgresses],
  );

  const table = useReactTable({
    data: sortedActivities,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: searchText,
    },
    enableSorting: false,
  });

  const totalCount = sortedActivities.length;

  let countString = `총 ${totalCount}개`;
  if (table.getRowModel().rows.length !== totalCount) {
    countString = `검색 결과 ${table.getRowModel().rows.length}개 / 총 ${totalCount}개`;
  }

  return (
    <FlexWrapper direction="column" gap={8}>
      <Typography fs={16} lh={20} style={{ flex: 1, textAlign: "right" }}>
        {countString}
      </Typography>
      <Table table={table} />
    </FlexWrapper>
  );
};

export default ExecutiveActivityChargedTable;
