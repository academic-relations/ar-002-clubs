"use client";

import React from "react";

import { UseClientProvider } from "@sparcs-clubs/web/common/providers/UseClientProvider";
import MyPageMainFrame from "@sparcs-clubs/web/features/my/frames/MyPageMainFrame";

const My = () => (
  <UseClientProvider>
    <MyPageMainFrame />
  </UseClientProvider>
);

export default My;
