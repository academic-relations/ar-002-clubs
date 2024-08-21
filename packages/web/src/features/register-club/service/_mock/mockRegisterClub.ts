import {
  RegistrationStatusEnum,
  RegistrationTypeEnum,
} from "@sparcs-clubs/interface/common/enum/registration.enum";

import { DivisionType } from "@sparcs-clubs/web/types/divisions.types";

export interface RegisterClubList {
  total: number;
  items: RegisterClub[];
  offset: number;
}

export interface RegisterClub {
  status: RegistrationStatusEnum;
  type: RegistrationTypeEnum;
  division: DivisionType;
  clubName: string;
  president: string;
  activityField: string;
  advisorProfessor: string;
}

const items: Array<RegisterClub> = [
  {
    status: RegistrationStatusEnum.Pending,
    type: RegistrationTypeEnum.Renewal,
    division: DivisionType.InstrumentalMusic,
    clubName: "술박스",
    president: "이지윤",
    activityField: "개발개발한 어떤 활동~sjfslkjfksldjklf",
    advisorProfessor: "박지호",
  },
  {
    status: RegistrationStatusEnum.Pending,
    type: RegistrationTypeEnum.Renewal,
    division: DivisionType.HumanitiesAcademics,
    clubName: "술박스",
    president: "이지윤",
    activityField: "개발개발한 어떤 활동~sjfslkjfksldjklf",
    advisorProfessor: "박지호",
  },
  {
    status: RegistrationStatusEnum.Pending,
    type: RegistrationTypeEnum.Promotional,
    division: DivisionType.PerformingArts,
    clubName: "술박스",
    president: "이지윤",
    activityField: "개발개발한 어떤 활동~sjfslkjfksldjklf",
    advisorProfessor: "박지호",
  },
  {
    status: RegistrationStatusEnum.Pending,
    type: RegistrationTypeEnum.NewProvisional,
    division: DivisionType.LifeCulture,
    clubName: "술박스",
    president: "이지윤",
    activityField: "개발개발한 어떤 활동~sjfslkjfksldjklf",
    advisorProfessor: "박지호",
  },
  {
    status: RegistrationStatusEnum.Approved,
    type: RegistrationTypeEnum.Renewal,
    division: DivisionType.VocalMusic,
    clubName: "술박스",
    president: "이지윤",
    activityField: "개발개발한 어떤 활동~sjfslkjfksldjklf",
    advisorProfessor: "박지호",
  },
  {
    status: RegistrationStatusEnum.Approved,
    type: RegistrationTypeEnum.Promotional,
    division: DivisionType.BandMusic,
    clubName: "술박스",
    president: "이지윤",
    activityField: "개발개발한 어떤 활동~sjfslkjfksldjklf",
    advisorProfessor: "박지호",
  },
  {
    status: RegistrationStatusEnum.Approved,
    type: RegistrationTypeEnum.ReProvisional,
    division: DivisionType.Society,
    clubName: "술박스",
    president: "이지윤",
    activityField: "개발개발한 어떤 활동~sjfslkjfksldjklf",
    advisorProfessor: "박지호",
  },
  {
    status: RegistrationStatusEnum.Rejected,
    type: RegistrationTypeEnum.Renewal,
    division: DivisionType.Religion,
    clubName: "술박스",
    president: "이지윤",
    activityField: "개발개발한 어떤 활동~sjfslkjfksldjklf",
    advisorProfessor: "박지호",
  },
  {
    status: RegistrationStatusEnum.Rejected,
    type: RegistrationTypeEnum.Promotional,
    division: DivisionType.BallSports,
    clubName: "술박스",
    president: "이지윤",
    activityField: "개발개발한 어떤 활동~sjfslkjfksldjklf",
    advisorProfessor: "박지호",
  },
  {
    status: RegistrationStatusEnum.Rejected,
    type: RegistrationTypeEnum.Promotional,
    division: DivisionType.ExhibitionCreation,
    clubName: "술박스",
    president: "이지윤",
    activityField: "개발개발한 어떤 활동~sjfslkjfksldjklf",
    advisorProfessor: "박지호",
  },
  {
    status: RegistrationStatusEnum.Pending,
    type: RegistrationTypeEnum.Renewal,
    division: DivisionType.ScienceEngineeringAcademics,
    clubName: "클럽스",
    president: "권진현",
    activityField: "개발개발한 어떤 활동~sjfslkjfksldjklf",
    advisorProfessor: "박지호",
  },
  {
    status: RegistrationStatusEnum.Pending,
    type: RegistrationTypeEnum.Renewal,
    division: DivisionType.LifeSports,
    clubName: "클럽스",
    president: "권진현",
    activityField: "개발개발한 어떤 활동~sjfslkjfksldjklf",
    advisorProfessor: "박지호",
  },
  {
    status: RegistrationStatusEnum.Pending,
    type: RegistrationTypeEnum.Promotional,
    division: DivisionType.PerformingArts,
    clubName: "클럽스",
    president: "권진현",
    activityField: "개발개발한 어떤 활동~sjfslkjfksldjklf",
    advisorProfessor: "박지호",
  },
  {
    status: RegistrationStatusEnum.Pending,
    type: RegistrationTypeEnum.NewProvisional,
    division: DivisionType.LifeCulture,
    clubName: "클럽스",
    president: "권진현",
    activityField: "개발개발한 어떤 활동~sjfslkjfksldjklf",
    advisorProfessor: "박지호",
  },
  {
    status: RegistrationStatusEnum.Approved,
    type: RegistrationTypeEnum.Renewal,
    division: DivisionType.VocalMusic,
    clubName: "클럽스",
    president: "권진현",
    activityField: "개발개발한 어떤 활동~sjfslkjfksldjklf",
    advisorProfessor: "박지호",
  },
  {
    status: RegistrationStatusEnum.Approved,
    type: RegistrationTypeEnum.Promotional,
    division: DivisionType.BandMusic,
    clubName: "클럽스",
    president: "권진현",
    activityField: "개발개발한 어떤 활동~sjfslkjfksldjklf",
    advisorProfessor: "박지호",
  },
  {
    status: RegistrationStatusEnum.Approved,
    type: RegistrationTypeEnum.ReProvisional,
    division: DivisionType.Society,
    clubName: "클럽스",
    president: "권진현",
    activityField: "개발개발한 어떤 활동~sjfslkjfksldjklf",
    advisorProfessor: "박지호",
  },
  {
    status: RegistrationStatusEnum.Rejected,
    type: RegistrationTypeEnum.Renewal,
    division: DivisionType.Religion,
    clubName: "클럽스",
    president: "권진현",
    activityField: "개발개발한 어떤 활동~sjfslkjfksldjklf",
    advisorProfessor: "박지호",
  },
  {
    status: RegistrationStatusEnum.Rejected,
    type: RegistrationTypeEnum.Promotional,
    division: DivisionType.BallSports,
    clubName: "클럽스",
    president: "권진현",
    activityField: "개발개발한 어떤 활동~sjfslkjfksldjklf",
    advisorProfessor: "박지호",
  },
  {
    status: RegistrationStatusEnum.Rejected,
    type: RegistrationTypeEnum.Promotional,
    division: DivisionType.ExhibitionCreation,
    clubName: "클럽스",
    president: "권진현",
    activityField: "개발개발한 어떤 활동~sjfslkjfksldjklf",
    advisorProfessor: "박지호",
  },
];

export const mockRegisterClub: RegisterClubList = {
  total: items.length,
  items,
  offset: 0,
};
