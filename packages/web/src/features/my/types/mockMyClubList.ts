import {
  MyClubsInfo,
  fromMyClubsObj,
} from "@sparcs-clubs/web/types/myClubs.types";

// mockup model to interface
const mockupData = [
  {
    semester: 15,
    name: "2024 봄",
    clubs: [
      {
        id: 42,
        clubName: "KAINATION",
        clubType: "가동아리\n",
        characteristicKr: "기부",
        clubPresident: "강현우",
        advisor: "신병하",
        totalMembers: 5,
      },
    ],
  },
  {
    semester: 14,
    name: "2023 가을",
    clubs: [
      {
        id: 42,
        clubName: "KAINATION",
        clubType: "정동아리\n",
        characteristicKr: "기부",
        clubPresident: "강현우",
        advisor: "신병하",
        totalMembers: 5,
      },
    ],
  },
  {
    semester: 13,
    name: "2023 봄",
    clubs: [
      {
        id: 34,
        clubName: "MUSE",
        clubType: "가동아리\n",
        characteristicKr: "밴드세션&코러스",
        clubPresident: "정민호",
        advisor: "이해신",
        totalMembers: 27,
      },
      {
        id: 42,
        clubName: "KAINATION",
        clubType: "정동아리\n",
        characteristicKr: "기부",
        clubPresident: "강현우",
        advisor: "신병하",
        totalMembers: 5,
      },
    ],
  },
];

const mockMyClubList: Array<MyClubsInfo> = mockupData.map(fromMyClubsObj);
mockMyClubList.map(myClub => ({
  ...myClub,
  clubs: myClub.clubs.sort((a, b) => a.type - b.type),
}));

export default mockMyClubList;
