/**
 * @file   paths.ts
 * @brief  Path constants for Navigate, Link, and other components that require paths to be defined as constants.
 * @author andy@sparcs.org (Sangwoo Ye)
 */

const paths = {
  HOME: { name: "홈", path: "/" },
  CLUBS: { name: "동아리", path: "/" },
  VOTING: { name: "의결기구", path: "/" },
  COMMUNITY: { name: "소통", path: "/" },
  SERVICE: { name: "서비스 신청", path: "/" },
  MADE_BY: { name: "만든 사람들", path: "/" },
  LICENSE: { name: "라이센스", path: "/" },
  TERMS_OF_SERVICE: { name: "이용 약관", path: "/" },
  LOGIN: { name: "로그인", path: "/login" },
};

export type Paths = typeof paths;

export default paths;
