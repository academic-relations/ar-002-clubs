import { RegistrationApplicationStudentStatusEnum } from "@sparcs-clubs/interface/common/enum/registration.enum";

import { mockupClubMemberRegister } from "@sparcs-clubs/web/features/executive/register-member/[id]/_mock/mockClubMemberRegister";

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
    RegistrationApplicationStudentStatusEnum | string,
    { Regular: number; NonRegular: number; Total: number }
  > = new Map<
    RegistrationApplicationStudentStatusEnum | string,
    { Regular: number; NonRegular: number; Total: number }
  >([
    [
      RegistrationApplicationStudentStatusEnum.Pending,
      { Regular: 0, NonRegular: 0, Total: 0 },
    ],
    [
      RegistrationApplicationStudentStatusEnum.Approved,
      { Regular: 0, NonRegular: 0, Total: 0 },
    ],
    [
      RegistrationApplicationStudentStatusEnum.Rejected,
      { Regular: 0, NonRegular: 0, Total: 0 },
    ],
    ["Total", { Regular: 0, NonRegular: 0, Total: 0 }],
  ]);

  data.items.forEach(item => {
    const status =
      item.RegistrationApplicationStudentStatusEnumId as RegistrationApplicationStudentStatusEnum;
    const studentStatus = calcStudentStatus(item.student.studentNumber);

    if (result.has(status)) {
      const statusInfo = result.get(status)!;
      const totalInfo = result.get("Total")!;
      statusInfo[studentStatus] += 1;
      statusInfo.Total += 1;
      totalInfo.Total += 1;
      totalInfo[studentStatus] += 1;
      result.set(status, statusInfo);
      result.set("Total", totalInfo);
    }
  });

  return result;
};

export default calcRegisterInfo;
