import { ApiClb013ResponseOk } from "@sparcs-clubs/interface/api/club/endpoint/apiClb013";
import { ClubDelegateChangeRequestStatusEnum } from "@sparcs-clubs/interface/common/enum/club.enum";

export const mockMyDelegateChange: ApiClb013ResponseOk = {
  requests: [
    {
      id: 1,
      prevStudentId: 20200000,
      prevStudentNumber: "20200000",
      prevStudentName: "이도라",
      clubId: 1,
      clubName: "술박스",
      clubDelegateChangeRequestStatusEnumId:
        ClubDelegateChangeRequestStatusEnum.Applied,
    },
  ],
};
