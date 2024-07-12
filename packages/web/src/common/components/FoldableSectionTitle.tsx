"use client";

import React from "react";

import styled from "styled-components";

import SectionTitle from "@sparcs-clubs/web/common/components/SectionTitle";

const FoldableSectionOuter = styled.div`
  width: 100%;
`;

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

const ChildrenOuter = styled.div<{ margin?: string }>`
  margin-top: ${({ margin }) => margin};
  margin-left: 24px;
`;

const FoldableSectionTitle: React.FC<{
  title: string;
  toggle?: boolean;
  toggleHandler?: () => void;
  children?: React.ReactNode;
  childrenMargin?: string;
}> = ({
  title,
  toggle = null,
  toggleHandler = null,
  children = null,
  childrenMargin = "40px",
}) => {
  const [open, setOpen] = React.useState<boolean>(true);
  const openHandler = () => setOpen(!open);

  return (
    <FoldableSectionOuter>
      <FoldableSectionTitleInner>
        <SectionTitle size="lg">{title}</SectionTitle>
        <MoreInfo onClick={toggleHandler ?? openHandler}>
          {toggle ?? open ? `접기` : `펼치기`}
        </MoreInfo>
      </FoldableSectionTitleInner>
      {(toggle ?? open) && children && (
        <ChildrenOuter margin={childrenMargin}>{children}</ChildrenOuter>
      )}
    </FoldableSectionOuter>
  );
};

export default FoldableSectionTitle;
