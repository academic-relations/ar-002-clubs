import { ApiClb006ResponseOK } from "@sparcs-clubs/interface/api/club/endpoint/apiClb006";
import { ApiClb008ResponseOk } from "@sparcs-clubs/interface/api/club/endpoint/apiClb008";
import { ApiClb011ResponseOk } from "@sparcs-clubs/interface/api/club/endpoint/apiClb011";
import {
  ClubDelegateChangeRequestStatusEnum,
  ClubDelegateEnum,
} from "@sparcs-clubs/interface/common/enum/club.enum";

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

export const mockClubDelegateRequest: ApiClb011ResponseOk = {
  requests: [
    {
      studentId: 20200000,
      studentName: "이도라",
      clubDelegateChangeRequestStatusEnumId:
        ClubDelegateChangeRequestStatusEnum.Applied,
    },
  ],
};

export const mockClubDelegateCandidates: ApiClb008ResponseOk = {
  students: [
    {
      id: 20200510,
      name: "이지윤",
      phoneNumber: "010-1234-5678",
    },
    {
      id: 20200511,
      name: "박지호",
      phoneNumber: "010-1234-5678",
    },
    {
      id: 20200512,
      name: "박병찬",
      phoneNumber: "010-1234-5678",
    },
    {
      id: 20200513,
      name: "이도라",
      phoneNumber: "010-1234-5678",
    },
    {
      id: 20200514,
      name: "삼도라",
      phoneNumber: "010-1234-5678",
    },
    {
      id: 20200515,
      name: "사도라",
      phoneNumber: "010-1234-5678",
    },
  ],
};
