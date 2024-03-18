"use client";

import { UseClientProvider } from "@sparcs-clubs/web/common/providers/UseClientProvider";
import ClubDetailMainFrame from "@sparcs-clubs/web/features/clubs/[id]/frames/ClubDetailMainFrame";
import { fromObj } from "@sparcs-clubs/web/types/clubdetail.types";

const rawClubDetail = {
  id: 1,
  name: "궁극의 맛",
  type: "정동아리\n",
  characteristic: "요리",
  representative: "장주원",
  advisor: null,
  totalMembers: 1,
  divisionName: "생활문화",
  foundingYear: 2015,
  room: "학부학생회관별관(N12) 3101호",
};

const clubDetail = fromObj(rawClubDetail);

const ClubDetail = () => (
  <UseClientProvider>
    <ClubDetailMainFrame club={clubDetail} />
  </UseClientProvider>
);
export default ClubDetail;
