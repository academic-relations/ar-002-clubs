"use client";

import React from "react";
import PageHead from "@sparcs-clubs/web/common/components/PageHead";
import ClubsPageMainFrame from "@sparcs-clubs/web/features/clubs/frames/ClubsPageMainFrame";
// import { DivisionType } from "@sparcs-clubs/web/types/divisions.types";

const Clubs = () => (
  <>
    <PageHead
      items={[{ name: "동아리 목록", path: "/clubs" }]}
      title="동아리 목록"
    />
    <ClubsPageMainFrame />
  </>
);

export default Clubs;
