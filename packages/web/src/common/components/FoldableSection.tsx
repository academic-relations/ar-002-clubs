"use client";

import React from "react";

import isPropValid from "@emotion/is-prop-valid";
import styled from "styled-components";

import TextButton from "@sparcs-clubs/web/common/components/Buttons/TextButton";

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
        <Typography fs={20} lh={24} fw="MEDIUM">
          {title}
        </Typography>
        <TextButton
          fs={14}
          fw="REGULAR"
          color="BLACK"
          text={toggle ?? open ? `접기` : `펼치기`}
          onClick={toggleHandler ?? openHandler}
        />
      </FoldableSectionInner>
      {(toggle ?? open) && children && (
        <ChildrenOuter margin={childrenMargin}>{children}</ChildrenOuter>
      )}
    </FoldableSectionOuter>
  );
};

export default FoldableSection;
