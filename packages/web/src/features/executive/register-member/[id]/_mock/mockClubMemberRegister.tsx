import { MemberStatusEnum } from "@sparcs-clubs/web/features/manage-club/services/_mock/mockManageClub";

const registerState = [
  MemberStatusEnum.Approved,
  MemberStatusEnum.Applied,
  MemberStatusEnum.Rejected,
];

const studentIDList = [
  20240024, // 1
  20230120, // 1
  20247893, // 3
  20246493, // 1
  20245642, // 2
];

const applies = Array.from({ length: 100 }, (_, index) => ({
  registrationStatus: registerState[index % registerState.length],
  id: index + 1,
  studentID: studentIDList[index % studentIDList.length],
  studentName: "임가은",
  studentEmail: "casio@sparcs.org",
  studentPhoneNumber: "010-xxxx-xxxx",
}));

const mockupClubMemberRegister = {
  total: applies.length,
  applies,
  offset: 0,
};

export default mockupClubMemberRegister;
