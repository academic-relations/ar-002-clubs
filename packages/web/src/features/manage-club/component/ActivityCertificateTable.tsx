import React from "react";

import TableCell from "@sparcs-clubs/web/common/components/Table/TableCell";
import {
  TableRow,
  TableWrapper,
} from "@sparcs-clubs/web/common/components/Table/TableWrapper";
import Tag, { TagColor } from "@sparcs-clubs/web/common/components/Tag";

import { ApiAcf003ResponseOk } from "@sparcs-clubs/interface/api/activity-certificate/endpoint/apiAcf003";
import { ActivityCertificateOrderStatusEnum } from "@sparcs-clubs/interface/common/enum/activityCertificate.enum";
import { formatDateTime } from "@sparcs-clubs/web/utils/Date/formateDate";

interface AcfTableProps {
  certificateList: ApiAcf003ResponseOk;
}

const getStatusDetails = (
  status: number,
): {
  text: string;
  color: TagColor;
} => {
  switch (status) {
    case ActivityCertificateOrderStatusEnum.Applied:
      return { text: "신청", color: "BLUE" };
    case ActivityCertificateOrderStatusEnum.Approved:
      return { text: "승인", color: "YELLOW" };
    case ActivityCertificateOrderStatusEnum.Issued:
      return { text: "발급", color: "GREEN" };
    case ActivityCertificateOrderStatusEnum.Rejected:
      return { text: "반려", color: "RED" };
    default:
      return { text: "None", color: "GRAY" };
  }
};
const ActivityCertificateTable: React.FC<AcfTableProps> = ({
  certificateList,
}) => (
  <TableWrapper>
    <TableRow>
      <TableCell type="Header" width="10%" minWidth={90}>
        상태
      </TableCell>
      <TableCell type="Header" width="50%">
        신청 일시
      </TableCell>
      <TableCell type="Header" width="20%" minWidth={180}>
        신청자
      </TableCell>
      <TableCell type="Header" width="20%" minWidth={180}>
        발급 매수
      </TableCell>
    </TableRow>
    {certificateList.items.map((certificate, index) => (
      <TableRow isBorder key={certificate.studentName + String(index)}>
        <TableCell type="Tag" width="10%" minWidth={90}>
          <Tag color={getStatusDetails(certificate.statusEnum).color}>
            {getStatusDetails(certificate.statusEnum).text}
          </Tag>
        </TableCell>
        <TableCell type="Default" width="50%">
          {formatDateTime(new Date(certificate.createdAt))}
        </TableCell>
        <TableCell type="Default" width="20%" minWidth={180}>
          {certificate.studentName}
        </TableCell>
        <TableCell type="Default" width="20%" minWidth={180}>
          {certificate.issuedNumber}매
        </TableCell>
      </TableRow>
    ))}
  </TableWrapper>
);

export default ActivityCertificateTable;
