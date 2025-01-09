import React, { useEffect, useMemo, useState } from "react";

import { ApiAct024ResponseOk } from "@sparcs-clubs/interface/api/activity/endpoint/apiAct024";
import { ActivityStatusEnum } from "@sparcs-clubs/interface/common/enum/activity.enum";
import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  RowSelectionState,
  useReactTable,
} from "@tanstack/react-table";

import styled from "styled-components";

import Checkbox from "@sparcs-clubs/web/common/components/Checkbox";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Table from "@sparcs-clubs/web/common/components/Table";
import Tag from "@sparcs-clubs/web/common/components/Tag";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import { ActStatusTagList } from "@sparcs-clubs/web/constants/tableTagList";
import { formatDateTime } from "@sparcs-clubs/web/utils/Date/formatDate";
import { getTagDetail } from "@sparcs-clubs/web/utils/getTagDetail";

interface ExecutiveClubActivitiesTableProps {
  data: ApiAct024ResponseOk;
  searchText: string;
  selectedActivityIds: number[];
  setSelectedActivityIds: (clubIds: number[]) => void;
}

const CheckboxCenterPlacer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const columnHelper = createColumnHelper<ApiAct024ResponseOk["items"][number]>();
const columns = [
  columnHelper.display({
    id: "multiSelect",
    cell: ({ row }) => (
      <CheckboxCenterPlacer>
        <Checkbox
          checked={row.getIsSelected()}
          onClick={row.getToggleSelectedHandler()}
        />
      </CheckboxCenterPlacer>
    ),
    size: 56,
  }),
  columnHelper.accessor("activityStatusEnum", {
    header: "상태",
    cell: info => {
      const { color, text } = getTagDetail(info.getValue(), ActStatusTagList);
      return <Tag color={color}>{text}</Tag>;
    },
    size: 90,
  }),
  columnHelper.accessor("activityName", {
    header: "활동명",
    cell: info => info.getValue(),
    size: 300,
  }),
  columnHelper.accessor("updatedAt", {
    header: "검토 일시",
    cell: info => formatDateTime(info.getValue()),
    size: 220,
  }),
  columnHelper.accessor("finalReviewedExecutive.name", {
    header: "최종 검토자",
    cell: info => info.getValue() || "-",
    size: 120,
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
];

const ExecutiveClubActivitiesTable: React.FC<
  ExecutiveClubActivitiesTableProps
> = ({ data, searchText, selectedActivityIds, setSelectedActivityIds }) => {
  const sortedActivities = useMemo(() => {
    const statusOrder = {
      [ActivityStatusEnum.Applied]: 0,
      [ActivityStatusEnum.Rejected]: 1,
      [ActivityStatusEnum.Approved]: 2,
    };

    return [...data.items].sort((a, b) => {
      if (
        statusOrder[a.activityStatusEnum] !== statusOrder[b.activityStatusEnum]
      ) {
        return (
          statusOrder[a.activityStatusEnum] - statusOrder[b.activityStatusEnum]
        );
      }
      return a.activityId < b.activityId ? -1 : 1;
    });
  }, [data.items]);

  const initialRowValues = useMemo(
    () =>
      selectedActivityIds.reduce((acc, clubId) => {
        const index = sortedActivities.findIndex(
          activity => activity.activityId === clubId,
        );
        return { ...acc, [index]: true };
      }, {}),
    [selectedActivityIds, sortedActivities],
  );

  const [rowValues, setRowValues] =
    useState<RowSelectionState>(initialRowValues);

  useEffect(() => {
    setRowValues(initialRowValues);
  }, [initialRowValues]);

  const handleRowClick = (rowState: RowSelectionState) => {
    setRowValues(rowState);
    const newSelected = sortedActivities.filter((_, i) => rowState?.[i]);
    setSelectedActivityIds(newSelected.map(activity => activity.activityId));
  };

  const table = useReactTable({
    data: sortedActivities,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      rowSelection: rowValues,
      globalFilter: searchText,
    },
    onRowSelectionChange: updaterOrValue => {
      if (typeof updaterOrValue === "function") {
        handleRowClick(updaterOrValue(rowValues));
      } else {
        handleRowClick(updaterOrValue);
      }
    },
    enableSorting: false,
  });

  const totalCount = sortedActivities.length;

  let countString = `총 ${totalCount}개`;
  if (selectedActivityIds.length !== 0) {
    countString = `선택 항목 ${selectedActivityIds.length}개 / 총 ${totalCount}개`;
  } else if (table.getRowModel().rows.length !== totalCount) {
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

export default ExecutiveClubActivitiesTable;
