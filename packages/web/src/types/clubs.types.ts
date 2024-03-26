import type { TagColor } from "@sparcs-clubs/web/common/components/Tag";

// apiClb001 응답의 clubs에 대응되는 타입입니다.
interface RawClubsData {
  id: number;
  name: string;
  type: string;
  characteristic: string;
  representative: string;
  advisor: string | null;
  totalMemberCnt: number;
}

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
  Senate, // 상임동아리
  Regular, // 정동아리
  Provisional, // 가동아리
}

const fromObj = (clubObj: RawClubsData) => {
  const clubTypeRelation = new Map<string, ClubType>();
  clubTypeRelation.set("상임동아리", ClubType.Senate);
  clubTypeRelation.set("정동아리", ClubType.Regular);
  clubTypeRelation.set("가동아리", ClubType.Provisional);

  const club: ClubInfo = {
    id: clubObj.id,
    name: clubObj.name,
    type: clubTypeRelation.get(clubObj.type.trim()) ?? ClubType.Provisional,
    description: clubObj.characteristic,
    president: clubObj.representative,
    advisor: clubObj.advisor === null ? undefined : clubObj.advisor,
    members: clubObj.totalMemberCnt,
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

export type { ClubInfo, RawClubsData };
export { ClubType, fromObj, getClubType, getTagColorFromClubType };
