import React from "react";

import styled from "styled-components";

import Typography from "@sparcs-clubs/web/common/components/Typography";

import Icon from "./Icon";

interface InfoProps {
  text: string;
}

const InfoInner = styled.div`
  display: flex;
  padding: 12px 16px;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.GRAY[200]};
  background: ${({ theme }) => theme.colors.WHITE};
`;

const ResponsiveTypography = styled(Typography)`
  font-size: 16px;
  line-height: 24px;

  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.sm}) {
    font-size: 14px;
    line-height: 20px;
  }
`;

const Info: React.FC<InfoProps> = ({ text }) => (
  <InfoInner>
    <Icon type="info_outlined" size={20} />
    <ResponsiveTypography fw="REGULAR">{text}</ResponsiveTypography>
  </InfoInner>
);

export default Info;
