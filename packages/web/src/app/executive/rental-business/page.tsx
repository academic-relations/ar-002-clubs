"use client";

import React, { useMemo } from "react";

import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
// import Pagination from "@sparcs-clubs/web/common/components/Pagination";
import Table from "@sparcs-clubs/web/common/components/Table";
import Tag from "@sparcs-clubs/web/common/components/Tag";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import { RntTagList } from "@sparcs-clubs/web/constants/tableTagList";
import { mockupMyRental } from "@sparcs-clubs/web/features/my/service/_mock/mockMyClub";
import {
  formatDate,
  formatDateTime,
} from "@sparcs-clubs/web/utils/Date/formateDate";
import { getTagDetail } from "@sparcs-clubs/web/utils/getTagDetail";

const columnHelper =
  createColumnHelper<(typeof mockupMyRental.items)[number]>();

const columns = [
  columnHelper.accessor("statusEnum", {
    id: "status",
    header: "상태",
    cell: info => {
      const { color, text } = getTagDetail(info.getValue(), RntTagList);
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
  columnHelper.accessor("studentName", {
    id: "studentName",
    header: "동아리",
    cell: info => info.getValue(),
    size: 10,
  }),
  columnHelper.accessor("studentName", {
    id: "studentName",
    header: "동아리",
    cell: info => info.getValue(),
    size: 10,
  }),
  columnHelper.accessor("studentName", {
    id: "studentName",
    header: "동아리",
    cell: info => info.getValue(),
    size: 10,
  }),
  columnHelper.accessor("desiredStart", {
    id: "desiredStart",
    header: "대여 일자",
    cell: info => formatDate(info.getValue()),
    size: 20,
  }),
  columnHelper.accessor("desiredEnd", {
    id: "desiredEnd",
    header: "반납 일자",
    cell: info => formatDate(info.getValue()),
    size: 20,
  }),
  columnHelper.accessor(
    row =>
      `${row.objects[0].name} ${row.objects[0].number}개 외 ${row.objects.length}항목`,
    {
      id: "rentalObjects",
      header: "대여 물품",
      cell: info => info.getValue(),
      size: 20,
    },
  ),
];

const ExecutiveRental = () => {
  const data = useMemo(() => mockupMyRental.items, []);

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
          { name: "집행부원 대시보드", path: "/executive" },
          { name: "대여 사업 신청 내역", path: "/executive/rental-business" },
        ]}
        title="대여 사업 신청 내역"
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

export default ExecutiveRental;
