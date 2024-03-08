"use client";

/**
 * @file UseClientProvider.tsx
 * @description This file provides a provider that can be used to wrap components that use client-side rendering.
 * @author night@sparcs.org (Jiho Park)
 */

import React from "react";

import styled, { ThemeProvider as StyledProvider } from "styled-components";

import theme from "@sparcs-clubs/web/styles/themes";

const ResponsiveContent = styled.div`
  width: 1120px;
  margin: 80px auto;

  @media (max-width: 1440px) {
    width: 880px;
  }

  @media (max-width: 1200px) {
    width: 640px;
  }

  @media (max-width: 960px) {
    width: 560px;
    margin: 40px auto;
  }

  @media (max-width: 720px) {
    width: calc(100% - 40px);
    margin: 20px;
  }
`;

export const UseClientProvider: React.FC<React.PropsWithChildren> = ({
  children = <div />,
}) => (
  <main>
    {/* @ts-expect-error-next-line */}
    <StyledProvider theme={theme}>
      <ResponsiveContent>{children}</ResponsiveContent>
    </StyledProvider>
  </main>
);
