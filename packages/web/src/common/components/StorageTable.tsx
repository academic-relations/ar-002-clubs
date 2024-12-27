import React from "react";

import { ApiSto002ResponseOk } from "@sparcs-clubs/interface/api/storage/endpoint/apiSto002";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import Table from "@sparcs-clubs/web/common/components/Table";
import Tag from "@sparcs-clubs/web/common/components/Tag";
import { StorageTagList } from "@sparcs-clubs/web/constants/tableTagList";
import mockupStorage from "@sparcs-clubs/web/features/executive/storage/_mock/mockStorage";
import { getKrStorageStatus } from "@sparcs-clubs/web/features/storage/utils/storage";
import { getEnumStorage } from "@sparcs-clubs/web/types/storage.types";
import {
  formatDate,
  formatDateTime,
} from "@sparcs-clubs/web/utils/Date/formatDate";
import { getTagDetail } from "@sparcs-clubs/web/utils/getTagDetail";

interface StorageTableProps {
  storageList: ApiSto002ResponseOk;
  tableType: "executive" | "manage-club";
}

const columnHelper =
  createColumnHelper<(typeof mockupStorage)["items"][number]>();

const columns = [
  columnHelper.accessor("status", {
    id: "status",
    header: "상태",
    cell: info => {
      const { color: tagColor } = getTagDetail(
        getEnumStorage(info.getValue()),
        StorageTagList,
      );
      return <Tag color={tagColor}>{getKrStorageStatus(info.getValue())}</Tag>;
    },
    size: 120,
  }),
  columnHelper.accessor("createdAt", {
    id: "createdAt",
    header: "신청 일시",
    cell: info => formatDateTime(info.getValue()),
    size: 475,
  }),
  columnHelper.accessor("clubNameKr", {
    id: "clubNameKr",
    header: "동아리",
    cell: info => info.getValue(),
    size: 75,
  }),
  columnHelper.accessor("studentName", {
    id: "studentName",
    header: "신청자",
    cell: info => info.getValue(),
    size: 75,
  }),
  columnHelper.accessor("studentPhoneNumber", {
    id: "studentPhoneNumber",
    header: "연락처",
    cell: info => info.getValue(),
    size: 275,
  }),
  columnHelper.accessor("desiredStartDate", {
    id: "desiredStartDate",
    header: "보관 시작 일시",
    cell: info => formatDate(info.getValue()),
    size: 350,
  }),
  columnHelper.accessor("desiredEndDate", {
    id: "desiredEndDate",
    header: "보관 종료 일시",
    cell: info => formatDate(info.getValue()),
    size: 350,
  }),
  columnHelper.accessor("numberOfNonStandardItems", {
    id: "numberOfNonStandardItems",
    header: "규격 외 물품",
    cell: info => `${info.getValue()}항목`,
    size: 125,
  }),
];

const StorageTable: React.FC<StorageTableProps> = ({
  storageList,
  tableType,
}) => {
  const table = useReactTable({
    columns,
    data: storageList.items,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false,
  });

  return (
    <Table
      table={table}
      count={storageList.total}
      rowLink={row => `/${tableType}/storage/${row.applicationId}`}
    />
  );
};

export default StorageTable;
