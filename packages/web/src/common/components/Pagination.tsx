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
  flex-basis: auto;
  flex-grow: 0;
  flex-shrink: 0;
  display: flex;
  flex-direction: row;
  column-gap: 16px;
`;

// 버튼 스타일 지우기 위해 구성했는데, 올바른 방법인지 잘 모르겠습니다.
const ButtonWrapper = styled.button`
  border: none;
  padding: 0;
  background-color: ${({ theme }) => theme.colors.WHITE};
`;

const WalkableIndex = styled.div`
  width: 20px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.MEDIUM};
  font-size: 16px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.BLACK};
  text-align: center;
`;

const CurrentIndex = styled.div`
  width: 20px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.MEDIUM};
  font-size: 16px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.PRIMARY};
  text-align: center;
`;

const getSliceIndice = (
  totalPage: number,
  currentPage: number,
  currentRange: number,
  limit: number,
  setPage: React.Dispatch<number>,
) => {
  // 구간 시작 페이지
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
        <ButtonWrapper key={i}>
          <WalkableIndex onClick={() => setPage(i)}>
            {i.toString()}
          </WalkableIndex>
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
  // 현재 페이지 구간. 0: 1 ~ 10, 1: 11 ~ 20, ...
  // 페이지는 1부터 시작하기 때문에, 1 뺴고 나누어야 구간이 맞더라구요
  // TODO: totalPage % limit 이 0일 경우 마지막에 빈 페이지가 생기는 문제 해결
  const currentRange = Math.floor((currentPage - 1) / limit);
  const lastRange = Math.floor(totalPage / limit);
  return (
    <PaginationInner>
      {currentRange > 0 ? (
        <ButtonWrapper
          onClick={() => moveToLeftRange(currentRange, limit, setPage)}
          key="leftRange"
        >
          <Icon type="chevron_left" size={20} />
        </ButtonWrapper>
      ) : (
        <div />
      )}
      {getSliceIndice(totalPage, currentPage, currentRange, limit, setPage)}
      {currentRange < lastRange ? (
        <ButtonWrapper
          onClick={() => moveToRightRange(currentRange, limit, setPage)}
          key="rightRange"
        >
          <Icon type="chevron_right" size={20} />
        </ButtonWrapper>
      ) : (
        <div />
      )}
    </PaginationInner>
  );
};

export default Pagination;
