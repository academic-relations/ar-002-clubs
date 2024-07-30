import { ApiClb006ResponseOK } from "@sparcs-clubs/interface/api/club/endpoint/apiClb006";
import { ClubDelegateEnum } from "@sparcs-clubs/interface/common/enum/club.enum";

export const mockClubDelegates: ApiClb006ResponseOK = {
  delegates: [
    {
      delegateEnumId: ClubDelegateEnum.President,
      studentId: 20200510,
      name: "이지윤",
      phoneNumber: "010-1234-5678",
    },
    {
      delegateEnumId: ClubDelegateEnum.Representative1,
      studentId: 20200511,
      name: "박지호",
      phoneNumber: "010-1234-5678",
    },
    {
      delegateEnumId: ClubDelegateEnum.Representative2,
      studentId: 20200512,
      name: "박병찬",
      phoneNumber: "010-1234-5678",
    },
  ],
};
