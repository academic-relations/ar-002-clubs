import { MemberStatusEnum } from "@sparcs-clubs/web/features/manage-club/services/_mock/mockManageClub";

import mockupClubMemberRegister from "../_mock/mockClubMemberRegister";

const calcStudentStatus = (studentID: number) => {
  if (
    parseInt(studentID.toString().slice(-4)) < 2000 ||
    (parseInt(studentID.toString().slice(-4)) < 7000 &&
      parseInt(studentID.toString().slice(-4)) > 6000)
  ) {
    return "Regular";
  }
  return "NonRegular";
};

const calcRegisterInfo = (data: typeof mockupClubMemberRegister) => {
  // Map 생성 및 초기화
  const result: Map<
    MemberStatusEnum,
    { Regular: number; NonRegular: number; Total: number }
  > = new Map([
    [MemberStatusEnum.Applied, { Regular: 0, NonRegular: 0, Total: 0 }],
    [MemberStatusEnum.Approved, { Regular: 0, NonRegular: 0, Total: 0 }],
    [MemberStatusEnum.Rejected, { Regular: 0, NonRegular: 0, Total: 0 }],
  ]);

  data.applies.forEach(apply => {
    const status = apply.registrationStatus as MemberStatusEnum;
    const studentStatus = calcStudentStatus(apply.studentID);

    if (result.has(status)) {
      const statusInfo = result.get(status)!;
      statusInfo[studentStatus] += 1;
      statusInfo.Total += 1;
      result.set(status, statusInfo);
    }
  });

  return result;
};

export default calcRegisterInfo;
