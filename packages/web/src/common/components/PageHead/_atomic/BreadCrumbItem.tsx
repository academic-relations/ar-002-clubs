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

const ResponsiveTypography = styled(Typography)`
  font-size: 16px;
  line-height: 20px;

  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.sm}) {
    font-size: 14px;
    line-height: 16px;
  }
`;

const BreadCrumbItem: React.FC<BreadCrumbItemProps> = ({
  text,
  onClick = () => {},
  disabled = false,
}) => (
  <BreadCrumbInner disabled={disabled}>
    <ResponsiveTypography fw="MEDIUM" onClick={!disabled ? onClick : undefined}>
      {text}
    </ResponsiveTypography>
  </BreadCrumbInner>
);

export default BreadCrumbItem;
