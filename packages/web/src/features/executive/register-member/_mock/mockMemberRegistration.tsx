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

const divisionName = [
  "생활문화",
  "연행예술",
  "전시창작",
  "밴드음악",
  "보컬음악",
  "연주음악",
  "사회",
  "종교",
  "구기체육",
  "생활체육",
  "이공학술",
  "인문학술",
];

const clubType = [ClubTypeEnum.Provisional, ClubTypeEnum.Regular];

const permanentType = [false, true, false];

const items = Array.from({ length: 120 }, (_, index) => ({
  clubId: index + 1,
  clubTypeEnumId: (index % clubType.length) + 1,
  isPermanent: permanentType[index % permanentType.length],
  division: {
    id: (index % divisionType.length) + 1,
    name: divisionName[index % divisionType.length],
  }, // 랜덤 상태 선택
  clubName: "술박스",
  totalRegistrations: 200,
  regularMemberRegistrations: 100,
  totalApprovals: 120,
  regularMemberApprovals: 90,
}));

const mockupRegistrationMember = {
  items,
  total: items.length,
  offset: 1,
};

export default mockupRegistrationMember;
