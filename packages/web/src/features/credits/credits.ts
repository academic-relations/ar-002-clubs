export interface Member {
  nickname: string;
  name: string;
  role: string;
  roleType: "PM" | "APM" | "intern" | "member";
  comment?: string;
}

export interface Credits {
  semester: string;
  members: Member[];
}

const credits: Credits[] = [
  {
    semester: "2024년 여름",
    members: [
      {
        nickname: "chan",
        name: "박병찬",
        role: "PM",
        roleType: "PM",
      },
      {
        nickname: "dora",
        name: "이지윤",
        role: "APM(FE) / Designer",
        roleType: "APM",
      },
      {
        nickname: "hama",
        name: "하승종",
        role: "APM(BE)",
        roleType: "APM",
      },
      {
        nickname: "andy",
        name: "예상우",
        role: "FE",
        roleType: "member",
      },
      {
        nickname: "ava",
        name: "주영미",
        role: "FE",
        roleType: "member",
      },
      {
        nickname: "april",
        name: "남지현",
        role: "BE",
        roleType: "member",
      },
      {
        nickname: "david",
        name: "정동윤",
        role: "FE",
        roleType: "member",
      },
      {
        nickname: "eel",
        name: "최우정",
        role: "FE / BE",
        roleType: "member",
      },
      {
        nickname: "tom",
        name: "양지웅",
        role: "FE / BE",
        roleType: "member",
      },
      {
        nickname: "night",
        name: "박지호",
        role: "??",
        roleType: "member",
      },
    ],
  },
  {
    semester: "2024년 봄",
    members: [
      {
        nickname: "night",
        name: "박지호",
        role: "PM",
        roleType: "PM",
      },
      {
        nickname: "dora",
        name: "이지윤",
        role: "APM(FE) / Designer",
        roleType: "APM",
      },
      {
        nickname: "chan",
        name: "박병찬",
        role: "APM(BE)",
        roleType: "APM",
      },
      {
        nickname: "andy",
        name: "예상우",
        role: "FE",
        roleType: "member",
      },
      {
        nickname: "april",
        name: "남지현",
        role: "BE",
        roleType: "member",
      },
      {
        nickname: "ava",
        name: "주영미",
        role: "FE",
        roleType: "member",
      },
      {
        nickname: "david",
        name: "정동윤",
        role: "FE",
        roleType: "member",
      },
      {
        nickname: "tom",
        name: "양지웅",
        role: "BE",
        roleType: "member",
      },
      {
        nickname: "eel",
        name: "최우정",
        role: "인턴",
        roleType: "intern",
      },
      {
        nickname: "hama",
        name: "하승종",
        role: "인턴",
        roleType: "intern",
      },
    ],
  },
];

export default credits;
