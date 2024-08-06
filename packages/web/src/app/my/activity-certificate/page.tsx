"use client";

import React, { useMemo } from "react";

import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import Table from "@sparcs-clubs/web/common/components/Table";
import Tag from "@sparcs-clubs/web/common/components/Tag";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import { AcfTagList } from "@sparcs-clubs/web/constants/tableTagList";
import { mockupMyAcf } from "@sparcs-clubs/web/features/my/services/_mock/mockMyClub";
import { formatDateTime } from "@sparcs-clubs/web/utils/Date/formatDate";
import { getTagDetail } from "@sparcs-clubs/web/utils/getTagDetail";

const columnHelper = createColumnHelper<(typeof mockupMyAcf.items)[number]>();

const columns = [
  columnHelper.accessor("statusEnum", {
    id: "status",
    header: "상태",
    cell: info => {
      const { color, text } = getTagDetail(info.getValue(), AcfTagList);
      return <Tag color={color}>{text}</Tag>;
    },
    size: 10,
  }),
  columnHelper.accessor("createdAt", {
    id: "createdAt",
    header: "신청 일시",
    cell: info => formatDateTime(info.getValue()),
    size: 30,
  }),
  columnHelper.accessor("studentName", {
    id: "studentName",
    header: "동아리",
    cell: info => info.getValue(),
    size: 30,
  }),
  columnHelper.accessor("issuedNumber", {
    id: "issuedNumber",
    header: "발급 매수",
    cell: info => `${info.getValue()}매`,
    size: 30,
  }),
];

const MyActivityCertificate = () => {
  const data = useMemo(() => mockupMyAcf.items, []);

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
          { name: "활동확인서 발급 내역", path: "/my/activity-certificate" },
        ]}
        title="활동확인서 발급 내역"
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

export default MyActivityCertificate;
