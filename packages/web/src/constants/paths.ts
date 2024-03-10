/**
 * @file   paths.ts
 * @brief  Path constants for Navigate, Link, and other components that require paths to be defined as constants.
 * @author andy@sparcs.org (Sangwoo Ye)
 */

const paths = {
  CLUBS: { name: "동아리", path: "/clubs" },
  VOTING: { name: "의결기구", path: "/voting" },
  COMMUNITY: { name: "소통", path: "/community" },
  SERVICE_REQUEST: { name: "서비스 신청", path: "/service-request" },
  ABOUT: { name: "소개", path: "/about" },
  LOGIN: { name: "로그인", path: "/login" },
  REGISTER: { name: "회원가입", path: "/register" },
  PROFILE: { name: "프로필", path: "/profile" },
  ADMIN: { name: "관리자", path: "/admin" },
};

export type Paths = typeof paths;
export default paths;
