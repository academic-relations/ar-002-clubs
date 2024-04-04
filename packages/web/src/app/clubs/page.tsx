"use client";

import React from "react";

import ClubsPageMainFrame from "@sparcs-clubs/web/features/clubs/frames/ClubsPageMainFrame";

import PageTitle from "@sparcs-clubs/web/common/components/PageTitle";
// import { DivisionType } from "@sparcs-clubs/web/types/divisions.types";

const Clubs = () => (
  <>
    <PageTitle>동아리 목록</PageTitle>
    <ClubsPageMainFrame />
  </>
);

export default Clubs;
