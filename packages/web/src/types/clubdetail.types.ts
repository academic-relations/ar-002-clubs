import type { TagColor } from "@sparcs-clubs/web/common/components/Tag";

interface RawClubDetail {
  id: number;
  name: string;
  type: string;
  characteristic: string;
  representative: string;
  advisor: string | null;
  totalMembers: number;
  divisionName: string;
  foundingYear: number;
  room: string;
}

interface ClubDetail {
  id: number;
  name: string;
  type: ClubType;
  characteristic: string;
  representative: string;
  advisor?: string;
  totalMembers: number;
  divisionName: string;
  foundingYear: number;
  room: string;
}

enum ClubType {
  Senate, // 상임동아리
  Regular, // 정동아리
  Provisional, // 가동아리
}

const fromObj = (clubObj: RawClubDetail) => {
  const clubTypeRelation = new Map<string, ClubType>();
  clubTypeRelation.set("상임동아리", ClubType.Senate);
  clubTypeRelation.set("정동아리", ClubType.Regular);
  clubTypeRelation.set("가동아리", ClubType.Provisional);

  const club: ClubDetail = {
    id: clubObj.id,
    name: clubObj.name,
    type: clubTypeRelation.get(clubObj.type.trim()) ?? ClubType.Provisional,
    representative: clubObj.representative,
    advisor: clubObj.advisor === null ? undefined : clubObj.advisor,
    totalMembers: clubObj.totalMembers,
    characteristic: clubObj.characteristic,
    divisionName: clubObj.divisionName,
    foundingYear: clubObj.foundingYear,
    room: clubObj.room,
  };

  return club;
};

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

const getClubType = (club: ClubDetail) => {
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

export type { ClubDetail };
export { fromObj, getClubType, getTagColorFromClubType };
