"use client";

import React from "react";

import { usePathname } from "next/navigation";

import NotFound from "@sparcs-clubs/web/app/not-found";
import { productionReadyPaths } from "@sparcs-clubs/web/constants/paths";

const PageContent = ({ children }: { children: React.ReactNode }) => {
  const path = usePathname();

  const isDevelopment = process.env.NEXT_PUBLIC_APP_MODE === "dev";
  const productionReady = productionReadyPaths
    .map(p => p.startsWith(path))
    .some(p => p);

  if (!isDevelopment && !productionReady) {
    return <NotFound />;
  }

  return <>{children}</>;
};

export default PageContent;
