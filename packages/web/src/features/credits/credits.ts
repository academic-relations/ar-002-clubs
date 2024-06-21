export interface Member {
  nickname: string;
  name: string;
  role: string;
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
      },
      {
        nickname: "dora",
        name: "이지윤",
        role: "APM(FE) / Designer",
      },
      {
        nickname: "hama",
        name: "하승종",
        role: "APM(BE)",
      },
      {
        nickname: "andy",
        name: "예상우",
        role: "FE",
      },
      {
        nickname: "ava",
        name: "주영미",
        role: "FE",
      },
      {
        nickname: "april",
        name: "남지현",
        role: "BE",
      },
      {
        nickname: "david",
        name: "정동윤",
        role: "FE",
      },
      {
        nickname: "eel",
        name: "최우정",
        role: "FE / BE",
      },
      {
        nickname: "tom",
        name: "양지웅",
        role: "FE / BE",
      },
      {
        nickname: "night",
        name: "박지호",
        role: "??",
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
      },
      {
        nickname: "dora",
        name: "이지윤",
        role: "APM(FE) / Designer",
      },
      {
        nickname: "chan",
        name: "박병찬",
        role: "APM(BE)",
      },
      {
        nickname: "andy",
        name: "예상우",
        role: "FE",
      },
      {
        nickname: "april",
        name: "남지현",
        role: "BE",
      },
      {
        nickname: "ava",
        name: "주영미",
        role: "FE",
      },
      {
        nickname: "david",
        name: "정동윤",
        role: "FE",
      },
      {
        nickname: "tom",
        name: "양지웅",
        role: "BE",
      },
      {
        nickname: "eel",
        name: "최우정",
        role: "인턴",
      },
      {
        nickname: "hama",
        name: "하승종",
        role: "인턴",
      },
    ],
  },
];

export default credits;
