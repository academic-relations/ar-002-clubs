import React from "react";
import styled from "styled-components";
import Icon from "./Icon";

const SerchInputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  padding: 8px 12px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.WHITE};
  border: 1px solid ${({ theme }) => theme.colors.GRAY[200]};
  align-items: center;
  flex: 1;
  &:hover {
    border-color: ${({ theme }) => theme.colors.GRAY[300]};
  }
  &:focus-within {
    border-color: ${({ theme }) => theme.colors.PRIMARY};
  }
`;

const SeachInput = styled.input`
  display: flex;
  flex-direction: row;
  flex: 1;
  outline: none;
  border: none;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 16px;
  line-height: 20px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};
  color: ${({ theme }) => theme.colors.BLACK};
  &::placeholder {
    color: ${({ theme }) => theme.colors.GRAY[200]};
  }
`;

const SearchInput = () => (
  <SerchInputWrapper>
    <Icon type="search" size={20} />
    <SeachInput placeholder="검색" />
  </SerchInputWrapper>
  //   TODO: SearchInput 기능 넣기
);

export default SearchInput;
