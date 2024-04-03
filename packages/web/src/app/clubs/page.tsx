"use client";

import React from "react";

import { UseClientProvider } from "@sparcs-clubs/web/common/providers/UseClientProvider";

import ClubsPageMainFrame from "@sparcs-clubs/web/features/clubs/frames/ClubsPageMainFrame";
import mockupClubDivisions from "@sparcs-clubs/web/features/clubs/types/mockupClubDivisions";
import PageTitle from "@sparcs-clubs/web/common/components/PageTitle";
import { DivisionType } from "@sparcs-clubs/web/types/divisions.types";

const Clubs = () => (
  <UseClientProvider>
    <PageTitle>동아리 목록</PageTitle>
    {Object.entries(DivisionType).map(([_divisionKey, divisionValue]) => (
      <ClubsPageMainFrame
        key={_divisionKey}
        clubDivisionAndListsPairs={[
          [divisionValue, mockupClubDivisions.get(divisionValue)!],
        ]}
      />
    ))}
  </UseClientProvider>
);

export default Clubs;
