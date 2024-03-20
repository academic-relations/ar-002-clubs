"use client";

import React from "react";

import { UseClientProvider } from "@sparcs-clubs/web/common/providers/UseClientProvider";

import ClubsPageMainFrame from "@sparcs-clubs/web/features/clubs/frames/ClubsPageMainFrame";
import mockupClubDivisions from "@sparcs-clubs/web/features/clubs/types/mockupClubDivisions";
import PageTitle from "@sparcs-clubs/web/common/components/PageTitle";

/** 20240320 기준으로 번역 단어장에 각 division 이름에 대한 번역이 존재하지 않아 임시로 제작한 번역이기 때문에 추후 올바르게 수정 요망 */
enum ClubDivision {
  LifeCulture = "생활문화",
  PerformingArts = "연행예술",
  ExhibitionCreation = "전시창작",
  BandMusic = "밴드음악",
  VocalMusic = "보컬음악",
  InstrumentalMusic = "연주음악",
  Society = "사회",
  Religion = "종교",
  BallSports = "구기체육",
  LifeSports = "생활체육",
  ScienceEngineeringAcademics = "이공학술",
  HumanitiesAcademics = "인문학술",
}

const Clubs = () => (
  <UseClientProvider>
    <PageTitle>동아리 목록</PageTitle>
    {Object.entries(ClubDivision).map(([_divisionKey, divisionValue]) => (
      <ClubsPageMainFrame
        clubDivisionAndListsPairs={[
          [divisionValue, mockupClubDivisions.get(divisionValue)!],
        ]}
      />
    ))}
  </UseClientProvider>
);

export default Clubs;
