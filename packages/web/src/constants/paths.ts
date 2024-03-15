/**
 * @file   paths.ts
 * @brief  Path constants for Navigate, Link, and other components that require paths to be defined as constants.
 * @author andy@sparcs.org (Sangwoo Ye)
 */

const paths = {
  HOME: { name: "홈", path: "/" },
  LOGIN: { name: "로그인", path: "/login" },
};

export type Paths = typeof paths;

export default paths;
