import React from "react";

import styled from "styled-components";

import Typography from "@sparcs-clubs/web/common/components/Typography";
import { getMaxRental } from "@sparcs-clubs/web/utils/getMaxRental";

import { RentalLimitProps } from "../frames/RentalNoticeFrame";

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
  const itemList: string[] = [];
  const rental = formCtx.watch();

  if (
    rental.easel &&
    rental.easel > 0 &&
    getMaxRental(availableRentals, "easel") > rental.easel
  ) {
    itemList.push(`이젤 ${rental.easel}개`);
  }

  if (
    rental.vacuum &&
    ((rental.vacuum === "corded" &&
      getMaxRental(availableRentals, "Vacuum Corded") > 0) ||
      (rental.vacuum === "cordless" &&
        getMaxRental(availableRentals, "Vacuum Cordless") > 0))
  ) {
    itemList.push(`${rental.vacuum === "corded" ? "유선" : "무선"} 청소기`);
  }

  if (rental.handCart) {
    if (
      rental.handCart.rolltainer &&
      rental.handCart.rolltainer > 0 &&
      getMaxRental(availableRentals, "Hand Cart Rolltainer") >
        rental.handCart.rolltainer
    ) {
      itemList.push(`수레 > 롤테이너 ${rental.handCart.rolltainer}개`);
    }
    if (
      rental.handCart.large &&
      rental.handCart.large > 0 &&
      getMaxRental(availableRentals, "Hand Cart Large") > rental.handCart.large
    ) {
      itemList.push(`수레 > 대형 ${rental.handCart.large}개`);
    }
    if (
      rental.handCart.medium &&
      rental.handCart.medium > 0 &&
      getMaxRental(availableRentals, "Hand Cart Medium") >
        rental.handCart.medium
    ) {
      itemList.push(`수레 > 중형 ${rental.handCart.medium}개`);
    }
    if (
      rental.handCart.small &&
      rental.handCart.small > 0 &&
      getMaxRental(availableRentals, "Hand Cart Small") > rental.handCart.small
    ) {
      itemList.push(`수레 > 소형 ${rental.handCart.small}개`);
    }
  }

  if (
    rental.mat &&
    rental.mat > 0 &&
    getMaxRental(availableRentals, "Mat") > rental.mat
  ) {
    itemList.push(`돗자리 ${rental.mat}개`);
  }

  if (rental.tool) {
    if (
      rental.tool.powerDrill &&
      rental.tool.powerDrill > 0 &&
      getMaxRental(availableRentals, "Power Drill") > rental.tool.powerDrill
    ) {
      itemList.push(`공구 > 전동 드릴 세트 ${rental.tool.powerDrill}개`);
    }
    if (
      rental.tool.driver &&
      rental.tool.driver > 0 &&
      getMaxRental(availableRentals, "Driver") > rental.tool.driver
    ) {
      itemList.push(`공구 > 드라이버 세트 ${rental.tool.driver}개`);
    }
    if (
      rental.tool.superGlue &&
      rental.tool.superGlue > 0 &&
      getMaxRental(availableRentals, "Super Glue") > rental.tool.superGlue
    ) {
      itemList.push(`공구 > 순간접착제 ${rental.tool.superGlue}개`);
    }
    if (
      rental.tool.nipper &&
      rental.tool.nipper > 0 &&
      getMaxRental(availableRentals, "Nipper") > rental.tool.nipper
    ) {
      itemList.push(`공구 > 니퍼 ${rental.tool.nipper}개`);
    }
    if (
      rental.tool.plier &&
      rental.tool.plier > 0 &&
      getMaxRental(availableRentals, "Plier") > rental.tool.plier
    ) {
      itemList.push(`공구 > 펜치 ${rental.tool.plier}개`);
    }
    if (
      rental.tool.longNosePlier &&
      rental.tool.longNosePlier > 0 &&
      getMaxRental(availableRentals, "Long Nose Plier") >
        rental.tool.longNosePlier
    ) {
      itemList.push(`공구 > 롱노우즈 ${rental.tool.longNosePlier}개`);
    }
  }

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
