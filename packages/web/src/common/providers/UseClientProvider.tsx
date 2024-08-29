"use client";

/**
 * @file UseClientProvider.tsx
 * @description This file provides a provider that can be used to wrap components that use client-side rendering.
 * @author night@sparcs.org (Jiho Park)
 */

import React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { OverlayProvider } from "overlay-kit";
import { ThemeProvider as StyledProvider } from "styled-components";

import theme from "@sparcs-clubs/web/styles/themes";

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
          <OverlayProvider>{children}</OverlayProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </StyledProvider>
    </main>
  );
};
