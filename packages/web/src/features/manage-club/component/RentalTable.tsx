import React from "react";

import { ApiRnt003ResponseOK } from "@sparcs-clubs/interface/api/rental/endpoint/apiRnt003";
import { RentalOrderStatusEnum } from "@sparcs-clubs/interface/common/enum/rental.enum";
import TableCell from "@sparcs-clubs/web/common/components/Table/TableCell";
import {
  TableRow,
  TableWrapper,
} from "@sparcs-clubs/web/common/components/Table/TableWrapper";
import Tag from "@sparcs-clubs/web/common/components/Tag";

import {
  formatDate,
  formatDateTime,
} from "@sparcs-clubs/web/utils/Date/formateDate";
import { getTagDetail } from "@sparcs-clubs/web/utils/getTagDetail";
import type { StatusDetail } from "@sparcs-clubs/web/utils/getTagDetail";

interface RentalTableProps {
  rentalList: ApiRnt003ResponseOK;
}

const TagList: {
  [key in RentalOrderStatusEnum]: StatusDetail;
} = {
  [RentalOrderStatusEnum.Applied]: { text: "신청", color: "BLUE" },
  [RentalOrderStatusEnum.Approved]: { text: "승인", color: "YELLOW" },
  [RentalOrderStatusEnum.Rented]: { text: "대여", color: "PURPLE" },
  [RentalOrderStatusEnum.Returned]: { text: "반납", color: "GREEN" },
};

const RentalTable: React.FC<RentalTableProps> = ({ rentalList }) => (
  <TableWrapper>
    <TableRow>
      <TableCell type="Header" width="10%" minWidth={90}>
        상태
      </TableCell>
      <TableCell type="Header" width="20%">
        신청 일시
      </TableCell>
      <TableCell type="Header" width="14%" minWidth={120}>
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
    {rentalList.items.map(rental => {
      const { color, text } = getTagDetail(rental.statusEnum, TagList);
      return (
        <TableRow key={rental.id} isBorder>
          <TableCell type="Tag" width="10%" minWidth={90}>
            <Tag color={color}>{text}</Tag>
          </TableCell>
          <TableCell type="Default" width="20%">
            {formatDateTime(rental.createdAt)}
          </TableCell>
          <TableCell type="Default" width="14%" minWidth={120}>
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
      );
    })}
  </TableWrapper>
);

export default RentalTable;
