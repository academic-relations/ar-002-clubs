import React from "react";

import styled from "styled-components";

import Typography from "@sparcs-clubs/web/common/components/Typography";

interface BreadCrumbItemProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
}

const BreadCrumbInner = styled.div<{ disabled: boolean }>`
  color: ${({ theme, disabled }) =>
    disabled ? theme.colors.GRAY[300] : theme.colors.PRIMARY};
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
`;

const BreadCrumbItem: React.FC<BreadCrumbItemProps> = ({
  text,
  onClick = () => {},
  disabled = false,
}) => (
  <BreadCrumbInner disabled={disabled}>
    <Typography type="p_b" onClick={!disabled ? onClick : undefined}>
      {text}
    </Typography>
  </BreadCrumbInner>
);

export default BreadCrumbItem;
