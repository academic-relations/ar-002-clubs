import React from "react";
import styled from "styled-components";

import Typography from "@sparcs-clubs/web/common/components/Typography";

import Icon from "./Icon";

interface InfoProps {
  text: string;
  children?: React.ReactNode;
}

const InfoTextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;

const InfoChildWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  margin-left: 28px;
`;

const InfoInner = styled.div<{ gap: boolean }>`
  display: flex;
  flex-direction: column;
  padding: 12px 16px;
  align-items: flex-start;
  gap: ${({ gap }) => (gap ? "8px" : "0px")};
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

const ResponsiveIcon = styled(Icon)`
  font-size: 20px !important;

  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.sm}) {
    font-size: 16px !important;
  }
`;

const IconWrapper = styled.div`
  height: 24px;
  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.sm}) {
    height: 20px;
  }
  display: flex;
  align-items: center;
`;

const Info: React.FC<InfoProps> = ({ text, children = null }) => {
  const transformedChildren = React.Children.map(children, child => {
    if (React.isValidElement(child) && child.type === Typography) {
      return <ResponsiveTypography {...child.props} />;
    }
    return child;
  });
  return (
    <InfoInner gap={!!transformedChildren}>
      <InfoTextWrapper>
        <IconWrapper>
          <ResponsiveIcon type="info_outlined" size={20} />
        </IconWrapper>
        <ResponsiveTypography>{text}</ResponsiveTypography>
      </InfoTextWrapper>
      <InfoChildWrapper>{transformedChildren}</InfoChildWrapper>
    </InfoInner>
  );
};

export default Info;
