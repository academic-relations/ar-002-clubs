"use client";

import React from "react";

import { UseClientProvider } from "@sparcs-clubs/web/common/providers/UseClientProvider";
import MyPageMainFrame from "@sparcs-clubs/web/features/my/frames/MyPageMainFrame";
import mockMyClubList from "@sparcs-clubs/web/features/my/types/mockMyClubList";

const My = () => (
  <UseClientProvider>
    <MyPageMainFrame myClubList={mockMyClubList} />
  </UseClientProvider>
);

export default My;
