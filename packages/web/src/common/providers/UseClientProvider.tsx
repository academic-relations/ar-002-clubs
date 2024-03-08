"use client";

/**
 * @file UseClientProvider.tsx
 * @description This file provides a provider that can be used to wrap components that use client-side rendering.
 * @author night@sparcs.org (Jiho Park)
 */

import React from "react";

import { ThemeProvider as StyledProvider } from "styled-components";

import theme from "@sparcs-clubs/web/styles/themes";

export const UseClientProvider: React.FC<React.PropsWithChildren> = ({
  children = <div />,
}) => (
  <main>
    {/* @ts-expect-error-next-line */}
    <StyledProvider theme={theme}>{children}</StyledProvider>
  </main>
);
