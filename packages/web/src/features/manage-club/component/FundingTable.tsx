import React from "react";

import TableCell from "@sparcs-clubs/web/common/components/Table/TableCell";
import {
  TableRow,
  TableWrapper,
} from "@sparcs-clubs/web/common/components/Table/TableWrapper";
import Tag, { TagColor } from "@sparcs-clubs/web/common/components/Tag";

import {
  ActivityStatusEnum,
  type Funding,
} from "../service/_mock/mockManageClub";

interface FundingTableProps {
  fundingList: Funding[];
}

interface StatusDetail {
  text: string;
  color: TagColor;
}

const getStatusDetails = (status: number): StatusDetail => {
  switch (status) {
    case ActivityStatusEnum.Writing:
      return { text: "작성 중", color: "BLUE" };
    case ActivityStatusEnum.Applied:
      return { text: "신청 완료", color: "PURPLE" };
    case ActivityStatusEnum.Approved:
      return { text: "승인 완료", color: "GREEN" };
    case ActivityStatusEnum.Rejected:
      return { text: "신청 반려", color: "RED" };
    default:
      return { text: "None", color: "GRAY" };
  }
};

const FundingTable: React.FC<FundingTableProps> = ({ fundingList }) => {
  const totalRequested = fundingList.reduce(
    (sum, funding) => sum + funding.requestedAmount,
    0,
  );
  const totalApproved = fundingList.reduce(
    (sum, funding) =>
      sum + (funding.approvedAmount === null ? 0 : funding.approvedAmount),
    0,
  );

  return (
    <TableWrapper>
      <TableRow>
        <TableCell type="Header" width="10%" minWidth={120}>
          상태
        </TableCell>
        <TableCell type="Header" width="50%">
          활동명
        </TableCell>
        <TableCell type="Header" width="20%">
          항목명
        </TableCell>
        <TableCell type="Header" width="10%">
          신청 금액
        </TableCell>
        <TableCell type="Header" width="10%">
          승인 금액
        </TableCell>
      </TableRow>
      {fundingList.map(funding => (
        <TableRow isBorder>
          <TableCell type="Tag" width="10%" minWidth={120}>
            <Tag color={getStatusDetails(funding.status).color}>
              {getStatusDetails(funding.status).text}
            </Tag>
          </TableCell>
          <TableCell type="Default" width="50%">
            {funding.name}
          </TableCell>
          <TableCell type="Default" width="20%">
            {funding.itemName}
          </TableCell>
          <TableCell type="Default" width="10%">
            {funding.requestedAmount.toLocaleString()}원
          </TableCell>
          <TableCell type="Default" width="10%">
            {funding.approvedAmount === null
              ? "-"
              : `${funding.approvedAmount.toLocaleString()}원`}
          </TableCell>
        </TableRow>
      ))}
      <TableRow>
        <TableCell type="Default" width="80%">
          {" "}
        </TableCell>
        <TableCell type="Default" width="10%">
          {totalRequested.toLocaleString()}원
        </TableCell>
        <TableCell type="Default" width="10%">
          {totalApproved === null ? "-" : `${totalApproved.toLocaleString()}원`}
        </TableCell>
      </TableRow>
    </TableWrapper>
  );
};

export default FundingTable;
