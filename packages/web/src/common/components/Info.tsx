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
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.GRAY[200]};
  background: ${({ theme }) => theme.colors.WHITE};
`;

const Info: React.FC<InfoProps> = ({ text }) => (
  <InfoInner>
    <Icon type="info_outlined" size={20} />
    <Typography type="p">{text}</Typography>
  </InfoInner>
);

export default Info;
