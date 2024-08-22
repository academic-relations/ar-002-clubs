/**
 * @file   paths.ts
 * @brief  Path constants for Navigate, Link, and other components that require paths to be defined as constants.
 * @author andy@sparcs.org (Sangwoo Ye)
 */

const externalLinks = {
  allClubRepresentativeMeeting:
    "https://cafe.naver.com/ArticleList.nhn?search.clubid=26985838&search.menuid=14&search.boardtype=L",
  expandedOperatingCommittee:
    "https://cafe.naver.com/ArticleList.nhn?search.clubid=26985838&search.menuid=41&search.boardtype=L",
  operatingCommittee:
    "https://cafe.naver.com/ArticleList.nhn?search.clubid=26985838&search.menuid=13&search.boardtype=L",
  divisionMeeting:
    "https://cafe.naver.com/ArticleList.nhn?search.clubid=26985838&search.menuid=16&search.boardtype=L",
  kakaotalk: "https://pf.kakao.com/_zpxaSd/chat",
  rules:
    "https://cafe.naver.com/ArticleList.nhn?search.clubid=26985838&search.menuid=19&search.boardtype=L",
};

// authority가 "all"을 포함하면 권한 상관 없이 보이는 메뉴
const paths = {
  HOME: { name: "홈", path: "/", authority: ["all"] },
  CLUBS: {
    name: "동아리",
    sub: [
      {
        name: "동아리 목록",
        path: "/clubs",
        authority: ["all"],
      },
      {
        name: "공지사항",
        path: "/notice",
        authority: ["all"],
      },
      {
        name: "나의 동아리",
        path: "/my/clubs",
        authority: ["all"],
      },
      {
        name: "동아리 등록 신청",
        path: "/register-club", // TODO: 임시 링크
        authority: ["all"],
      },
      {
        name: "대표 동아리 관리",
        path: "/manage-club",
        authority: ["all"],
      },
    ],
    authority: ["all"],
  },
  VOTING: {
    name: "의결기구",
    // TODO: 임시 링크
    sub: [
      // {
      //   name: "최근 회의",
      //   path: "/recent-meeting",
      // },
      {
        name: "전동대회",
        path: externalLinks.allClubRepresentativeMeeting,
        authority: ["all"],
      },
      {
        name: "확대운영위원회",
        path: externalLinks.expandedOperatingCommittee,
        authority: ["all"],
      },
      {
        name: "운영위원회",
        path: externalLinks.operatingCommittee,
        authority: ["all"],
      },
      {
        name: "분과회의",
        path: externalLinks.divisionMeeting,
        authority: ["all"],
      },
    ],
    authority: ["all"],
  },
  COMMUNITY: {
    name: "소통",
    // TODO: 임시 링크
    sub: [
      // {
      //   name: "소통채널 안내",
      //   path: "/communication-channel",
      // },
      {
        name: "카카오톡 문의하기",
        path: externalLinks.kakaotalk,
        authority: ["all"],
      },
      {
        name: "동아리연합회칙",
        path: externalLinks.rules,
        authority: ["all"],
      },
    ],
    authority: ["all"],
  },
  // SERVICE: {
  //   name: "서비스 신청",
  //   sub: [
  //     {
  //       name: "대여 사업",
  //       path: "/rental-business",
  // authority: ["all"],
  //     },
  //     {
  //       name: "홍보물 인쇄",
  //       path: "/printing-business",
  // authority: ["all"],
  //     },
  //     {
  //       name: "활동확인서 발급",
  //       path: "/activity-certificate",
  // authority: ["all"],
  //     },
  //     {
  //       name: "공용공간 비정기사용",
  //       path: "/common-space",
  // authority: ["all"],
  //     },
  //   ],
  // authority: ["all"],
  // },
  EXECUTIVE: {
    name: "집행부",
    sub: [
      {
        name: "동아리 등록 신청",
        path: "/executive/register-club",
        authority: ["executive"],
      },
      {
        name: "회원 등록 신청",
        path: "/executive/register-member",
        authority: ["executive"],
      },
    ],
    authority: ["executive"],
  },
  // TODO: 임시 링크
  MADE_BY: { name: "만든 사람들", path: "/credits", authority: ["executive"] },
  LICENSE: { name: "라이센스", path: "/", authority: ["executive"] },
  TERMS_OF_SERVICE: { name: "이용 약관", path: "/", authority: ["executive"] },
  LOGIN: { name: "로그인", path: "/", authority: ["all"] }, // TODO: 아마 로그인 사라질듯?
};

export type Paths = typeof paths;

export default paths;
