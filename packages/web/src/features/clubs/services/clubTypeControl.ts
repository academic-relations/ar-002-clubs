import { ClubType } from "@sparcs-clubs/interface/common/enum/clubs";

import type { TagColor } from "@sparcs-clubs/web/common/components/Tag";
import type { ClubInfo } from "@sparcs-clubs/web/types/clubs.types";

const getTagColorFromClubType = (clubType: ClubType) => {
  let color: TagColor;
  if (clubType === ClubType.Senate) {
    color = "GREEN";
  } else if (clubType === ClubType.Regular) {
    color = "BLUE";
  } else {
    color = "ORANGE";
  }
  return color;
};

const getClubType = (club: ClubInfo) => {
  let clubType: string;
  if (club.type === ClubType.Senate) {
    clubType = "상임동아리";
  } else if (club.type === ClubType.Regular) {
    clubType = "정동아리";
  } else {
    clubType = "가동아리";
  }
  return clubType;
};

export { ClubType, getClubType, getTagColorFromClubType };
