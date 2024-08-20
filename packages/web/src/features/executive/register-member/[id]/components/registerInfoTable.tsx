import React from "react";

import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import styled from "styled-components";

import TextButton from "@sparcs-clubs/web/common/components/Buttons/TextButton";
import Table from "@sparcs-clubs/web/common/components/Table";
import Tag from "@sparcs-clubs/web/common/components/Tag";
import Typography from "@sparcs-clubs/web/common/components/Typography";
import { MemTagList } from "@sparcs-clubs/web/constants/tableTagList";
import { MemberStatusEnum } from "@sparcs-clubs/web/features/manage-club/services/_mock/mockManageClub";
import { getTagDetail } from "@sparcs-clubs/web/utils/getTagDetail";

import mockupClubMr from "../_mock/mockClubMr";

interface RegisterInfoTableProps {
  mrInfoList: typeof mockupClubMr;
}

const ToggleWrapper = styled.div`
  gap: 12px;
  justify-content: center;
  align-items: center;
  direction: row;
  display: flex;
`;
const columnHelper =
  createColumnHelper<(typeof mockupClubMr)["applies"][number]>();

const columns = [
  columnHelper.accessor("registrationStatus", {
    id: "registrationStatus",
    header: "상태",
    cell: info => {
      const { color, text } = getTagDetail(info.getValue(), MemTagList);
      return <Tag color={color}>{text}</Tag>;
    },
    size: 90,
  }),
  columnHelper.accessor("studentID", {
    id: "studentID",
    header: "구분",
    cell: info => {
      if (
        parseInt(info.getValue().toString().slice(-4)) < 2000 ||
        (parseInt(info.getValue().toString().slice(-4)) < 7000 &&
          parseInt(info.getValue().toString().slice(-4)) > 6000)
      ) {
        return <Tag color="BLUE">정회원</Tag>;
      }
      return <Tag color="GRAY">준회원</Tag>;
    },
    size: 220,
  }),
  columnHelper.accessor("studentID", {
    id: "studentID",
    header: "학번",
    cell: info => info.getValue(),
    size: 100,
  }),
  columnHelper.accessor("studentName", {
    id: "studentName",
    header: "신청자",
    cell: info => info.getValue(),
    size: 120,
  }),
  columnHelper.accessor("studentPhoneNumber", {
    id: "studentPhoneNumber",
    header: "전화번호",
    cell: info => info.getValue(),
    size: 160,
  }),
  columnHelper.accessor("studentEmail", {
    id: "studentEmail",
    header: "이메일",
    cell: info => info.getValue(),
    size: 240,
  }),
  columnHelper.accessor("registrationStatus", {
    id: "registrationStatus",
    header: "이메일",
    cell: info => {
      if (info.row.original.registrationStatus === MemberStatusEnum.Approved) {
        return (
          <ToggleWrapper>
            <TextButton text="승인" disabled />
            <Typography>/</Typography>
            <TextButton text="반려" />
          </ToggleWrapper>
        );
      }
      if (info.row.original.registrationStatus === MemberStatusEnum.Applied) {
        return (
          <ToggleWrapper>
            <TextButton text="승인" />
            <Typography>/</Typography>
            <TextButton text="반려" />
          </ToggleWrapper>
        );
      }
      return (
        <ToggleWrapper>
          <TextButton text="승인" />
          <Typography>/</Typography>
          <TextButton text="반려" disabled />
        </ToggleWrapper>
      );
    },
    size: 290,
  }),
];

const RegisterInfoTable: React.FC<RegisterInfoTableProps> = ({
  mrInfoList,
}) => {
  const table = useReactTable({
    columns,
    data: mrInfoList.applies,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false,
  });

  return <Table table={table} count={mrInfoList.total} />;
};

export default RegisterInfoTable;
