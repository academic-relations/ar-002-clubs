"use client";

import React from "react";
import styled from "styled-components";

type Size = "sm" | "lg";

const SectionTitleInner = styled.div`
  position: relative;
  display: flex;
  gap: 20px;
  width: fit-content;
  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.sm}) {
    gap: 12px;
  }
`;

const IdentityBar = styled.div`
  position: relative;
  width: 4px;
  justify-content: stretch;
  background-color: ${({ theme }) => theme.colors.PRIMARY};
`;

const Title = styled.p<{ size: Size }>`
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: ${({ size }) => (size === "sm" ? "20px" : "24px")};
  line-height: ${({ size }) => (size === "sm" ? "28px" : "32px")};

  @media (max-width: ${({ theme }) => theme.responsive.BREAKPOINT.sm}) {
    font-size: ${({ size }) => (size === "sm" ? "16px" : "20px")};
    line-height: ${({ size }) => (size === "sm" ? "20px" : "24px")};
  }

  font-weight: ${({ theme }) => theme.fonts.WEIGHT.MEDIUM};
  color: ${({ theme }) => theme.colors.BLACK};
`;

interface SectionTitleProps extends React.PropsWithChildren {
  size?: Size;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  children = <div />,
  size = "sm",
}) => (
  <SectionTitleInner>
    <IdentityBar />
    <Title size={size}>{children}</Title>
  </SectionTitleInner>
);

export default SectionTitle;
