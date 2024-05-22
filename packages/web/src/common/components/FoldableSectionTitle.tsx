"use client";

import React from "react";
import styled from "styled-components";

import SectionTitle from "@sparcs-clubs/web/common/components/SectionTitle";

const FoldableSectionTitleInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  width: 100%;
`;

export const MoreInfo = styled.div`
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 14px;
  line-height: 20px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};
  color: ${({ theme }) => theme.colors.BLACK};
  text-decoration-line: underline;
  cursor: pointer;
`;

const FoldableSectionTitle: React.FC<{
  title: string;
  toggle: boolean;
  toggleHandler: () => void;
}> = ({ title, toggle, toggleHandler }) => (
  <FoldableSectionTitleInner>
    <SectionTitle size="lg">{title}</SectionTitle>
    <MoreInfo onClick={toggleHandler}>{toggle ? `접기` : `펼치기`}</MoreInfo>
  </FoldableSectionTitleInner>
);

export default FoldableSectionTitle;
