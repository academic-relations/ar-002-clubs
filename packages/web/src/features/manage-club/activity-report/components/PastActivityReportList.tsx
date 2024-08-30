import React from "react";

import { ActivityTypeEnum } from "@sparcs-clubs/interface/common/enum/activity.enum";
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

type PastActivityReport = {
  name: string;
  activityTypeEnumId: ActivityTypeEnum;
  duration: {
    startTerm: Date;
    endTerm: Date;
  };
};
interface ActivityReportListProps {
  data: PastActivityReport[];
  showItemCount?: boolean;
}

const columnHelper = createColumnHelper<PastActivityReport>();

const getActivityTypeTagColor = (activityType: ActivityTypeEnum): TagColor => {
  switch (activityType) {
    case ActivityTypeEnum.matchedInternalActivity:
      return "ORANGE";
    case ActivityTypeEnum.matchedExternalActivity:
      return "BLUE";
    case ActivityTypeEnum.notMatchedActivity:
      return "PURPLE";
    default:
      return "GRAY";
  }
};

const getActivityTypeTagLabel = (activityType: ActivityTypeEnum): string => {
  switch (activityType) {
    case ActivityTypeEnum.matchedInternalActivity:
      return "동아리 성격에 합치하는 내부 활동";
    case ActivityTypeEnum.matchedExternalActivity:
      return "동아리 성격에 합치하는 외부 활동";
    case ActivityTypeEnum.notMatchedActivity:
      return "동아리 성격에 합치하지 않는 활동";
    default:
      return "-";
  }
};

const columns = [
  columnHelper.accessor("name", {
    header: "활동명",
    cell: info => info.getValue(),
    size: 35,
  }),
  columnHelper.accessor("activityTypeEnumId", {
    header: "활동 분류",
    cell: info => (
      <Tag color={getActivityTypeTagColor(info.getValue())}>
        {getActivityTypeTagLabel(info.getValue())}
      </Tag>
    ),
    size: 30,
  }),
  columnHelper.accessor(
    row =>
      `${formatDate(row.duration.startTerm)} ~ ${formatDate(row.duration.endTerm)}`,
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
  console.log("past-activity-report", data);

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
