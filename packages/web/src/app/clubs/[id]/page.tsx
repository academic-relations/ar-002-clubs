"use client";

import { UseClientProvider } from "@sparcs-clubs/web/common/providers/UseClientProvider";
import ClubDetailMainFrame from "@sparcs-clubs/web/features/clubDetails/frames/ClubDetailMainFrame";
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
  description:
    "'궁극의 맛'은 카이스트 유일 요리친목동아리 궁극의 맛입니다! 자세한 사항은 인스타그램 @the_ult_taste 를 참고해주세요!",
};

const clubDetail = fromObj(rawClubDetail);

const ClubDetail = () => (
  <UseClientProvider>
    <ClubDetailMainFrame club={clubDetail} />
  </UseClientProvider>
);
export default ClubDetail;
