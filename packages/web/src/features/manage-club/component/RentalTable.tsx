import React from "react";

import TableCell from "@sparcs-clubs/web/common/components/Table/TableCell";
import {
  TableRow,
  TableWrapper,
} from "@sparcs-clubs/web/common/components/Table/TableWrapper";
import Tag, { TagColor } from "@sparcs-clubs/web/common/components/Tag";

import { RentalOrderStatusEnum } from "@sparcs-clubs/interface/common/enum/rental.enum";
import {
  formatDate,
  formatDateTime,
} from "@sparcs-clubs/web/utils/Date/formateDate";
import { ApiRnt003ResponseOK } from "@sparcs-clubs/interface/api/rental/endpoint/apiRnt003";

interface TagDetail {
  text: string;
  color: TagColor;
}

const getStatusDetails = (status: number): TagDetail => {
  switch (status) {
    case RentalOrderStatusEnum.Applied:
      return { text: "신청", color: "BLUE" };
    case RentalOrderStatusEnum.Approved:
      return { text: "승인", color: "YELLOW" };
    case RentalOrderStatusEnum.Rented:
      return { text: "대여", color: "PURPLE" };
    case RentalOrderStatusEnum.Returned:
      return { text: "반납", color: "GREEN" };
    default:
      return { text: "None", color: "GRAY" };
  }
};

interface RentalTableProps {
  rentalList: ApiRnt003ResponseOK;
}

const RentalTable: React.FC<RentalTableProps> = ({ rentalList }) => (
  <TableWrapper>
    <TableRow>
      <TableCell type="Header" width="10%" minWidth={120}>
        상태
      </TableCell>
      <TableCell type="Header" width="20%">
        신청 일시
      </TableCell>
      <TableCell type="Header" width="14%">
        신청자
      </TableCell>
      <TableCell type="Header" width="18%">
        대여 일자
      </TableCell>
      <TableCell type="Header" width="18%">
        반납 일자
      </TableCell>
      <TableCell type="Header" width="20%">
        대여 물품
      </TableCell>
    </TableRow>
    {rentalList.items.map(rental => (
      <TableRow key={rental.id} isBorder>
        <TableCell type="Tag" width="10%" minWidth={120}>
          <Tag color={getStatusDetails(rental.statusEnum).color}>
            {getStatusDetails(rental.statusEnum).text}
          </Tag>
        </TableCell>
        <TableCell type="Default" width="20%">
          {formatDateTime(rental.createdAt)}
        </TableCell>
        <TableCell type="Default" width="14%">
          {rental.studentName}
        </TableCell>
        <TableCell type="Default" width="18%">
          {formatDate(rental.desiredStart)}
        </TableCell>
        <TableCell type="Default" width="18%">
          {formatDate(rental.desiredEnd)}
        </TableCell>
        <TableCell type="Default" width="20%">
          {rental.objects[0].name} {rental.objects[0].number}개 외{" "}
          {rental.objects.length - 1}항목
        </TableCell>
      </TableRow>
    ))}
  </TableWrapper>
);

export default RentalTable;
