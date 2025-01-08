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

export interface SemesterCredit {
  semester: string;
  members: Member[];
}

const credits: SemesterCredit[] = [
  {
    semester: "2025년 겨울",
    members: [
      {
        nickname: "eel",
        name: "최우정",
        role: "FE / BE",
        roleType: RoleType.member,
        comment: "겨울에 코딩하면 즐거워요",
      },
      {
        nickname: "dora",
        name: "이지윤",
        role: "APM(FE) / Designer",
        roleType: RoleType.APM_FE,
        comment: "이제 진짜 스팍스 졸업해야징",
      },
    ],
  },
  {
    semester: "2024년 가을",
    members: [
      {
        nickname: "shiro",
        name: "이재환",
        role: "인턴",
        roleType: RoleType.intern,
        comment: "ㅇㅅㅇ",
      },
      {
        nickname: "daystar",
        name: "권진현",
        role: "FE",
        roleType: RoleType.member,
        comment: "가을은 코딩하기 좋은 계절",
      },
      {
        nickname: "default",
        name: "김현수",
        role: "BE",
        roleType: RoleType.member,
        comment: "https://skykhs3.github.io",
      },
      {
        nickname: "chacha",
        name: "안채연",
        role: "FE",
        roleType: RoleType.member,
        comment: "클럽수수수수퍼노바",
      },
      {
        nickname: "eel",
        name: "최우정",
        role: "FE",
        roleType: RoleType.member,
        comment: "일이 복사돼요!",
      },
      {
        nickname: "ava",
        name: "주영미",
        role: "FE",
        roleType: RoleType.member,
        comment: "가을이다~",
      },
      {
        nickname: "somato",
        name: "장성원",
        role: "Designer",
        roleType: RoleType.member,
        comment: "신입 somato입니다 감기 조심하세요~",
      },
      {
        nickname: "hama",
        name: "하승종",
        role: "APM(BE)",
        roleType: RoleType.APM_BE,
        comment: "항상 리뷰가 늦어서 미안해요 ㅠㅜ",
      },
      {
        nickname: "oreo",
        name: "최용혁",
        role: "BE",
        roleType: RoleType.member,
        comment: "팀원들 감사합니다! 오레오는 비틀어야 제맛",
      },
      {
        nickname: "dora",
        name: "이지윤",
        role: "APM(FE) / Designer",
        roleType: RoleType.APM_FE,
        comment: "25년이 되어서야 만드는 24년 크레딧",
      },
    ],
  },
  {
    semester: "2024년 여름",
    members: [
      {
        nickname: "chan",
        name: "박병찬",
        role: "PM",
        roleType: RoleType.PM,
        comment: "ipm은 바빠요",
      },
      {
        nickname: "dora",
        name: "이지윤",
        role: "APM(FE) / Designer",
        roleType: RoleType.APM_FE,
        comment: "(งᐛ)ว (งᐖ )ว",
      },
      {
        nickname: "eel",
        name: "최우정",
        role: "APM(FE)",
        roleType: RoleType.APM_FE,
        comment: "일은 eel해요",
      },
      {
        nickname: "hama",
        name: "하승종",
        role: "APM(BE)",
        roleType: RoleType.APM_BE,
        comment: "BE APM 열심히 해볼게요",
      },
      {
        nickname: "andy",
        name: "예상우",
        role: "FE",
        roleType: RoleType.member,
        comment: "그 클럽이 아니었군요 🥲",
      },
      {
        nickname: "ava",
        name: "주영미",
        role: "FE",
        roleType: RoleType.member,
        comment: "여름이다~",
      },
      {
        nickname: "april",
        name: "남지현",
        role: "BE",
        roleType: RoleType.member,
        comment: "clubs 는 여전히 늦게 끝나요",
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
        comment: "열심히 해서 많은 도움되고 싶어요😊",
      },

      {
        nickname: "ellen",
        name: "박성빈",
        role: "BE",
        roleType: RoleType.member,
        comment: "Clubs 신입입니다!!",
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
        comment: "열심히 공부하고 개발하겠습니다!",
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
        role: "BDFL",
        roleType: RoleType.member,
        comment: "범인은... clubs...",
      },
      {
        nickname: "ryan",
        name: "이민욱",
        role: "FE",
        roleType: RoleType.member,
        comment: "클럽스는 클리셰 럽 스토리",
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
      {
        nickname: "casio",
        name: "임가은",
        role: "FE",
        roleType: RoleType.member,
        comment: "카시오는 계산기가 아니에요",
      },
      {
        nickname: "malloc",
        name: "최지윤",
        role: "FE",
        roleType: RoleType.member,
        comment: "(≧▽≦)/",
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
        comment: "내가 이거 왜 시작했지?",
      },
      {
        nickname: "dora",
        name: "이지윤",
        role: "APM(FE) / Designer",
        roleType: RoleType.APM_FE,
        comment: "강아지 dora는 귀여워요🐶",
      },
      {
        nickname: "chan",
        name: "박병찬",
        role: "APM(BE)",
        roleType: RoleType.APM_BE,
        comment: "apm은 바빠요",
      },
      {
        nickname: "andy",
        name: "예상우",
        role: "FE",
        roleType: RoleType.member,
        comment: "club을 좋아해요",
      },
      {
        nickname: "april",
        name: "남지현",
        role: "BE",
        roleType: RoleType.member,
        comment: "clubs 는 맨날 늦게 끝나요",
      },
      {
        nickname: "ava",
        name: "주영미",
        role: "FE",
        roleType: RoleType.member,
        comment: "봄이다~ ",
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
        comment: "eel은 일해요",
      },
      {
        nickname: "hama",
        name: "하승종",
        role: "인턴",
        roleType: RoleType.intern,
        comment: "풀스택 인턴 나가신다",
      },
    ],
  },
];

export default credits;
