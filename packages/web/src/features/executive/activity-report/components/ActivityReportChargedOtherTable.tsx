import React, { useMemo } from "react";

import { ApiAct028ResponseOk } from "@sparcs-clubs/interface/api/activity/endpoint/apiAct028";
import { ActivityStatusEnum } from "@sparcs-clubs/interface/common/enum/activity.enum";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Table from "@sparcs-clubs/web/common/components/Table";
import Tag from "@sparcs-clubs/web/common/components/Tag";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import {
  ActStatusTagList,
  ActTypeTagList,
} from "@sparcs-clubs/web/constants/tableTagList";
import { formatDateTime } from "@sparcs-clubs/web/utils/Date/formatDate";
import { getTagDetail } from "@sparcs-clubs/web/utils/getTagDetail";

const columnHelper =
  createColumnHelper<ApiAct028ResponseOk["activities"][number]>();
const columns = [
  columnHelper.accessor("club.name", {
    header: "동아리",
    cell: info => info.getValue(),
    size: 200,
  }),
  columnHelper.accessor("name", {
    header: "활동명",
    cell: info => info.getValue(),
    size: 252,
  }),
  columnHelper.accessor("activityTypeEnum", {
    header: "활동 분류",
    cell: info => {
      const { color, text } = getTagDetail(info.getValue(), ActTypeTagList);
      return <Tag color={color}>{text}</Tag>;
    },
    size: 248,
  }),
  columnHelper.accessor("commentedAt", {
    header: "검토 일시",
    cell: info => {
      const date = info.getValue();
      return date ? formatDateTime(date) : "-";
    },
    size: 220,
  }),
  columnHelper.accessor(row => row.chargedExecutive?.name, {
    header: "담당자",
    cell: info =>
      info.getValue() || (
        <Typography color="GRAY.300" fs={16} lh={24}>
          (미정)
        </Typography>
      ),
    size: 120,
  }),
  columnHelper.accessor("activityStatusEnum", {
    header: "상태",
    cell: info => {
      const { color, text } = getTagDetail(info.getValue(), ActStatusTagList);
      return <Tag color={color}>{text}</Tag>;
    },
    size: 120,
  }),
];

const ActivityReportChargedOtherTable: React.FC<{
  activities: ApiAct028ResponseOk["activities"];
}> = ({ activities }) => {
  const { length } = activities;
  const sortedActivities = useMemo(() => {
    const statusOrder = {
      [ActivityStatusEnum.Applied]: 0,
      [ActivityStatusEnum.Rejected]: 1,
      [ActivityStatusEnum.Approved]: 2,
      [ActivityStatusEnum.Committee]: 3,
    };

    return activities.sort((a, b) => {
      if (
        statusOrder[a.activityStatusEnum] !== statusOrder[b.activityStatusEnum]
      ) {
        return (
          statusOrder[a.activityStatusEnum] - statusOrder[b.activityStatusEnum]
        );
      }
      if (a.commentedAt !== b.commentedAt) {
        if (!a.commentedAt) return -1;
        if (!b.commentedAt) return 1;
        return (
          new Date(b.commentedAt ?? b.updatedAt).getTime() -
          new Date(a.commentedAt ?? a.updatedAt).getTime()
        );
      }
      return 0;
    });
  }, [activities]);

  const table = useReactTable({
    data: sortedActivities,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false,
  });

  return (
    <FlexWrapper direction="column" gap={16}>
      <Typography fs={20} lh={24} fw="MEDIUM">
        담당자가 아님 ({length}개)
      </Typography>
      <Table
        table={table}
        rowLink={row => `/executive/activity-report/${row.id}`}
      />
    </FlexWrapper>
  );
};

export default ActivityReportChargedOtherTable;
