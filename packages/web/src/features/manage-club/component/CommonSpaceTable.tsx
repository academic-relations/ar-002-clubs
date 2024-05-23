import React from "react";
import TableCell from "@sparcs-clubs/web/common/components/Table/TableCell";
import {
  TableRow,
  TableWrapper,
} from "@sparcs-clubs/web/common/components/Table/TableWrapper";
import Tag, { TagColor } from "@sparcs-clubs/web/common/components/Tag";

import {
  formatDate,
  formatDateTime,
  formatTime,
} from "@sparcs-clubs/web/utils/Date/formateDate";
import { ApiCms006ResponseOk } from "@sparcs-clubs/interface/api/common-space/endpoint/apiCms006";
import { CommonSpaceUsageOrderStatusEnum } from "@sparcs-clubs/interface/common/enum/commonSpace.enum";

interface CommonSpaceTableProps {
  spaceList: ApiCms006ResponseOk;
}

interface TagDetail {
  text: string;
  color: TagColor;
}

const getStatusDetails = (status: number): TagDetail => {
  switch (status) {
    case CommonSpaceUsageOrderStatusEnum.Applied:
      return { text: "신청", color: "BLUE" };
    case CommonSpaceUsageOrderStatusEnum.Canceled:
      return { text: "취소", color: "GRAY" };
    case CommonSpaceUsageOrderStatusEnum.Used:
      return { text: "사용", color: "GREEN" };
    default:
      return { text: "None", color: "GRAY" };
  }
};

const CommonSpaceTable: React.FC<CommonSpaceTableProps> = ({ spaceList }) => (
  <TableWrapper>
    <TableRow>
      <TableCell type="Header" width="10%" minWidth={120}>
        상태
      </TableCell>
      <TableCell type="Header" width="20%">
        신청 일시
      </TableCell>
      <TableCell type="Header" width="10%">
        신청자
      </TableCell>
      <TableCell type="Header" width="16%">
        예약 일자
      </TableCell>
      <TableCell type="Header" width="16%">
        예약 시간
      </TableCell>
      <TableCell type="Header" width="28%">
        예약 호실
      </TableCell>
    </TableRow>
    {spaceList.items.map(space => (
      <TableRow isBorder>
        <TableCell type="Tag" width="10%" minWidth={120}>
          <Tag color={getStatusDetails(space.statusEnum).color}>
            {getStatusDetails(space.statusEnum).text}
          </Tag>
        </TableCell>
        <TableCell type="Default" width="20%">
          {formatDateTime(space.createdAt)}
        </TableCell>
        <TableCell type="Default" width="10%">
          {space.chargeStudentName}
        </TableCell>
        <TableCell type="Default" width="16%">
          {formatDate(space.startTerm)}
        </TableCell>
        <TableCell type="Default" width="16%">
          {formatTime(space.startTerm)} ~ {formatTime(space.endTerm)}
        </TableCell>
        <TableCell type="Default" width="28%">
          {space.spaceName}
        </TableCell>
      </TableRow>
    ))}
  </TableWrapper>
);

export default CommonSpaceTable;
