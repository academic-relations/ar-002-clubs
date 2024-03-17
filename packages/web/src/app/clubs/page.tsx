"use client";

import React from "react";

import { UseClientProvider } from "@sparcs-clubs/web/common/providers/UseClientProvider";

import ClubsPageMainFrame from "@sparcs-clubs/web/features/clubs/frames/ClubsPageMainFrame";
import mockupClubList from "@sparcs-clubs/web/features/clubs/types/mockupClubList";

const Clubs = () => (
  <UseClientProvider>
    <ClubsPageMainFrame
      clubClassesAndListsPairs={[
        ["생활문화", mockupClubList],
        ["other sections", []],
      ]}
    />
  </UseClientProvider>
);

export default Clubs;
