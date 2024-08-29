import { ProfessorEnum } from "@sparcs-clubs/interface/common/enum/user.enum";

export const getUserType = (type: string) => {
  switch (type) {
    case "undergraduate":
      return "학부생";
    case "master":
      return "석사과정";
    case "doctor":
      return "박사과정";
    case "executive":
      return "집행부원";
    case "professor":
      return "지도교수";
    case "employee":
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
