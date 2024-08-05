"use client";

import React, { useMemo } from "react";

import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import styled from "styled-components";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import Pagination from "@sparcs-clubs/web/common/components/Pagination";
import Table from "@sparcs-clubs/web/common/components/Table";
import Tag from "@sparcs-clubs/web/common/components/Tag";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import { RntTagList } from "@sparcs-clubs/web/constants/tableTagList";
import mockupMyExeRnt from "@sparcs-clubs/web/features/executive/rental-business/_mock/mockMyExeRnt";

import {
  formatDate,
  formatDateTime,
} from "@sparcs-clubs/web/utils/Date/formateDate";
import { getTagDetail } from "@sparcs-clubs/web/utils/getTagDetail";

const columnHelper =
  createColumnHelper<(typeof mockupMyExeRnt.items)[number]>();

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
  columnHelper.accessor("applicantName", {
    id: "applicantName",
    header: "신청자",
    cell: info => info.getValue(),
    size: 10,
  }),
  columnHelper.accessor("phoneNumber", {
    id: "phoneNumber",
    header: "연락처",
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

const TableWithPagination = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  align-self: stretch;
`;

const TableWithCount = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  gap: 8px;
  align-self: stretch;
`;

const ExecutiveRental = () => {
  const data = useMemo(() => mockupMyExeRnt.items, []);

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false,
  });

  return (
    <FlexWrapper direction="column" gap={20} justify="center">
      <FlexWrapper direction="column" gap={20}>
        <PageHead
          items={[
            { name: "집행부원 대시보드", path: "/executive" },
            { name: "대여 사업 신청 내역", path: "/executive/rental-business" },
          ]}
          title="대여 사업 신청 내역"
        />
      </FlexWrapper>
      <TableWithPagination>
        <TableWithCount>
          <Typography
            fw="REGULAR"
            fs={16}
            lh={20}
            ff="PRETENDARD"
            color="GRAY.600"
          >
            총 {data.length}개
          </Typography>
          <Table table={table} />
        </TableWithCount>
        <Pagination totalPage={10} currentPage={1} limit={10} />
      </TableWithPagination>
    </FlexWrapper>
  );
};

export default ExecutiveRental;
