"use client";

import React from "react";

import isPropValid from "@emotion/is-prop-valid";
import styled from "styled-components";

import Typography from "./Typography";

const FoldableSectionOuter = styled.div`
  width: 100%;
`;

const FoldableSectionInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  width: 100%;
`;

const MoreInfo = styled.div`
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 14px;
  line-height: 20px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.REGULAR};
  color: ${({ theme }) => theme.colors.BLACK};
  text-decoration-line: underline;
  cursor: pointer;
`;

const ChildrenOuter = styled.div.withConfig({
  shouldForwardProp: prop => isPropValid(prop),
})<{ margin?: string }>`
  margin-top: ${({ margin }) => margin};
`;

const FoldableSection: React.FC<{
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
      <FoldableSectionInner>
        <Typography type="h3">{title}</Typography>
        <MoreInfo onClick={toggleHandler ?? openHandler}>
          {toggle ?? open ? `접기` : `펼치기`}
        </MoreInfo>
      </FoldableSectionInner>
      {(toggle ?? open) && children && (
        <ChildrenOuter margin={childrenMargin}>{children}</ChildrenOuter>
      )}
    </FoldableSectionOuter>
  );
};

export default FoldableSection;
