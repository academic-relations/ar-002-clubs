import {
  ProfessorEnum,
  UserTypeEnum,
} from "@sparcs-clubs/interface/common/enum/user.enum";

export const getUserType = (type: UserTypeEnum) => {
  switch (type) {
    case UserTypeEnum.Undergraduate:
      return "학부생";
    case UserTypeEnum.Master:
      return "석사과정";
    case UserTypeEnum.Doctor:
      return "박사과정";
    case UserTypeEnum.Executive:
      return "집행부원";
    case UserTypeEnum.Professor:
      return "지도교수";
    case UserTypeEnum.Employee:
      return "교직원";
    default:
      return "None";
  }
};

export const professorEnumToText = (profEnum?: ProfessorEnum) => {
  switch (profEnum) {
    case ProfessorEnum.Assistant:
      return "조교수";
    case ProfessorEnum.Associate:
      return "부교수";
    case ProfessorEnum.Full:
    default:
      return "정교수";
  }
};
