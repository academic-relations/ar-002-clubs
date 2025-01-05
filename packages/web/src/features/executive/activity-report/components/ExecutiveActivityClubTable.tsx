import React, { useMemo } from "react";

import { ApiAct023ResponseOk } from "@sparcs-clubs/interface/api/activity/endpoint/apiAct023";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { hangulIncludes } from "es-hangul";
import styled from "styled-components";

import Checkbox from "@sparcs-clubs/web/common/components/Checkbox";
import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Table from "@sparcs-clubs/web/common/components/Table";
import Tag from "@sparcs-clubs/web/common/components/Tag";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import { ClubTypeTagList } from "@sparcs-clubs/web/constants/tableTagList";
import { getTagColorFromDivision } from "@sparcs-clubs/web/types/clubdetail.types";
import { getTagDetail } from "@sparcs-clubs/web/utils/getTagDetail";

interface ExecutiveActivityClubTableProps {
  activities: ApiAct023ResponseOk;
  searchText: string;
}

const CheckboxCenterPlacer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const columnHelper = createColumnHelper<ApiAct023ResponseOk["items"][number]>();
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
  columnHelper.accessor("clubTypeEnum", {
    header: "구분",
    cell: info => {
      const { color, text } = getTagDetail(info.getValue(), ClubTypeTagList);
      return <Tag color={color}>{text}</Tag>;
    },
    size: 125,
  }),
  columnHelper.accessor("divisionName", {
    header: "분과",
    cell: info => (
      <Tag color={getTagColorFromDivision(info.getValue())}>
        {info.getValue()}
      </Tag>
    ),
    size: 120,
  }),
  columnHelper.accessor("clubNameKr", {
    header: "동아리",
    cell: info => info.getValue(),
    size: 140,
  }),
  columnHelper.accessor("advisor", {
    header: "지도교수",
    cell: info => info.getValue() || "-",
    size: 140,
  }),
  columnHelper.accessor(
    row => {
      const {
        pendingActivitiesCount,
        approvedActivitiesCount,
        rejectedActivitiesCount,
      } = row;
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
      const {
        pendingActivitiesCount,
        approvedActivitiesCount,
        rejectedActivitiesCount,
      } = row;
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
  columnHelper.accessor(row => row.chargedExecutive?.name, {
    header: "담당자",
    cell: info =>
      info.getValue() || (
        <Typography color="GRAY.300" fs={16} lh={24}>
          (미정)
        </Typography>
      ),
    size: 140,
  }),
];

const ExecutiveActivityClubTable: React.FC<ExecutiveActivityClubTableProps> = ({
  activities,
  searchText,
}) => {
  const sortedActivities = useMemo(
    () => [...activities.items].sort((a, b) => (a.clubId < b.clubId ? -1 : 1)),
    [activities.items],
  );

  const filteredActivities = useMemo(
    () =>
      sortedActivities.filter(
        item =>
          item.clubNameKr.toLowerCase().includes(searchText.toLowerCase()) ||
          item.clubNameEn.toLowerCase().includes(searchText.toLowerCase()) ||
          hangulIncludes(item.clubNameKr, searchText),
      ),
    [sortedActivities, searchText],
  );

  const table = useReactTable({
    data: searchText === "" ? sortedActivities : filteredActivities,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false,
  });

  const totalCount = sortedActivities.length;

  const selectedCount = table
    .getRowModel()
    .rows.filter(row => row.getIsSelected()).length;

  let countString = `총 ${totalCount}개`;
  if (selectedCount !== 0) {
    countString = `선택 항목 ${selectedCount}개 / 총 ${totalCount}개`;
  } else if (filteredActivities.length !== totalCount) {
    countString = `검색 결과 ${filteredActivities.length}개 / 총 ${totalCount}개`;
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

export default ExecutiveActivityClubTable;
