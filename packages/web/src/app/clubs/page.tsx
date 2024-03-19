"use client";

import React from "react";

import ClubsPageMainFrame from "@sparcs-clubs/web/features/clubs/frames/ClubsPageMainFrame";
import mockupClubList from "@sparcs-clubs/web/features/clubs/types/mockupClubList";

const Clubs = () => (
  <ClubsPageMainFrame
    clubDivisionAndListsPairs={[["생활문화", mockupClubList]]}
  />
);

export default Clubs;
