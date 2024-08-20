import { ClubTypeEnum } from "@sparcs-clubs/interface/common/enum/club.enum";

import type { TagColor } from "@sparcs-clubs/web/common/components/Tag";
import type { ClubCardProps } from "@sparcs-clubs/web/features/clubs/components/ClubCard";

const getTagColorFromClubType = (
  clubType: ClubTypeEnum,
  isPermanent: boolean,
) => {
  let color: TagColor;
  if (isPermanent) {
    color = "GREEN";
  } else if (clubType === ClubTypeEnum.Regular) {
    color = "BLUE";
  } else {
    color = "ORANGE";
  }
  return color;
};

const getClubType = (club: ClubCardProps["club"], mobile: boolean) => {
  let clubType: string;
  if (club.isPermanent) {
    clubType = mobile ? "상임" : "상임동아리";
  } else if (club.type === ClubTypeEnum.Regular) {
    clubType = mobile ? "정" : "정동아리";
  } else {
    clubType = mobile ? "가" : "가동아리";
  }
  return clubType;
};

export { getClubType, getTagColorFromClubType };
