import React from "react";

import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import FlexWrapper from "@sparcs-clubs/web/common/components/FlexWrapper";
import Table from "@sparcs-clubs/web/common/components/Table";
import Typography from "@sparcs-clubs/web/common/components/Typography";

const getChargedExecutiveContent = (
  prevExecutiveName: string,
  newExecutiveName: string,
) => {
  if (prevExecutiveName !== "" && newExecutiveName !== "") {
    return `${prevExecutiveName} → ${newExecutiveName}`;
  }
  if (prevExecutiveName === "" && newExecutiveName === "") {
    return (
      <FlexWrapper gap={4} direction="row">
        <Typography color="GRAY.300">(미정)</Typography>
        <Typography>→</Typography>
        <Typography color="GRAY.300">(미정)</Typography>
      </FlexWrapper>
    );
  }
  if (newExecutiveName === "") {
    return (
      <FlexWrapper gap={4} direction="row">
        <Typography>{prevExecutiveName} → </Typography>
        <Typography color="GRAY.300">(미정)</Typography>
      </FlexWrapper>
    );
  }
  return (
    <FlexWrapper gap={4} direction="row">
      <Typography color="GRAY.300">(미정)</Typography>
      <Typography>→ {newExecutiveName}</Typography>
    </FlexWrapper>
  );
};

export interface ChargedChangeClubProps {
  clubId: number;
  clubNameKr: string;
  clubNameEn: string;
  prevExecutiveName: string;
}

const ChargedChangeClubModalTable: React.FC<{
  data: ChargedChangeClubProps[];
  newExecutiveName: string;
}> = ({ data, newExecutiveName }) => {
  const columnHelper = createColumnHelper<ChargedChangeClubProps>();
  const columns = [
    columnHelper.accessor("clubNameKr", {
      header: "동아리",
      cell: info => info.getValue(),
      size: 50,
    }),
    columnHelper.accessor("prevExecutiveName", {
      header: "담당자",
      cell: info =>
        getChargedExecutiveContent(info.getValue(), newExecutiveName),
      size: 50,
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false,
  });

  return <Table table={table} />;
};

export default ChargedChangeClubModalTable;
