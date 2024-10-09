import { ProfessorEnum } from "@sparcs-clubs/interface/common/enum/user.enum";

export enum UserType {
  undergraduate,
  master,
  doctor,
  executive,
  professor,
  employee,
}

export const getUserType = (type: UserType) => {
  switch (type) {
    case UserType.undergraduate:
      return "학부생";
    case UserType.master:
      return "석사과정";
    case UserType.doctor:
      return "박사과정";
    case UserType.executive:
      return "집행부원";
    case UserType.professor:
      return "지도교수";
    case UserType.employee:
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
