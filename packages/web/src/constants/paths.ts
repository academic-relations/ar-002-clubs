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
        path: "/",
      },
      {
        name: "나의 동아리",
        path: "/",
      },
      {
        name: "동아리 관리",
        path: "/",
      },
      {
        name: "동아리 등록 신청",
        path: "/",
      },
    ],
  },
  VOTING: {
    name: "의결기구",
    sub: [
      {
        name: "최근 회의",
        path: "/",
      },
      {
        name: "전동대회(전체동아리대표자회의)",
        path: "/",
      },
      {
        name: "확대운영위원회",
        path: "/",
      },
      {
        name: "운영위원회",
        path: "/",
      },
      {
        name: "분과회의",
        path: "/",
      },
    ],
  },
  COMMUNITY: {
    name: "소통",
    sub: [
      {
        name: "소통채널 안내",
        path: "/",
      },
      {
        name: "카카오톡 문의하기",
        path: "/",
      },
      {
        name: "동아리연합회칙",
        path: "/",
      },
    ],
  },
  SERVICE: {
    name: "서비스 신청",
    sub: [
      {
        name: "대여 사업",
        path: "/",
      },
      {
        name: "홍보물 인쇄",
        path: "/",
      },
      {
        name: "활동확인서 발급",
        path: "/",
      },
      {
        name: "공용공간 비정기사용",
        path: "/",
      },
    ],
  },
  MADE_BY: { name: "만든 사람들", path: "/" },
  LICENSE: { name: "라이센스", path: "/" },
  TERMS_OF_SERVICE: { name: "이용 약관", path: "/" },
  LOGIN: { name: "로그인", path: "/login" },
};

export type Paths = typeof paths;

export default paths;
