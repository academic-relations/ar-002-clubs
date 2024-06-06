"use client";

import React from "react";

import { UseClientProvider } from "@sparcs-clubs/web/common/providers/UseClientProvider";
import MyClubsMainFrame from "@sparcs-clubs/web/features/my/clubs/frames/MyClubsMainFrame";

const MyClubs = () => (
  <UseClientProvider>
    <MyClubsMainFrame />
  </UseClientProvider>
);

export default MyClubs;
