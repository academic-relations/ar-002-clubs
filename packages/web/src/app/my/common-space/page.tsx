"use client";

import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React, { useMemo } from "react";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import Table from "@sparcs-clubs/web/common/components/Table";
import Tag from "@sparcs-clubs/web/common/components/Tag";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import { CmsTagList } from "@sparcs-clubs/web/constants/tableTagList";
import { mockupMyCms } from "@sparcs-clubs/web/features/my/services/_mock/mockMyClub";
import {
  formatDate,
  formatDateTime,
  formatTime,
} from "@sparcs-clubs/web/utils/Date/formatDate";
import { getTagDetail } from "@sparcs-clubs/web/utils/getTagDetail";

const columnHelper = createColumnHelper<(typeof mockupMyCms.items)[number]>();

const columns = [
  columnHelper.accessor("statusEnum", {
    id: "status",
    header: "상태",
    cell: info => {
      const { color, text } = getTagDetail(info.getValue(), CmsTagList);
      return <Tag color={color}>{text}</Tag>;
    },
    size: 10,
  }),
  columnHelper.accessor("createdAt", {
    id: "createdAt",
    header: "신청 일시",
    cell: info => formatDateTime(info.getValue()),
    size: 20,
  }),
  columnHelper.accessor("chargeStudentName", {
    id: "chargeStudentName",
    header: "동아리",
    cell: info => info.getValue(),
    size: 10,
  }),
  columnHelper.accessor("startTerm", {
    id: "startTerm",
    header: "예약 일자",
    cell: info => formatDate(info.getValue()),
    size: 16,
  }),
  columnHelper.accessor(
    row => `${formatTime(row.startTerm)} ~ ${formatTime(row.endTerm)}`,
    {
      id: "time-range",
      header: "예약 시간",
      cell: info => info.getValue(),
      size: 16,
    },
  ),
  columnHelper.accessor("spaceName", {
    id: "spaceName",
    header: "예약 호실",
    cell: info => info.getValue(),
    size: 28,
  }),
];

const MyCommonSpace = () => {
  const data = useMemo(() => mockupMyCms.items, []);

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false,
  });

  return (
    <FlexWrapper direction="column" gap={20}>
      <PageHead
        items={[
          { name: "마이페이지", path: "/my" },
          { name: "공용공간 비정기사용 내역", path: "/my/common-space" },
        ]}
        title="공용공간 비정기사용 내역"
      />
      <FlexWrapper direction="row" gap={0} justify="flex-end">
        <Typography
          fw="REGULAR"
          fs={16}
          lh={20}
          ff="PRETENDARD"
          color="GRAY.600"
        >
          총 {data.length}개
        </Typography>
      </FlexWrapper>
      <Table table={table} />
    </FlexWrapper>
  );
};

export default MyCommonSpace;
