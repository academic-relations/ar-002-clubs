import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import classNames from "classnames";

import "@sparcs-clubs/web/styles/globals.css";

import Footer from "@sparcs-clubs/web/common/components/Footer";
import Header from "@sparcs-clubs/web/common/components/Header";
import ResponsiveContent from "@sparcs-clubs/web/common/components/Responsive";
import StyledComponentsRegistry from "@sparcs-clubs/web/common/libs/styledComponents/StyledComponentRegistry";
import { UseClientProvider } from "@sparcs-clubs/web/common/providers/UseClientProvider";
import {
  nanumSquare,
  pretendard,
  raleway,
} from "@sparcs-clubs/web/styles/fonts/googleFonts";

import DebugBadge from "../common/components/DebugBadge";
import { AuthProvider } from "../common/providers/AuthContext";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SPARCS Clubs for ClubsUA",
  description:
    "Created by SPARCS Academic Relations AR-002 TF Team, Copyright 2024",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html
    lang="ko-KR"
    className={classNames(
      nanumSquare.variable,
      pretendard.variable,
      raleway.variable,
    )}
  >
    <body>
      <AppRouterCacheProvider>
        <StyledComponentsRegistry>
          <UseClientProvider>
            <AuthProvider>
              <DebugBadge />
              <Header />
              <ResponsiveContent>{children}</ResponsiveContent>
              <Footer />
            </AuthProvider>
          </UseClientProvider>
        </StyledComponentsRegistry>
      </AppRouterCacheProvider>
    </body>
  </html>
);

export default RootLayout;
