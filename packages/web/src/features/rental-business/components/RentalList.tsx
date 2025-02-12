import React from "react";
import styled from "styled-components";

import Typography from "@sparcs-clubs/web/common/components/Typography";

import { RentalLimitProps } from "../frames/RentalNoticeFrame";
import { getRentalList } from "../utils/isRentalEmpty";

const RentalListContainer = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const RentalListItem = styled.li`
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};
  font-size: 16px;
  line-height: 20px;

  &:before {
    content: "• ";
    padding-right: 8px;
  }

  &:not(:last-child) {
    margin-bottom: 16px;
  }
`;

const RentalList: React.FC<RentalLimitProps> = ({
  formCtx,
  availableRentals,
}) => {
  const currentValues = formCtx.watch();
  const itemList = getRentalList("all", currentValues, availableRentals);

  const listItems = itemList.map(item => (
    <RentalListItem key={item}>{item}</RentalListItem>
  ));

  return (
    <RentalListContainer>
      {itemList.length > 0 ? (
        listItems
      ) : (
        <Typography fs={16} lh={20} color="GRAY.300">
          선택한 물품이 없습니다
        </Typography>
      )}
    </RentalListContainer>
  );
};

export default RentalList;
