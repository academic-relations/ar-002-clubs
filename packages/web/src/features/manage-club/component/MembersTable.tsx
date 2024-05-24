import React from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import TableCell from "@sparcs-clubs/web/common/components/Table/TableCell";
import {
  TableRow,
  TableWrapper,
} from "@sparcs-clubs/web/common/components/Table/TableWrapper";
import Tag, { TagColor } from "@sparcs-clubs/web/common/components/Tag";
import TableButtonCell from "@sparcs-clubs/web/common/components/Table/TableButtonCell";
import {
  MemberStatusEnum,
  type Members,
} from "../service/_mock/mockManageClub";

interface MembersTableProps {
  memberList: Members[];
}

interface StatusDetail {
  text: string;
  color: TagColor;
}

const getStatusDetails = (status: number): StatusDetail => {
  switch (status) {
    case MemberStatusEnum.Applied:
      return { text: "신청", color: "BLUE" };
    case MemberStatusEnum.Approved:
      return { text: "승인", color: "YELLOW" };
    case MemberStatusEnum.Rejected:
      return { text: "반려", color: "RED" };
    default:
      return { text: "None", color: "GRAY" };
  }
};

const formatDate = (date: Date) =>
  format(date, "yyyy년 M월 d일 (iii) HH:mm", { locale: ko });

const MembersTable: React.FC<MembersTableProps> = ({ memberList }) => (
  <TableWrapper>
    <TableRow>
      <TableCell type="HeaderSort" width="10%" minWidth={90}>
        상태
      </TableCell>
      <TableCell type="HeaderSort" width="20%" minWidth={220}>
        신청 일시
      </TableCell>
      <TableCell type="HeaderSort" width="10%" minWidth={120}>
        학번
      </TableCell>
      <TableCell type="HeaderSort" width="10%" minWidth={120}>
        신청자
      </TableCell>
      <TableCell type="Header" width="15%" minWidth={160}>
        전화번호
      </TableCell>
      <TableCell type="Header" width="20%" minWidth={240}>
        이메일
      </TableCell>
      <TableCell type="Header" width="15%" minWidth={110}>
        비고
      </TableCell>
    </TableRow>
    {memberList.map(member => (
      <TableRow isBorder key={member.studentId}>
        <TableCell type="Tag" width="10%" minWidth={90}>
          <Tag color={getStatusDetails(member.status).color}>
            {getStatusDetails(member.status).text}
          </Tag>
        </TableCell>
        <TableCell type="Default" width="20%" minWidth={220}>
          {formatDate(member.applicationDate)}
        </TableCell>
        <TableCell type="Default" width="10%" minWidth={120}>
          {member.studentId}
        </TableCell>
        <TableCell type="Default" width="10%" minWidth={120}>
          {member.applicantName}
        </TableCell>
        <TableCell type="Default" width="15%" minWidth={160}>
          {member.phoneNumber}
        </TableCell>
        <TableCell type="Default" width="20%" minWidth={240}>
          {member.email}
        </TableCell>
        {member.status === MemberStatusEnum.Applied ? (
          <TableButtonCell
            width="15%"
            text={["승인", "반려"]}
            onClick={[() => {}, () => {}]}
            //   TODO: 승인 반려 기능 넣기
            minWidth={110}
          />
        ) : (
          <TableCell type="Default" width="15%" minWidth={110}>
            {" "}
          </TableCell>
          // TODO: 비고에 넣을 텍스트는 DB 어디에서 들고오는지
        )}
      </TableRow>
    ))}
  </TableWrapper>
);

export default MembersTable;