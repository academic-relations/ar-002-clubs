import { ClubTypeEnum } from "@sparcs-clubs/interface/common/enum/club.enum";

import type { TagColor } from "@sparcs-clubs/web/common/components/Tag";

interface RawClubDetail {
  id: number;
  name: string;
  type: string;
  characteristic: string;
  representative: string;
  advisor: string | null;
  totalMemberCnt: number;
  divisionName: string;
  foundingYear: number;
  room: string;
  description: string;
}

interface ClubDetail {
  id: number;
  name: string;
  type: string;
  characteristic: string;
  representative: string;
  advisor?: string;
  totalMemberCnt: number;
  divisionName: string;
  foundingYear: number;
  room: string;
  description: string;
}

const fromObj = (clubObj: RawClubDetail): ClubDetail => {
  const club: ClubDetail = {
    id: clubObj.id,
    name: clubObj.name,
    type: clubObj.type.trim(),
    representative: clubObj.representative,
    advisor: clubObj.advisor === null ? undefined : clubObj.advisor,
    totalMemberCnt: clubObj.totalMemberCnt,
    characteristic: clubObj.characteristic,
    divisionName: clubObj.divisionName,
    foundingYear: clubObj.foundingYear,
    room: clubObj.room,
    description: clubObj.description,
  };

  return club;
};

const getTagColorFromClubType = (
  clubType: ClubTypeEnum,
  isPermanent: boolean,
) => {
  let color: TagColor;

  switch (clubType) {
    case ClubTypeEnum.Regular:
      color = "BLUE";
      break;
    default:
      color = "ORANGE";
      break;
  }
  if (isPermanent) color = "GREEN";

  return color;
};

const getTagContentFromClubType = (
  clubType: ClubTypeEnum,
  isPermanent: boolean,
) => {
  let content: string;

  switch (clubType) {
    case ClubTypeEnum.Regular:
      content = "정동아리";
      break;
    default:
      content = "가동아리";
      break;
  }
  if (isPermanent) content = "상임동아리";

  return content;
};

const getTagColorFromDivision = (divisionName: string): TagColor => {
  switch (divisionName) {
    case "생활문화":
    case "사회":
      return "GREEN";
    case "연행예술":
    case "종교":
      return "BLUE";
    case "전시창작":
    case "구기체육":
      return "ORANGE";
    case "밴드음악":
    case "생활체육":
      return "PURPLE";
    case "이공학술":
    case "보컬음악":
      return "PINK";
    case "연주음악":
    case "인문학술":
      return "YELLOW";
    default:
      return "GREEN"; // 기본값 임의 지정
  }
};

export type { ClubDetail };
export {
  fromObj,
  getTagColorFromClubType,
  getTagColorFromDivision,
  getTagContentFromClubType,
};
