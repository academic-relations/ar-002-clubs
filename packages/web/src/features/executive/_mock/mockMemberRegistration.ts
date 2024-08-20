import { ClubTypeEnum } from "@sparcs-clubs/interface/common/enum/club.enum";

import { DivisionType } from "@sparcs-clubs/web/types/divisions.types";

const divisionType = [
  DivisionType.LifeCulture,
  DivisionType.PerformingArts,
  DivisionType.ExhibitionCreation,
  DivisionType.BandMusic,
  DivisionType.VocalMusic,
  DivisionType.InstrumentalMusic,
  DivisionType.Society,
  DivisionType.Religion,
  DivisionType.BallSports,
  DivisionType.LifeSports,
  DivisionType.ScienceEngineeringAcademics,
  DivisionType.HumanitiesAcademics,
];

const clubType = [ClubTypeEnum.Provisional, ClubTypeEnum.Regular];

const isClubPermanent = [true, false];
const items = Array.from({ length: 120 }, (_, index) => ({
  division: divisionType[Math.floor(Math.random() * divisionType.length)], // 랜덤 상태 선택
  id: index + 1,
  type: clubType[Math.floor(Math.random() * clubType.length)],
  approvedAll: 120,
  approvedRegular: 90,
  registeredAll: 200,
  registeredRegular: 100,
  clubName: "술박스",
  isPermanent:
    isClubPermanent[Math.floor(Math.random() * isClubPermanent.length)],
}));

const mockupRegistrationMember = {
  total: items.length, // 총 아이템 수
  items,
  offset: 0, // 데이터 오프셋
};

export default mockupRegistrationMember;
