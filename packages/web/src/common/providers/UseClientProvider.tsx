"use client";

/**
 * @file UseClientProvider.tsx
 * @description This file provides a provider that can be used to wrap components that use client-side rendering.
 * @author night@sparcs.org (Jiho Park)
 */

import React from "react";
import styled, { ThemeProvider as StyledProvider } from "styled-components";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Header from "@sparcs-clubs/web/common/components/Header";
import Footer from "@sparcs-clubs/web/common/components/Footer";

import theme from "@sparcs-clubs/web/styles/themes";

const ResponsiveContent = styled.div`
  width: 1120px;
  min-height: calc(100vh - 105px - 160px);
  margin: 80px auto;

  @media (max-width: 1440px) {
    width: 880px;
  }

  @media (max-width: 1200px) {
    width: 640px;
  }

  @media (max-width: 960px) {
    width: 560px;
    min-height: calc(100vh - 105px - 80px);
    margin: 40px auto;
  }

  @media (max-width: 720px) {
    width: calc(100% - 40px);
    min-height: calc(100vh - 105px - 40px);
    margin: 20px;
  }
`;

export const UseClientProvider: React.FC<React.PropsWithChildren> = ({
  children = <div />,
}) => {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime

            // above 0 to avoid refetching immediately on the client

            staleTime: 60 * 1000,
          },
        },
      }),
  );

  return (
    <main>
      {/* @ts-expect-error-next-line */}
      <StyledProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <Header />
          <ResponsiveContent>{children}</ResponsiveContent>
          <Footer />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </StyledProvider>
    </main>
  );
};
