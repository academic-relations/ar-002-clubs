import React from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { OverlayProvider } from "overlay-kit";
import { ThemeProvider as StyledProvider } from "styled-components";

import theme from "../src/styles/themes";

import GlobalStyle from "../src/styles/GlobalStyle";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchInterval: false,
      refetchIntervalInBackground: false,
      refetchOnReconnect: false,
      structuralSharing: false,
      retry: false,
    },
  },
});

const StoryProvider = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      {/* @ts-expect-error-next-line */}
      <StyledProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <OverlayProvider>{children}</OverlayProvider>
        </QueryClientProvider>
      </StyledProvider>
    </>
  );
};

export default StoryProvider;
