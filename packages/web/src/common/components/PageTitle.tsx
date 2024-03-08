"use client";

import React from "react";
import styled from "styled-components";

const PageTitleInner = styled.div`
  position: relative;
  width: fit-content;
  font-family: ${({ theme }) => theme.fonts.FAMILY.PRETENDARD};
  font-size: 32px;
  line-height: 48px;
  font-weight: ${({ theme }) => theme.fonts.WEIGHT.SEMIBOLD};
  color: ${({ theme }) => theme.colors.BLACK};
`;

const PageTitle: React.FC<React.PropsWithChildren> = ({
  children = <div />,
}) => <PageTitleInner>{children}</PageTitleInner>;

export default PageTitle;
