"use client";

import { usePathname } from "next/navigation";
import React from "react";

import NotFound from "@sparcs-clubs/web/app/not-found";
import { productionReadyPaths } from "@sparcs-clubs/web/constants/paths";

const PageContent = ({ children }: { children: React.ReactNode }) => {
  const path = usePathname();

  const isDevelopment = process.env.NEXT_PUBLIC_APP_MODE === "dev";
  const productionReady =
    (productionReadyPaths.exact.some(p => p.startsWith(path)) ||
      productionReadyPaths.startsWith.some(p => path.startsWith(p))) &&
    !productionReadyPaths.exclude.includes(path);

  if (!isDevelopment && !productionReady) {
    return <NotFound />;
  }

  return <>{children}</>;
};

export default PageContent;
