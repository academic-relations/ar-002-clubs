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
        nickname: "dudu",
        name: "이연희",
        role: "Designer",
        roleType: RoleType.member,
      },
      {
        nickname: "eel",
        name: "최우정",
        role: "FE / BE",
        roleType: RoleType.member,
      },
      {
        nickname: "ellen",
        name: "박성빈",
        role: "BE",
        roleType: RoleType.member,
      },
      {
        nickname: "malloc",
        name: "최지윤",
        role: "BE",
        roleType: RoleType.member,
      },
      {
        nickname: "mingle",
        name: "민지연",
        role: "BE",
        roleType: RoleType.member,
      },
      {
        nickname: "oreo",
        name: "최용혁",
        role: "BE",
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
