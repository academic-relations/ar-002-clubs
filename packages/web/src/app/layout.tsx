import type { Metadata } from "next";

import classNames from "classnames";

import "@sparcs-clubs/web/styles/globals.css";

import {
  pretendard,
  raleway,
} from "@sparcs-clubs/web/styles/fonts/googleFonts";
import StyledComponentsRegistry from "@sparcs-clubs/web/common/libs/styledComponents/StyledComponentRegistry";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

import Header from "@sparcs-clubs/web/common/components/Header";
import Footer from "@sparcs-clubs/web/common/components/Footer";

import { UseClientProvider } from "@sparcs-clubs/web/common/providers/UseClientProvider";
import ResponsiveContent from "@sparcs-clubs/web/common/components/Responsive";
import DebugBadge from "../common/components/DebugBadge";

export const metadata: Metadata = {
  title: "SPARCS Clubs for ClubsUA",
  description:
    "Created by SPARCS Academic Relations AR-002 TF Team, Copyright 2024",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html
    lang="ko-KR"
    className={classNames(pretendard.variable, raleway.variable)}
  >
    <body>
      <AppRouterCacheProvider>
        <StyledComponentsRegistry>
          <UseClientProvider>
            <DebugBadge />
            <Header />
            <ResponsiveContent>{children}</ResponsiveContent>
            <Footer />
          </UseClientProvider>
        </StyledComponentsRegistry>
      </AppRouterCacheProvider>
    </body>
  </html>
);

export default RootLayout;
