import type { ApiClb001ResponseOK } from "@sparcs-clubs/interface/api/club/endpoint/apiClb001";

// mockup model to interface
const mockupData: ApiClb001ResponseOK = {
  divisions: [
    {
      id: 1,
      name: "생활문화",
      clubs: [
        {
          id: 1,
          nameKr: "궁극의 맛",
          nameEn: "궁극의 맛",
          type: 1,
          isPermanent: false,
          characteristic: "요리",
          representative: "장주원",
          advisor: undefined,
          totalMemberCnt: 1,
        },
        {
          id: 2,
          nameKr: "샹그릴라",
          nameEn: "샹그릴라",
          type: 1,
          isPermanent: true,
          characteristic: "애니메이션 감상 및 서브컬쳐",
          representative: "김경민",
          advisor: undefined,
          totalMemberCnt: 58,
        },
        {
          id: 3,
          nameKr: "여로",
          nameEn: "여로",
          type: 1,
          isPermanent: false,
          characteristic: "여행",
          representative: "강현성",
          advisor: "김유식",
          totalMemberCnt: 31,
        },
        {
          id: 4,
          nameKr: "예쁜영화",
          nameEn: "예쁜영화",
          type: 1,
          isPermanent: false,
          characteristic: "영화감상",
          representative: "정재민",
          advisor: "정재승",
          totalMemberCnt: 32,
        },
        {
          id: 5,
          nameKr: "칼디",
          nameEn: "칼디",
          type: 1,
          isPermanent: true,
          characteristic: "커피&바리스타",
          representative: "최원준",
          advisor: "오혜연",
          totalMemberCnt: 8,
        },
        {
          id: 6,
          nameEn: "판놀음",
          nameKr: "판놀음",
          type: 1,
          isPermanent: false,
          characteristic: "보드 게임",
          representative: "양동연",
          advisor: "김혜진",
          totalMemberCnt: 32,
        },
        {
          id: 7,
          nameKr: "Khartes",
          nameEn: "Khartes",
          type: 1,
          isPermanent: false,
          characteristic: "트레이딩 카드 게임",
          representative: "양진혁",
          advisor: undefined,
          totalMemberCnt: 23,
        },
        {
          id: 8,
          nameKr: "OPTeamus",
          nameEn: "OPTeamus",
          type: 1,
          isPermanent: false,
          characteristic: "이스포츠",
          representative: "신승빈",
          advisor: "박병호",
          totalMemberCnt: 3,
        },
        {
          id: 9,
          nameKr: "THE MIXER",
          nameEn: "THE MIXER",
          type: 1,
          isPermanent: false,
          characteristic: "칵테일",
          representative: "구도훈",
          advisor: undefined,
          totalMemberCnt: 22,
        },
        {
          id: 75,
          nameKr: "패플리",
          nameEn: "패플리",
          type: 1,
          isPermanent: false,
          characteristic: "패션",
          representative: "탁한진",
          advisor: undefined,
          totalMemberCnt: 12,
        },
        {
          id: 76,
          nameKr: "Boardom",
          nameEn: "Boardom",
          type: 1,
          isPermanent: false,
          characteristic: "보드게임",
          representative: "Munim Hasan Wasi",
          advisor: "Insik Shin",
          totalMemberCnt: 1,
        },
        {
          id: 77,
          nameKr: "Moonshine",
          nameEn: "Moonshine",
          type: 2,
          isPermanent: false,
          characteristic: "양조",
          representative: "임채민",
          advisor: undefined,
          totalMemberCnt: 13,
        },
        {
          id: 89,
          nameKr: "KASTLE",
          nameEn: "KASTLE",
          type: 2,
          isPermanent: false,
          characteristic: "체스",
          representative: "Jaden Jorradol",
          advisor: undefined,
          totalMemberCnt: 1,
        },
        {
          id: 92,
          nameKr: "카이시엘",
          nameEn: "카이시엘",
          type: 2,
          isPermanent: false,
          characteristic:
            "제과제빵 활동을 통해 학우들의 다양한 문화활동을 장려함.",
          representative: "김나연",
          advisor: undefined,
          totalMemberCnt: 36,
        },
        {
          id: 104,
          nameKr: "COKAIN",
          nameEn: "COKAIN",
          type: 2,
          isPermanent: false,
          characteristic: "코스프레",
          representative: "김강민",
          advisor: undefined,
          totalMemberCnt: 1,
        },
        {
          id: 106,
          nameKr: "모닥불",
          nameEn: "모닥불",
          type: 2,
          isPermanent: false,
          characteristic: "캠핑",
          representative: "김지하",
          advisor: undefined,
          totalMemberCnt: 1,
        },
        {
          id: 107,
          nameKr: "카슐랭",
          nameEn: "카슐랭",
          type: 2,
          isPermanent: false,
          characteristic: "맛집탐방",
          representative: "이정민",
          advisor: undefined,
          totalMemberCnt: 1,
        },
        {
          id: 110,
          nameKr: "웅(熊)",
          nameEn: "웅(熊)",
          type: 2,
          isPermanent: false,
          characteristic: "고기굽기에 대한 연구",
          representative: "이서윤",
          advisor: undefined,
          totalMemberCnt: 1,
        },
      ],
    },
    {
      id: 2,
      name: "연행예술",
      clubs: [
        {
          id: 10,
          nameKr: "이박터",
          nameEn: "이박터",
          type: 1,
          isPermanent: false,
          characteristic: "연극",
          representative: "허수영",
          advisor: undefined,
          totalMemberCnt: 18,
        },
        {
          id: 11,
          nameKr: "일루젼 카이스트",
          nameEn: "일루젼 카이스트",
          type: 1,
          isPermanent: false,
          characteristic: "힙합, 스트릿 및 K-POP댄스",
          representative: "정민혁",
          advisor: "김현정",
          totalMemberCnt: 17,
        },
        {
          id: 12,
          nameKr: "Lunatic",
          nameEn: "Lunatic",
          type: 1,
          isPermanent: false,
          characteristic: "스트릿 댄스",
          representative: "박선우",
          advisor: "민범기",
          totalMemberCnt: 36,
        },
        {
          id: 13,
          nameKr: "MindFreak",
          nameEn: "MindFreak",
          type: 1,
          isPermanent: false,
          characteristic: "마술 및 타로",
          representative: "이창섭",
          advisor: undefined,
          totalMemberCnt: 19,
        },
        {
          id: 14,
          nameKr: "Number",
          nameEn: "Number",
          type: 1,
          isPermanent: false,
          characteristic: "뮤지컬",
          representative: "김동현",
          advisor: "이경면",
          totalMemberCnt: 20,
        },
      ],
    },
    {
      id: 3,
      name: "전시창작",
      clubs: [
        {
          id: 15,
          nameKr: "곰발바닥",
          nameEn: "곰발바닥",
          type: 1,
          isPermanent: false,
          characteristic: "수공예",
          representative: "김채현",
          advisor: "이지윤",
          totalMemberCnt: 37,
        },
        {
          id: 16,
          nameKr: "그리미주아",
          nameEn: "그리미주아",
          type: 1,
          isPermanent: false,
          characteristic: "순수미술",
          representative: "예건희",
          advisor: "조현정",
          totalMemberCnt: 27,
        },
        {
          id: 17,
          nameKr: "문학의 뜨락",
          nameEn: "문학의 뜨락",
          type: 1,
          isPermanent: false,
          characteristic: "문예창작 및 합평",
          representative: "신승운",
          advisor: "전봉관",
          totalMemberCnt: 1,
        },
        {
          id: 18,
          nameKr: "별바라기",
          nameEn: "별바라기",
          type: 1,
          isPermanent: false,
          characteristic: "별 관측 및 사진 촬영, 사진 전시회 운영과 외부 출사",
          representative: "오윤종",
          advisor: "최한림",
          totalMemberCnt: 38,
        },
        {
          id: 19,
          nameKr: "빛따라",
          nameEn: "빛따라",
          type: 1,
          isPermanent: false,
          characteristic: "사진",
          representative: "김휘용",
          advisor: "김민혁",
          totalMemberCnt: 3,
        },
        {
          id: 20,
          nameKr: "열정부",
          nameEn: "열정부",
          type: 1,
          isPermanent: false,
          characteristic:
            "만화창작 및 디지털 일러스트레이션 및 애니메이션 제작",
          representative: "서해린",
          advisor: undefined,
          totalMemberCnt: 11,
        },
        {
          id: 21,
          nameKr: "은막",
          nameEn: "은막",
          type: 1,
          isPermanent: false,
          characteristic: "독립영화 제작",
          representative: "김나희",
          advisor: "전봉관",
          totalMemberCnt: 23,
        },
        {
          id: 91,
          nameKr: "KAIST Chronicles",
          nameEn: "KAIST Chronicles",
          type: 2,
          isPermanent: false,
          characteristic: "영문",
          representative: "김동은",
          advisor: undefined,
          totalMemberCnt: 1,
        },
        {
          id: 95,
          nameKr: "위로자전거",
          nameEn: "위로자전거",
          type: 2,
          isPermanent: false,
          characteristic: "새활용",
          representative: "방민솔",
          advisor: undefined,
          totalMemberCnt: 1,
        },
        {
          id: 98,
          nameKr: "LEtsGO",
          nameEn: "LEtsGO",
          type: 2,
          isPermanent: false,
          characteristic: "일반 레고 및 나노블럭 조립 후 전시활동",
          representative: "김진현",
          advisor: undefined,
          totalMemberCnt: 9,
        },
      ],
    },
    {
      id: 4,
      name: "밴드음악",
      clubs: [
        {
          id: 22,
          nameKr: "강적",
          nameEn: "강적",
          type: 1,
          isPermanent: false,
          characteristic: "하드 락 밴드",
          representative: "조한빈",
          advisor: "이탁연",
          totalMemberCnt: 11,
        },
        {
          id: 23,
          nameKr: "동틀무렵",
          nameEn: "동틀무렵",
          type: 1,
          isPermanent: false,
          characteristic: "모던락 밴드",
          representative: "이해인",
          advisor: "이경면",
          totalMemberCnt: 29,
        },
        {
          id: 24,
          nameKr: "인피니트",
          nameEn: "인피니트",
          type: 1,
          isPermanent: false,
          characteristic: "메탈 및 얼터너티브 메탈 관련 밴드음악",
          representative: "김준호",
          advisor: "윤효상",
          totalMemberCnt: 18,
        },
        {
          id: 25,
          nameKr: "창작동화",
          nameEn: "창작동화",
          type: 1,
          isPermanent: false,
          characteristic: "재즈 및 창작곡 공연",
          representative: "최홍일",
          advisor: "배석형",
          totalMemberCnt: 13,
        },
        {
          id: 26,
          nameKr: "CarpeDiem",
          nameEn: "CarpeDiem",
          type: 1,
          isPermanent: false,
          characteristic: "팝 밴드",
          representative: "김예찬",
          advisor: "조항정",
          totalMemberCnt: 1,
        },
        {
          id: 27,
          nameKr: "Praiser",
          nameEn: "Praiser",
          type: 1,
          isPermanent: false,
          characteristic: "KAIST 내 크리스천들을 위한 CCM을 연주하는 밴드",
          representative: "박동민",
          advisor: "성영철",
          totalMemberCnt: 11,
        },
        {
          id: 28,
          nameKr: "STURGEON",
          nameEn: "STURGEON",
          type: 1,
          isPermanent: false,
          characteristic: "EMO/CORE/PUNK 장르의 밴드음악 합주 및 공연",
          representative: "김예린",
          advisor: undefined,
          totalMemberCnt: 14,
        },
        {
          id: 29,
          nameKr: "Twenties Dream",
          nameEn: "Twenties Dream",
          type: 1,
          isPermanent: false,
          characteristic: "펑크락 밴드",
          representative: "조원준",
          advisor: "이동만",
          totalMemberCnt: 14,
        },
        {
          id: 111,
          nameKr: "Shift",
          nameEn: "Shift",
          type: 2,
          isPermanent: false,
          characteristic: "International Rock Band",
          representative: "Nurlybay Akmerey",
          advisor: undefined,
          totalMemberCnt: 8,
        },
      ],
    },
    {
      id: 5,
      name: "보컬음악",
      clubs: [
        {
          id: 30,
          nameKr: "구토스",
          nameEn: "구토스",
          type: 1,
          isPermanent: false,
          characteristic: "힙합, R&B",
          representative: "신동환",
          advisor: "권경하",
          totalMemberCnt: 21,
        },
        {
          id: 31,
          nameKr: "여섯줄",
          nameEn: "여섯줄",
          type: 1,
          isPermanent: false,
          characteristic: "어쿠스틱 보컬",
          representative: "이유섭",
          advisor: undefined,
          totalMemberCnt: 5,
        },
        {
          id: 32,
          nameKr: "HUG",
          nameEn: "HUG",
          type: 1,
          isPermanent: false,
          characteristic: "버스킹 및 실용음악",
          representative: "김시은",
          advisor: "류석영",
          totalMemberCnt: 1,
        },
        {
          id: 33,
          nameEn: "KAIST CHORUS",
          nameKr: "KAIST CHORUS",
          type: 1,
          isPermanent: false,
          characteristic: "합창 및 아카펠라",
          representative: "성민석",
          advisor: "권세진",
          totalMemberCnt: 12,
        },
        {
          id: 34,
          nameKr: "MUSE",
          nameEn: "MUSE",
          type: 1,
          isPermanent: false,
          characteristic: "밴드세션&코러스",
          representative: "정민호",
          advisor: "이해신",
          totalMemberCnt: 22,
        },
      ],
    },
    {
      id: 6,
      name: "연주음악",
      clubs: [
        {
          id: 35,
          nameKr: "소리모음",
          nameEn: "소리모음",
          type: 1,
          isPermanent: false,
          characteristic: "사물놀이 및 풍물",
          representative: "김수진",
          advisor: undefined,
          totalMemberCnt: 1,
        },
        {
          id: 36,
          nameKr: "FingS",
          nameEn: "FingS",
          type: 1,
          isPermanent: false,
          characteristic: "핑거스타일 기타",
          representative: "유기민",
          advisor: "이승희",
          totalMemberCnt: 26,
        },
        {
          id: 37,
          nameKr: "LP",
          nameEn: "LP",
          type: 1,
          isPermanent: false,
          characteristic: "작곡",
          representative: "윤남석",
          advisor: undefined,
          totalMemberCnt: 26,
        },
        {
          id: 38,
          nameKr: "PIAST",
          nameEn: "PIAST",
          type: 1,
          isPermanent: false,
          characteristic: "피아노 연주",
          representative: "주선우",
          advisor: "최형순",
          totalMemberCnt: 44,
        },
        {
          id: 80,
          nameKr: "FUZE",
          nameEn: "FUZE",
          type: 1,
          isPermanent: false,
          characteristic: "디제잉 및 파티플래닝",
          representative: "김현규",
          advisor: "남주한",
          totalMemberCnt: 1,
        },
      ],
    },
    {
      id: 7,
      name: "사회",
      clubs: [
        {
          id: 39,
          nameKr: "디딤돌",
          nameEn: "디딤돌",
          type: 1,
          isPermanent: false,
          characteristic: "교육봉사 및 장애인 보조",
          representative: "허지운",
          advisor: "정연식",
          totalMemberCnt: 1,
        },
        {
          id: 40,
          nameKr: "EWB-KAIST",
          nameEn: "EWB-KAIST",
          type: 1,
          isPermanent: false,
          characteristic: "적정 기술 개발 및 보급",
          representative: "김수민",
          advisor: "배상민",
          totalMemberCnt: 12,
        },
        {
          id: 41,
          nameKr: "K-Let",
          nameEn: "K-Let",
          type: 1,
          isPermanent: false,
          characteristic: "청소년 대상 강연 및 멘토링",
          representative: "고채현",
          advisor: "송지은",
          totalMemberCnt: 6,
        },
        {
          id: 42,
          nameKr: "KAINATION",
          nameEn: "KAINATION",
          type: 1,
          isPermanent: false,
          characteristic: "기부",
          representative: "강현우",
          advisor: "신병하",
          totalMemberCnt: 5,
        },
        {
          id: 43,
          nameKr: "SEED KAIST",
          nameEn: "SEED KAIST",
          type: 1,
          isPermanent: false,
          characteristic: "과학 분야 교육봉사",
          representative: "김준성",
          advisor: "신하용",
          totalMemberCnt: 24,
        },
        {
          id: 44,
          nameKr: "Silver Lining",
          nameEn: "Silver Lining",
          type: 1,
          isPermanent: false,
          characteristic: "봉사",
          representative: "임지민",
          advisor: "이재우",
          totalMemberCnt: 22,
        },
        {
          id: 94,
          nameKr: "KAIST-SAE",
          nameEn: "KAIST-SAE",
          type: 2,
          isPermanent: false,
          characteristic: "지역사회 봉사 및 환경 보호",
          representative: "권효진",
          advisor: undefined,
          totalMemberCnt: 1,
        },
      ],
    },
    {
      id: 8,
      name: "종교",
      clubs: [
        {
          id: 45,
          nameKr: "네비게이토",
          nameEn: "네비게이토",
          type: 1,
          isPermanent: false,
          characteristic: "크리스천 리더십",
          representative: "김예찬",
          advisor: "심기동",
          totalMemberCnt: 12,
        },
        {
          id: 46,
          nameKr: "사나래",
          nameEn: "사나래",
          type: 1,
          isPermanent: false,
          characteristic: "가톨릭(천주교)",
          representative: "정서경",
          advisor: "서민교",
          totalMemberCnt: 16,
        },
        {
          id: 47,
          nameKr: "CCC",
          nameEn: "CCC",
          type: 1,
          isPermanent: false,
          characteristic: "대학생 기독교 선교",
          representative: "황은빈",
          advisor: "김상규",
          totalMemberCnt: 15,
        },
        {
          id: 48,
          nameKr: "IVF",
          nameEn: "IVF",
          type: 1,
          isPermanent: false,
          characteristic: "성경연구, 공동체 활동",
          representative: "김재용",
          advisor: "한명준",
          totalMemberCnt: 12,
        },
      ],
    },
    {
      id: 9,
      name: "구기체육",
      clubs: [
        {
          id: 49,
          nameKr: "루키",
          nameEn: "루키",
          type: 1,
          isPermanent: false,
          characteristic: "야구",
          representative: "박정원",
          advisor: "서민교",
          totalMemberCnt: 22,
        },
        {
          id: 50,
          nameKr: "아퀼라",
          nameEn: "아퀼라",
          type: 1,
          isPermanent: false,
          characteristic: "풋살",
          representative: "김도윤",
          advisor: "강준혁",
          totalMemberCnt: 15,
        },
        {
          id: 51,
          nameKr: "카이큐",
          nameEn: "카이큐",
          type: 1,
          isPermanent: false,
          characteristic: "배구",
          representative: "이서준",
          advisor: "장무석",
          totalMemberCnt: 8,
        },
        {
          id: 52,
          nameKr: "투 (TU)",
          nameEn: "투 (TU)",
          type: 1,
          isPermanent: false,
          characteristic: "농구",
          representative: "이승헌",
          advisor: "김석희",
          totalMemberCnt: 1,
        },
        {
          id: 53,
          nameKr: "허리케인",
          nameEn: "허리케인",
          type: 1,
          isPermanent: false,
          characteristic: "축구",
          representative: "이서진",
          advisor: "강명수",
          totalMemberCnt: 1,
        },
        {
          id: 54,
          nameKr: "DOOLLY",
          nameEn: "DOOLLY",
          type: 1,
          isPermanent: false,
          characteristic: "5 대 5 정통 농구",
          representative: "김주형",
          advisor: "최양규",
          totalMemberCnt: 43,
        },
        {
          id: 55,
          nameKr: "EDGE",
          nameEn: "EDGE",
          type: 1,
          isPermanent: false,
          characteristic: "탁구",
          representative: "정유찬",
          advisor: "강준혁",
          totalMemberCnt: 27,
        },
        {
          id: 56,
          nameKr: "K-Bird",
          nameEn: "K-Bird",
          type: 1,
          isPermanent: false,
          characteristic: "배드민턴",
          representative: "박시우",
          advisor: undefined,
          totalMemberCnt: 18,
        },
        {
          id: 57,
          nameKr: "STROKE",
          nameEn: "STROKE",
          type: 1,
          isPermanent: false,
          characteristic: "테니스",
          representative: "김지환",
          advisor: "오왕열",
          totalMemberCnt: 1,
        },
        {
          id: 81,
          nameKr: "스페어",
          nameEn: "스페어",
          type: 1,
          isPermanent: false,
          characteristic: "볼링",
          representative: "서민준",
          advisor: "한동훈",
          totalMemberCnt: 18,
        },
        {
          id: 82,
          nameKr: "UM",
          nameEn: "UM",
          type: 2,
          isPermanent: false,
          characteristic: "족구",
          representative: "안제휘",
          advisor: undefined,
          totalMemberCnt: 3,
        },
        {
          id: 93,
          nameKr: "매버릭스",
          nameEn: "매버릭스",
          type: 2,
          isPermanent: false,
          characteristic: "미식축구",
          representative: "장준영",
          advisor: undefined,
          totalMemberCnt: 1,
        },
        {
          id: 101,
          nameKr: "고래당",
          nameEn: "고래당",
          type: 2,
          isPermanent: false,
          characteristic: "구(4구, 8볼)",
          representative: "장원혁",
          advisor: undefined,
          totalMemberCnt: 1,
        },
        {
          id: 108,
          nameKr: "PUD",
          nameEn: "PUD",
          type: 2,
          isPermanent: false,
          characteristic: "캐주얼 배드민턴",
          representative: "Calvin Samuel",
          advisor: undefined,
          totalMemberCnt: 12,
        },
      ],
    },
    {
      id: 10,
      name: "생활체육",
      clubs: [
        {
          id: 58,
          nameKr: "검우회",
          nameEn: "검우회",
          type: 1,
          isPermanent: false,
          characteristic: "대한검도",
          representative: "심한보",
          advisor: "김영진",
          totalMemberCnt: 40,
        },
        {
          id: 59,
          nameKr: "울랄라",
          nameEn: "울랄라",
          type: 1,
          isPermanent: false,
          characteristic: "스포츠 클라이밍",
          representative: "김율",
          advisor: "이승욱",
          totalMemberCnt: 32,
        },
        {
          id: 60,
          nameKr: "카이스트 수영팀 가오리",
          nameEn: "카이스트 수영팀 가오리",
          type: 1,
          isPermanent: false,
          characteristic: "경영(競泳) 및 핀수영",
          representative: "김나령",
          advisor: "박수경",
          totalMemberCnt: 8,
        },
        {
          id: 61,
          nameKr: "KAKI",
          nameEn: "KAKI",
          type: 1,
          isPermanent: false,
          characteristic: "스노우보드 및 익스트림 스포츠",
          representative: "신승헌",
          advisor: "배중면",
          totalMemberCnt: 1,
        },
        {
          id: 83,
          nameKr: "감성",
          nameEn: "감성",
          type: 1,
          isPermanent: false,
          characteristic: "자전거 라이딩",
          representative: "김문수",
          advisor: undefined,
          totalMemberCnt: 26,
        },
        {
          id: 85,
          nameKr: "주짓스님",
          nameEn: "주짓스님",
          type: 1,
          isPermanent: false,
          characteristic: "주짓수, MMA, 킥복싱",
          representative: "노영래",
          advisor: undefined,
          totalMemberCnt: 15,
        },
        {
          id: 90,
          nameKr: "KAIST Winner Wrestling",
          nameEn: "KAIST Winner Wrestling",
          type: 2,
          isPermanent: false,
          characteristic: "레슬링",
          representative: "김영진",
          advisor: undefined,
          totalMemberCnt: 1,
        },
        {
          id: 96,
          nameKr: "ASCEND",
          nameEn: "ASCEND",
          type: 2,
          isPermanent: false,
          characteristic: "국제 종합운동 동아리",
          representative: "김근형",
          advisor: undefined,
          totalMemberCnt: 1,
        },
        {
          id: 103,
          nameKr: "쨉쨉원투",
          nameEn: "쨉쨉원투",
          type: 2,
          isPermanent: false,
          characteristic: "복싱",
          representative: "임수연",
          advisor: undefined,
          totalMemberCnt: 7,
        },
        {
          id: 105,
          nameKr: "북극곰",
          nameEn: "북극곰",
          type: 2,
          isPermanent: false,
          characteristic: "유도",
          representative: "김창헌",
          advisor: undefined,
          totalMemberCnt: 14,
        },
      ],
    },
    {
      id: 11,
      name: "이공학술",
      clubs: [
        {
          id: 62,
          nameKr: "숲",
          nameEn: "숲",
          type: 1,
          isPermanent: false,
          characteristic: "생물의 관찰 및 탐구",
          representative: "신동엽",
          advisor: "김상규",
          totalMemberCnt: 21,
        },
        {
          id: 63,
          nameKr: "질주",
          nameEn: "질주",
          type: 1,
          isPermanent: false,
          characteristic: "모터스포츠",
          representative: "이관형",
          advisor: "김경수",
          totalMemberCnt: 16,
        },
        {
          id: 64,
          nameKr: "하제",
          nameEn: "하제",
          type: 1,
          isPermanent: false,
          characteristic: "게임 연구 및 제작",
          representative: "김경완",
          advisor: "송준화",
          totalMemberCnt: 1,
        },
        {
          id: 65,
          nameKr: "GoN",
          nameEn: "GoN",
          type: 1,
          isPermanent: false,
          characteristic: "정보보안 및 해킹",
          representative: "조정훈",
          advisor: "차상길",
          totalMemberCnt: 35,
        },
        {
          id: 66,
          nameKr: "KAIST 수학문제연구회",
          nameEn: "KAIST 수학문제연구회",
          type: 1,
          isPermanent: false,
          characteristic: "수학",
          representative: "이준혁",
          advisor: "엄상일",
          totalMemberCnt: 58,
        },
        {
          id: 67,
          nameKr: "KAIST Puple",
          nameEn: "KAIST Puple",
          type: 1,
          isPermanent: false,
          characteristic: "퍼즐 연구 및 공유",
          representative: "황윤찬",
          advisor: "안정연",
          totalMemberCnt: 1,
        },
        {
          id: 68,
          nameKr: "MR",
          nameEn: "MR",
          type: 1,
          isPermanent: false,
          characteristic: "로봇 연구 및 제작, 메이커 활동",
          representative: "임준범",
          advisor: "박용화",
          totalMemberCnt: 9,
        },
        {
          id: 69,
          nameKr: "RUN",
          nameEn: "RUN",
          type: 1,
          isPermanent: false,
          characteristic: "알고리즘 문제 해결",
          representative: "이예린",
          advisor: "류석영",
          totalMemberCnt: 16,
        },
        {
          id: 70,
          nameKr: "Vlab",
          nameEn: "Vlab",
          type: 1,
          isPermanent: false,
          characteristic: "과학퀴즈와 인공지능",
          representative: "이서현",
          advisor: "강민석",
          totalMemberCnt: 12,
        },
        {
          id: 86,
          nameKr: "Include",
          nameEn: "Include",
          type: 2,
          isPermanent: false,
          characteristic: "AI 학술",
          representative: "김중현",
          advisor: undefined,
          totalMemberCnt: 22,
        },
        {
          id: 100,
          nameKr: "GDSC",
          nameEn: "GDSC",
          type: 2,
          isPermanent: false,
          characteristic: "KAIST 개발자 네트워킹 및 개발 관련 행사 주최",
          representative: "윤지훈",
          advisor: undefined,
          totalMemberCnt: 2,
        },
        {
          id: 102,
          nameKr: "우주벌레",
          nameEn: "우주벌레",
          type: 2,
          isPermanent: false,
          characteristic: "우주생물학 탐구 및 외계지적생명체 탐사",
          representative: "이진우",
          advisor: undefined,
          totalMemberCnt: 1,
        },
        {
          id: 109,
          nameKr: "NUPS(NUPzuki Search club)",
          nameEn: "NUPS(NUPzuki Search club)",
          type: 2,
          isPermanent: false,
          characteristic:
            "외계행성 관측 및 관측 기술 개발과 새로운 행성 발견, 외계생명체 거주 가능성 조사",
          representative: "유동호",
          advisor: "김준한",
          totalMemberCnt: 1,
        },
      ],
    },
    {
      id: 12,
      name: "인문학술",
      clubs: [
        {
          id: 71,
          nameKr: "Freethinkers KAIST",
          nameEn: "Freethinkers KAIST",
          type: 1,
          isPermanent: false,
          characteristic: "자유사상",
          representative: "이윤섭",
          advisor: "Grant Fisher",
          totalMemberCnt: 14,
        },
        {
          id: 72,
          nameKr: "ICISTS",
          nameEn: "ICISTS",
          type: 1,
          isPermanent: false,
          characteristic: "학술행사 개최",
          representative: "김지환",
          advisor: "조항정",
          totalMemberCnt: 16,
        },
        {
          id: 73,
          nameKr: "KFAC",
          nameEn: "KFAC",
          type: 1,
          isPermanent: false,
          characteristic: "금융 학술 동아리",
          representative: "김희상",
          advisor: "최호용",
          totalMemberCnt: 1,
        },
        {
          id: 74,
          nameKr: "MSK",
          nameEn: "MSK",
          type: 1,
          isPermanent: false,
          characteristic: "경영전략",
          representative: "조은현",
          advisor: "김원준",
          totalMemberCnt: 1,
        },
        {
          id: 87,
          nameKr: "KAIST 법학회 Lawgical",
          nameEn: "KAIST 법학회 Lawgical",
          type: 1,
          isPermanent: false,
          characteristic: "법학",
          representative: "김경래",
          advisor: "전우정",
          totalMemberCnt: 15,
        },
        {
          id: 99,
          nameKr: "KAIST LOOKIE",
          nameEn: "KAIST LOOKIE",
          type: 2,
          isPermanent: false,
          characteristic: "사회 문제 소셜 임팩트 창출, 소셜 벤처 창업 동아리",
          representative: "양준원",
          advisor: undefined,
          totalMemberCnt: 9,
        },
      ],
    },
  ],
};

// ----

export default mockupData;
