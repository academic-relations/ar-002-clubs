"use client";

import { useMemo } from "react";

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
import { PrtTagList } from "@sparcs-clubs/web/constants/tableTagList";
import { mockupMyPrint } from "@sparcs-clubs/web/features/my/services/_mock/mockMyClub";
import { formatDateTime } from "@sparcs-clubs/web/utils/Date/formatDate";
import getPrintSize from "@sparcs-clubs/web/utils/getPrintSize";
import { getTagDetail } from "@sparcs-clubs/web/utils/getTagDetail";

const columnHelper = createColumnHelper<(typeof mockupMyPrint.items)[number]>();

const columns = [
  columnHelper.accessor("status", {
    id: "status",
    header: "상태",
    cell: info => {
      const { color, text } = getTagDetail(info.getValue(), PrtTagList);
      return <Tag color={color}>{text}</Tag>;
    },
    size: 10,
  }),
  columnHelper.accessor("createdAt", {
    id: "createdAt",
    header: "신청 일시",
    cell: info => formatDateTime(info.getValue()),
    size: 25,
  }),
  columnHelper.accessor("studentName", {
    id: "studentName",
    header: "동아리",
    cell: info => info.getValue(),
    size: 15,
  }),
  columnHelper.accessor("desiredPickUpDate", {
    id: "desiredPickUpDate",
    header: "수령 일시",
    cell: info => formatDateTime(info.getValue()),
    size: 25,
  }),
  columnHelper.accessor("orders", {
    id: "orders",
    header: "인쇄 매수",
    cell: info =>
      info
        .getValue()
        .sort(
          (a, b) =>
            b.promotionalPrintingSizeEnum - a.promotionalPrintingSizeEnum,
        )
        .map(
          order =>
            `${getPrintSize(order.promotionalPrintingSizeEnum)} ${
              order.numberOfPrints
            }매`,
        )
        .join(" "),
    size: 25,
  }),
];

const MyPrintingBusiness = () => {
  const data = useMemo(() => mockupMyPrint.items, []);

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
          { name: "홍보물 인쇄 내역", path: "/my/printing-business" },
        ]}
        title="홍보물 인쇄 내역"
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

export default MyPrintingBusiness;
