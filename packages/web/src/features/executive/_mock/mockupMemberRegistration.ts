import { randomInt } from "node:crypto";

import { ClubTypeEnum } from "@sparcs-clubs/interface/common/enum/club.enum";

const clubType = [ClubTypeEnum.Provisional, ClubTypeEnum.Regular];

const isClubPermanent = [true, false];

const items = Array.from({ length: 120 }, (_, index) => ({
  division: randomInt(1, 15), // 랜덤 상태 선택
  id: index + 1,
  type: clubType[index % clubType.length],
  approvedAll: 120,
  approvedRegular: 90,
  registeredAll: 200,
  registeredRegular: 100,
  clubName: "술박스",
  isPermanent: isClubPermanent[index % isClubPermanent.length],
}));

const mockupRegistrationMember = {
  items,
  total: items.length,
  offset: 1,
};

export default mockupRegistrationMember;
