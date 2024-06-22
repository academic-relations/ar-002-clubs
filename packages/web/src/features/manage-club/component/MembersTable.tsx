import React from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

import TableButtonCell from "@sparcs-clubs/web/common/components/Table/TableButtonCell";
import TableCell from "@sparcs-clubs/web/common/components/Table/TableCell";
import {
  TableRow,
  TableWrapper,
} from "@sparcs-clubs/web/common/components/Table/TableWrapper";
import Tag from "@sparcs-clubs/web/common/components/Tag";
import { getTagDetail } from "@sparcs-clubs/web/utils/getTagDetail";
import type { StatusDetail } from "@sparcs-clubs/web/utils/getTagDetail";

import {
  type Members,
  MemberStatusEnum,
} from "../service/_mock/mockManageClub";

interface MembersTableProps {
  memberList: Members[];
}

const TagList: {
  [key in MemberStatusEnum]: StatusDetail;
} = {
  [MemberStatusEnum.Applied]: { text: "신청", color: "BLUE" },
  [MemberStatusEnum.Approved]: { text: "승인", color: "YELLOW" },
  [MemberStatusEnum.Rejected]: { text: "반려", color: "RED" },
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
    {memberList.map(member => {
      const { color, text } = getTagDetail(member.status, TagList);
      return (
        <TableRow isBorder key={member.studentId}>
          <TableCell type="Tag" width="10%" minWidth={90}>
            <Tag color={color}>{text}</Tag>
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
      );
    })}
  </TableWrapper>
);

export default MembersTable;
