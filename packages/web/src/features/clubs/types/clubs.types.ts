import type { TagColor } from "@sparcs-clubs/web/common/components/Tag";

// interface start
interface ClubInfo {
  id: number;
  name: string;
  description: string;
  type: ClubType;
  president: string;
  advisor?: string;
  members: number;
}

enum ClubType {
  Standing,
  Full,
  Associate,
}

const fromObj = clubobj => {
  const clubTypeRelation = new Map<string, ClubType>();
  clubTypeRelation.set("상임동아리", ClubType.Standing);
  clubTypeRelation.set("정동아리", ClubType.Full);
  clubTypeRelation.set("가동아리", ClubType.Associate);

  const club: ClubInfo = {
    id: clubobj.id,
    name: clubobj.clubName,
    description: clubobj.characteristicKr,
    type: clubTypeRelation.get(clubobj.clubType.trim()) ?? ClubType.Associate,
    president: clubobj.clubPresident,
    advisor: clubobj.advisor,
    members: clubobj.totalMembers,
  };

  return club;
};

const getTagcolorFromClubType = (clubType: ClubType) => {
  let color: TagColor;
  if (clubType === ClubType.Standing) {
    color = "GREEN";
  } else if (clubType === ClubType.Full) {
    color = "BLUE";
  } else {
    color = "ORANGE";
  }
  return color;
};

const getClubType = (club: ClubInfo) => {
  let clubType: string;
  if (club.type === ClubType.Standing) {
    clubType = "상임동아리";
  } else if (club.type === ClubType.Full) {
    clubType = "정동아리";
  } else {
    clubType = "가동아리";
  }
  return clubType;
};
// infertace end

export type { ClubInfo };
export { fromObj, getClubType, getTagcolorFromClubType };
