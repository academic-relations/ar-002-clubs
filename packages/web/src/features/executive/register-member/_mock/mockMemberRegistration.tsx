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

const items = Array.from({ length: 120 }, (_, index) => ({
  clubId: index + 1,
  clubTypeEnumId: (index % clubType.length) + 1,
  division: {
    id: (index % divisionType.length) + 1,
    name: "분과명",
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
