enum RoleType {
  PM,
  APM_FE,
  APM_BE,
  member,
  intern,
}

export interface Member {
  nickname: string;
  name: string;
  role: string;
  roleType: RoleType;
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
        roleType: RoleType.PM,
      },
      {
        nickname: "dora",
        name: "이지윤",
        role: "APM(FE) / Designer",
        roleType: RoleType.APM_FE,
      },
      {
        nickname: "hama",
        name: "하승종",
        role: "APM(BE)",
        roleType: RoleType.APM_BE,
      },
      {
        nickname: "andy",
        name: "예상우",
        role: "FE",
        roleType: RoleType.member,
      },
      {
        nickname: "ava",
        name: "주영미",
        role: "FE",
        roleType: RoleType.member,
      },
      {
        nickname: "april",
        name: "남지현",
        role: "BE",
        roleType: RoleType.member,
      },
      {
        nickname: "david",
        name: "정동윤",
        role: "FE",
        roleType: RoleType.member,
      },
      {
        nickname: "eel",
        name: "최우정",
        role: "FE / BE",
        roleType: RoleType.member,
      },
      {
        nickname: "tom",
        name: "양지웅",
        role: "FE / BE",
        roleType: RoleType.member,
      },
      {
        nickname: "night",
        name: "박지호",
        role: "??",
        roleType: RoleType.member,
      },
      {
        nickname: "daystar",
        name: "권진현",
        role: "FE",
        roleType: RoleType.member,
        comment: "여름에 코딩하면 덜 더워요!",
      },
      {
        nickname: "chacha",
        name: "안채연",
        role: "FE",
        roleType: RoleType.member,
        comment: "앗차차 clubs 신입 차차예요",
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
        roleType: RoleType.PM,
      },
      {
        nickname: "dora",
        name: "이지윤",
        role: "APM(FE) / Designer",
        roleType: RoleType.APM_FE,
      },
      {
        nickname: "chan",
        name: "박병찬",
        role: "APM(BE)",
        roleType: RoleType.APM_BE,
      },
      {
        nickname: "andy",
        name: "예상우",
        role: "FE",
        roleType: RoleType.member,
      },
      {
        nickname: "april",
        name: "남지현",
        role: "BE",
        roleType: RoleType.member,
      },
      {
        nickname: "ava",
        name: "주영미",
        role: "FE",
        roleType: RoleType.member,
      },
      {
        nickname: "david",
        name: "정동윤",
        role: "FE",
        roleType: RoleType.member,
      },
      {
        nickname: "tom",
        name: "양지웅",
        role: "BE",
        roleType: RoleType.member,
      },
      {
        nickname: "eel",
        name: "최우정",
        role: "인턴",
        roleType: RoleType.intern,
      },
      {
        nickname: "hama",
        name: "하승종",
        role: "인턴",
        roleType: RoleType.intern,
      },
    ],
  },
];

export default credits;
