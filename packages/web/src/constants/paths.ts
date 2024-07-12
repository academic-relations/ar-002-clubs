/**
 * @file   paths.ts
 * @brief  Path constants for Navigate, Link, and other components that require paths to be defined as constants.
 * @author andy@sparcs.org (Sangwoo Ye)
 */

const paths = {
  HOME: { name: "홈", path: "/" },
  CLUBS: {
    name: "동아리",
    sub: [
      {
        name: "동아리 목록",
        path: "/clubs",
      },
      {
        name: "공지사항",
        path: "/notice",
      },
      {
        name: "나의 동아리",
        path: "/my/clubs",
      },
      {
        name: "동아리 등록 신청",
        path: "/register-club", // TODO: 임시 링크
      },
      {
        name: "대표 동아리 관리",
        path: "/manage-club",
      },
    ],
  },
  VOTING: {
    name: "의결기구",
    // TODO: 임시 링크
    sub: [
      {
        name: "최근 회의",
        path: "/recent-meeting",
      },
      {
        name: "전동대회",
        path: "/all-club-representative-meeting",
      },
      {
        name: "확대운영위원회",
        path: "/expanded-operating-committee",
      },
      {
        name: "운영위원회",
        path: "/operating-committee",
      },
      {
        name: "분과회의",
        path: "/division-meeting",
      },
    ],
  },
  COMMUNITY: {
    name: "소통",
    // TODO: 임시 링크
    sub: [
      {
        name: "소통채널 안내",
        path: "/communication-channel",
      },
      {
        name: "카카오톡 문의하기",
        path: "/kakaotalk",
      },
      {
        name: "동아리연합회칙",
        path: "/rules",
      },
    ],
  },
  SERVICE: {
    name: "서비스 신청",
    sub: [
      {
        name: "대여 사업",
        path: "/rental-business",
      },
      {
        name: "홍보물 인쇄",
        path: "/printing-business",
      },
      {
        name: "활동확인서 발급",
        path: "/activity-certificate",
      },
      {
        name: "공용공간 비정기사용",
        path: "/common-space",
      },
    ],
  },
  // TODO: 임시 링크
  MADE_BY: { name: "만든 사람들", path: "/credits" },
  LICENSE: { name: "라이센스", path: "/" },
  TERMS_OF_SERVICE: { name: "이용 약관", path: "/" },
  LOGIN: { name: "로그인", path: "/" }, // TODO: 아마 로그인 사라질듯?
};

export type Paths = typeof paths;

export default paths;
