import type { Metadata } from "next";

import classNames from "classnames";

import "@sparcs-clubs/web/styles/globals.css";

import { pretendard } from "@sparcs-clubs/web/styles/fonts/googleFonts";
import StyledComponentsRegistry from "@sparcs-clubs/web/common/libs/styledComponents/StyledComponentRegistry";
import Header from "@sparcs-clubs/web/common/components/Header";
import { constants } from "@sparcs-clubs/web/constants";

export const metadata: Metadata = {
  title: "SPARCS Academic Relations Team",
  description: "Frontend Standard Stack v1.0.0",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="ko-KR" className={classNames(pretendard.variable)}>
    <body>
      <StyledComponentsRegistry>
        <Header paths={constants.paths} />
        {children}
      </StyledComponentsRegistry>
    </body>
  </html>
);

export default RootLayout;
