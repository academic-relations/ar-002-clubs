"use client";

import React from "react";
import styled from "styled-components";

import Icon from "@sparcs-clubs/web/common/components/Icon";

interface PaginationProps {
  totalPage: number;
  currentPage: number;
  limit: number;
  setPage: React.Dispatch<number>;
}

const PaginationInner = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 16px;
  align-items: center;
`;

const ButtonWrapper = styled.button`
  display: flex;
  border: none;
  padding: 0;
  background-color: ${({ theme }) => theme.colors.WHITE};
  cursor: pointer;
  flex-direction: row;
  align-items: center;
`;

const IndexBase = styled.div`
  width: 20px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.MEDIUM};
  font-size: 16px;
  line-height: 20px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WalkableIndex = styled(IndexBase)`
  color: ${({ theme }) => theme.colors.BLACK};
`;

const CurrentIndex = styled(IndexBase)`
  color: ${({ theme }) => theme.colors.PRIMARY};
`;

const getSliceIndice = (
  totalPage: number,
  currentPage: number,
  currentRange: number,
  limit: number,
  setPage: React.Dispatch<number>,
) => {
  const currentRangeStart = currentRange * limit + 1;
  const range = [];

  for (
    let i: number = currentRangeStart;
    i <= totalPage && i < currentRangeStart + limit;
    i += 1
  ) {
    if (i === currentPage) {
      range.push(<CurrentIndex key={i}>{i.toString()}</CurrentIndex>);
    } else {
      range.push(
        <ButtonWrapper key={i} onClick={() => setPage(i)}>
          <WalkableIndex>{i.toString()}</WalkableIndex>
        </ButtonWrapper>,
      );
    }
  }

  return range;
};

const moveToLeftRange = (
  currentRange: number,
  limit: number,
  setPage: React.Dispatch<number>,
): void => {
  const destPage: number = currentRange * limit;
  setPage(destPage);
};

const moveToRightRange = (
  currentRange: number,
  limit: number,
  setPage: React.Dispatch<number>,
): void => {
  const destPage: number = (currentRange + 1) * limit + 1;
  setPage(destPage);
};

const Pagination: React.FC<PaginationProps> = ({
  totalPage,
  currentPage,
  limit,
  setPage,
}) => {
  const currentRange = Math.floor((currentPage - 1) / limit);
  const lastRange = Math.floor(totalPage / limit);
  const rightArrowBool = totalPage % limit === 0;

  return (
    <PaginationInner>
      {currentRange > 0 && (
        <ButtonWrapper
          onClick={() => moveToLeftRange(currentRange, limit, setPage)}
          key="leftRange"
        >
          <Icon type="chevron_left" size={20} />
        </ButtonWrapper>
      )}
      {getSliceIndice(totalPage, currentPage, currentRange, limit, setPage)}
      {(lastRange - currentRange > 1 ||
        (lastRange - currentRange === 1 && !rightArrowBool)) && (
        <ButtonWrapper
          onClick={() => moveToRightRange(currentRange, limit, setPage)}
          key="rightRange"
        >
          <Icon type="chevron_right" size={20} />
        </ButtonWrapper>
      )}
    </PaginationInner>
  );
};

export default Pagination;
