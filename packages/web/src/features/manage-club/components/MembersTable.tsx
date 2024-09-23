import React from "react";

import { ApiReg008ResponseOk } from "@sparcs-clubs/interface/api/registration/endpoint/apiReg008";

import { RegistrationApplicationStudentStatusEnum } from "@sparcs-clubs/interface/common/enum/registration.enum";

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

import { patchClubMemberRegistration } from "../members/services/patchClubMemberRegistration";

interface MembersTableProps {
  memberList: ApiReg008ResponseOk["applies"];
  clubName: string;
  clubId: number;
}

const openApproveModal = (
  member: ApiReg008ResponseOk["applies"][0],
  clubName: string,
  clubId: number,
) => {
  overlay.open(({ isOpen, close }) => (
    <Modal isOpen={isOpen}>
      <CancellableModalContent
        confirmButtonText="승인"
        onConfirm={async () => {
          await patchClubMemberRegistration(
            { applyId: member.id },
            {
              clubId,
              applyStatusEnumId:
                RegistrationApplicationStudentStatusEnum.Approved,
            },
          );
          close();
        }}
        onClose={() => {
          close();
        }}
      >
        {member.student.studentNumber} {member.student.name} 학생의{" "}
        {new Date().getFullYear()}
        년도 {new Date().getMonth() < 7 ? "봄학기" : "가을학기"} {clubName}{" "}
        동아리 신청을
        <br /> 승인하시겠습니까?
      </CancellableModalContent>
    </Modal>
  ));
};

const openRejectModal = (
  member: ApiReg008ResponseOk["applies"][0],
  clubName: string,
  clubId: number,
) => {
  overlay.open(({ isOpen, close }) => (
    <Modal isOpen={isOpen}>
      <CancellableModalContent
        confirmButtonText="반려"
        onConfirm={async () => {
          await patchClubMemberRegistration(
            { applyId: member.id },
            {
              clubId,
              applyStatusEnumId:
                RegistrationApplicationStudentStatusEnum.Rejected,
            },
          );
          close();
        }}
        onClose={() => {
          close();
        }}
      >
        {member.student.studentNumber} {member.student.name} 학생의{" "}
        {new Date().getFullYear()}
        년도 {new Date().getMonth() < 7 ? "봄학기" : "가을학기"} {clubName}{" "}
        동아리 신청을
        <br /> 반려하시겠습니까?
      </CancellableModalContent>
    </Modal>
  ));
};

const columnHelper = createColumnHelper<ApiReg008ResponseOk["applies"][0]>();

const columnsFunction = (clubName: string, clubId: number) => [
  columnHelper.accessor("applyStatusEnumId", {
    header: "상태",
    cell: info => {
      const { color, text } = getTagDetail(info.getValue(), MemTagList);
      return <Tag color={color}>{text}</Tag>;
    },
    size: 5,
  }),
  columnHelper.accessor("createdAt", {
    header: "신청 일시",
    cell: info => formatDateTime(info.getValue()),
    size: 30,
  }),
  columnHelper.accessor("student.studentNumber", {
    header: "학번",
    cell: info => info.getValue(),
    size: 5,
  }),
  columnHelper.accessor("student.name", {
    header: "신청자",
    cell: info => info.getValue(),
    size: 5,
  }),
  columnHelper.accessor("student.phoneNumber", {
    header: "전화번호",
    cell: info => info.getValue(),
    size: 20,
  }),
  columnHelper.accessor("student.email", {
    header: "이메일",
    cell: info => info.getValue(),
    size: 20,
  }),
  columnHelper.display({
    id: "remarks",
    header: "비고",
    cell: info => {
      const member = info.row.original;
      return (
        (member.applyStatusEnumId ===
          RegistrationApplicationStudentStatusEnum.Pending && (
          <TableButton
            text={["승인", "반려"]}
            onClick={[
              () => openApproveModal(member, clubName, clubId),
              () => openRejectModal(member, clubName, clubId),
            ]}
          />
        )) ||
        (member.applyStatusEnumId ===
          RegistrationApplicationStudentStatusEnum.Approved && (
          <TableButton
            text={["반려"]}
            onClick={[() => openRejectModal(member, clubName, clubId)]}
          />
        )) ||
        (member.applyStatusEnumId ===
          RegistrationApplicationStudentStatusEnum.Rejected && (
          <TableButton
            text={["승인"]}
            onClick={[() => openApproveModal(member, clubName, clubId)]}
          />
        ))
      );
    },
    size: 15,
  }),
];

const MembersTable: React.FC<MembersTableProps> = ({
  memberList,
  clubName,
  clubId,
}) => {
  const columns = columnsFunction(clubName, clubId);
  const table = useReactTable({
    columns,
    data: memberList,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false,
  });

  return <Table table={table} count={memberList.length} unit="명" />;
};

export default MembersTable;
