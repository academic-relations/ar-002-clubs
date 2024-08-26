import React from "react";

import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { overlay } from "overlay-kit";

import Modal from "@sparcs-clubs/web/common/components/Modal";
import CancellableModalContent from "@sparcs-clubs/web/common/components/Modal/CancellableModalContent";
import Table from "@sparcs-clubs/web/common/components/Table";
import TableButton from "@sparcs-clubs/web/common/components/Table/TableButton";
import Tag from "@sparcs-clubs/web/common/components/Tag";
import { MemTagList } from "@sparcs-clubs/web/constants/tableTagList";
import { formatDateTime } from "@sparcs-clubs/web/utils/Date/formatDate";
import { getTagDetail } from "@sparcs-clubs/web/utils/getTagDetail";

import {
  type Members,
  MemberStatusEnum,
} from "../services/_mock/mockManageClub";

interface MembersTableProps {
  memberList: Members[];
  clubName: string;
}

const openApproveModal = (member: Members, clubName: string) => {
  overlay.open(({ isOpen, close }) => (
    <Modal isOpen={isOpen}>
      <CancellableModalContent
        confirmButtonText="승인"
        onConfirm={() => {
          // TODO: 승인 로직 넣기
          close();
        }}
        onClose={() => {
          close();
        }}
      >
        {member.studentId} {member.applicantName} 학생의{" "}
        {new Date().getFullYear()}
        년도 {new Date().getMonth() < 7 ? "봄학기" : "가을학기"} {clubName}{" "}
        동아리 신청을
        <br /> 승인하시겠습니까?
      </CancellableModalContent>
    </Modal>
  ));
};

const openRejectModal = (member: Members, clubName: string) => {
  overlay.open(({ isOpen, close }) => (
    <Modal isOpen={isOpen}>
      <CancellableModalContent
        confirmButtonText="반려"
        onConfirm={() => {
          // TODO: 승인 로직 넣기
          close();
        }}
        onClose={() => {
          close();
        }}
      >
        {member.studentId} {member.applicantName} 학생의{" "}
        {new Date().getFullYear()}
        년도 {new Date().getMonth() < 7 ? "봄학기" : "가을학기"} {clubName}{" "}
        동아리 신청을
        <br /> 반려하시겠습니까?
      </CancellableModalContent>
    </Modal>
  ));
};

const columnHelper = createColumnHelper<Members>();

const columnsFunction = (clubName: string) => [
  columnHelper.accessor("status", {
    header: "상태",
    cell: info => {
      const { color, text } = getTagDetail(info.getValue(), MemTagList);
      return <Tag color={color}>{text}</Tag>;
    },
    size: 5,
  }),
  columnHelper.accessor("applicationDate", {
    header: "신청 일시",
    cell: info => formatDateTime(info.getValue()),
    size: 30,
  }),
  columnHelper.accessor("studentId", {
    header: "학번",
    cell: info => info.getValue(),
    size: 5,
  }),
  columnHelper.accessor("applicantName", {
    header: "신청자",
    cell: info => info.getValue(),
    size: 5,
  }),
  columnHelper.accessor("phoneNumber", {
    header: "전화번호",
    cell: info => info.getValue(),
    size: 20,
  }),
  columnHelper.accessor("email", {
    header: "이메일",
    cell: info => info.getValue(),
    size: 20,
  }),
  columnHelper.display({
    id: "remarks",
    header: "비고",
    cell: info => {
      const member = info.row.original;
      return member.status === MemberStatusEnum.Applied ? (
        <TableButton
          text={["승인", "반려"]}
          onClick={[
            () => openApproveModal(member, clubName),
            () => openRejectModal(member, clubName),
          ]}
          // TODO: 승인 반려 기능 넣기
        />
      ) : (
        " "
      );
    },
    size: 15,
  }),
];

const MembersTable: React.FC<MembersTableProps> = ({
  memberList,
  clubName,
}) => {
  const columns = columnsFunction(clubName);
  const table = useReactTable({
    columns,
    data: memberList,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false,
  });

  return <Table table={table} count={memberList.length} unit="명" />;
};

export default MembersTable;
